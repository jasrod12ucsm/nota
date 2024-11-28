import client from "../../../shared/database-config";
import { Client } from "../../domain/models/client";
import { ClientWithCreditNotesResponse } from "../../domain/models/client_width_credit_notes_resposne";
import { ClientRepository } from "../../domain/repositories/client_repository";

export class ImplClientRepository implements ClientRepository {
  async getAll(): Promise<Client[]> {
    const res = await client.query("SELECT * FROM get_all_client();");
    const client_wows = res.rows;
    let clientVec: Client[] = [];
    for (let i = 0; i < client_wows.length; i++) {
      const client: Client = client_wows[i];
      console.log(client);
      const client2: Client = new Client(
        client.ruc,
        client.nombre.trimEnd(),
        client.departamento.trimEnd(),
        client.calle.trimEnd(),
        client.avenida ? client.avenida.trimEnd() : null,
        client.ciudad.trimEnd(),
        client.distrito.trimEnd()
      );

      console.log(client2);
      clientVec.push(client2);
    }
    return clientVec;
  }
  async createClient(cliente: Client): Promise<any> {
    console.log("antes");
    console.log(cliente);
    const res = await client.query(
      "INSERT INTO mst_cliente(ruc,departamento,calle,avenida,distrito,ciudad,nombre ) VALUES($1,$2,$3,$4,$5,$6,$7);",
      [
        cliente.ruc,
        cliente.departamento,
        cliente.calle,
        cliente.avenida,
        cliente.distrito,
        cliente.ciudad,
        cliente.nombre,
      ]
    );
    console.log("despues");
    console.log(res);
    return res;
  }
  async deleteClient(ruc: String): Promise<any> {
    const res = await client.query("DELETE FROM mst_cliente WHERE ruc=$1;", [
      ruc,
    ]);
    return res;
  }
  async updateClient(cliente: Client): Promise<any> {
    const res = await client.query(
      "UPDATE mst_cliente SET departamento=$1,calle=$2,avenida=$3,distrito=$4,ciudad=$5,nombre=$6 WHERE ruc=$7;",
      [
        cliente.departamento,
        cliente.calle,
        cliente.avenida,
        cliente.distrito,
        cliente.ciudad,
        cliente.nombre,
        cliente.ruc,
      ]
    );
    return res;
  }

  async getAllClientsWithAddressAndCreditNotes(): Promise<
    ClientWithCreditNotesResponse[]
  > {
    try {
      const query = await client.query(
        "SELECT * FROM get_all_clients_with_address_and_credit_notes()"
      );
      const response = query.rows;

      const clientsMap: { [key: number]: ClientWithCreditNotesResponse } = {};

      for (const element of response) {
        if (!clientsMap[element.ruc]) {
          clientsMap[element.ruc] = {
            ruc: element.ruc,
            departamento: element.departamento.trim(),
            calle: element.calle.trim(),
            avenida: element.avenida ? element.avenida.trim() : null,
            distrito: element.distrito.trim(),
            ciudad: element.ciudad.trim(),
            nombre: element.nombre.trim(),
            notaCreditoCodigo: element.nota_credito_codigo
              ? [element.nota_credito_codigo.trim()]
              : [],
          };
        } else {
          if (
            element.nota_credito_codigo &&
            !clientsMap[element.ruc].notaCreditoCodigo.includes(
              element.nota_credito_codigo.trim()
            )
          ) {
            clientsMap[element.ruc].notaCreditoCodigo.push(
              element.nota_credito_codigo.trim()
            );
          }
        }
      }

      return Object.values(clientsMap);
    } catch (error) {
      console.error(
        "Error getting clients with address and credit notes:",
        error
      );
      throw new Error("Error getting clients with address and credit notes");
    }
  }
}
