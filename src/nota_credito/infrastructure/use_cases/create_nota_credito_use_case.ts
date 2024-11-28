import { Pool } from "pg";
import client from "../../../shared/database-config";
import { NotaCreditoCreateDto } from "../../domain/models/nota_credito_create_dto";
import { CreateFacture } from "../../domain/models/create_facture";
import { CreateNotaCredito } from "../../domain/models/create_nota_credito";
import { NotaCreditoService } from "../services/nota_credito_service";
import { FacturaService } from "../services/factura_service";

export class CreateNotaCreditoUseCase {
  constructor(
    private readonly repository: NotaCreditoService,
    private readonly factureRepository: FacturaService
  ) {}

  async createNotaCredito(notaCredito: NotaCreditoCreateDto): Promise<any> {
    const clientConnection = client;
    try {
      // Extract fields for CreateFacture
      const createFacture: CreateFacture = {
        codigo: notaCredito.factura_codigo,
        precioNeto: notaCredito.factura_precio_neto,
        guiaRemisionTransportista:
          notaCredito.factura_guia_remision_transportista,
        igv: notaCredito.factura_igv,
        guiaRemisionRemitente: notaCredito.factura_guia_remision_remitente,
        importeTotal: notaCredito.factura_importe_total,
        fechaEmision: notaCredito.factura_fecha_emision,
        rucCliente: notaCredito.factura_ruc_cliente,
        rutas: notaCredito.rutas || [],
        observaciones: notaCredito.observaciones || [],
      };

      // Extract fields for CreateNotaCredito
      const createNotaCredito: CreateNotaCredito = {
        codigo: notaCredito.codigo,
        precioNeto: notaCredito.precio,
        motivo: notaCredito.motivo,
        codigoFactura: notaCredito.factura_codigo,
        rucCliente: notaCredito.ruc_cliente,
        tipo:notaCredito.tipo
      };
      let is_error: boolean = false;
      let factura = await this.factureRepository
        .createFactura(createFacture)
        .catch((error) => {
          console.log("Ahora");
          console.log(error.message);
          if (error.message != "Error creating factura") {
            console.log("no es igual");
            throw new Error("Error creating factura");
          }
          is_error = true;
        });
      console.log("antes de nota")
      await clientConnection.query("BEGIN");

      //eliminar factura creada
      // if is_error{

      // }
      // Create NotaCredito
      console.log("paso")
      await this.repository
        .createNotaCredito(createNotaCredito)
        .catch((error) => {
          throw new Error("Error creating nota de credito");
        });
      console.log("Antes del commit");
      await clientConnection.query("COMMIT");
    } catch (error: any) {
      console.log("error:dasjdiasn")
      await clientConnection.query("ROLLBACK");
      throw new Error("Error creating nota de credito and facture");
    }
  }
}
