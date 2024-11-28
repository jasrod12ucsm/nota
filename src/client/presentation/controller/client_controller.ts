import { ClientService } from "../../infrastructure/services/client_service";
import { GetAllClientsUseCase } from "../../infrastructure/use_cases/get_all_clients_use_case";
import client from "../../../shared/database-config";
import { ClientRepository } from "../../domain/repositories/client_repository";
import { ImplClientRepository } from "../../infrastructure/repositories/impl_client_repository";
import { IncomingMessage } from "http";
import { Client } from "../../domain/models/client";
import { UpdateClientUseCase } from "../../infrastructure/use_cases/update_client_use_case";
import { DeleteClientUseCase } from "../../infrastructure/use_cases/delete_client_use_case";
import { CreateClientUseCase } from "../../infrastructure/use_cases/create_client_use_case";
import { GetAllClientsWithAddressAndCreditNotesUseCase } from "../../infrastructure/use_cases/get_all_width_note_use_case";

export class ClientController {
  private clientUseCase: GetAllClientsUseCase;
  private clientService: ClientService;
  private updateClientUseCase: UpdateClientUseCase;
  private deleteClientUseCase: DeleteClientUseCase;
  private createClientUseCase: CreateClientUseCase;
  private getAllClientsWithAddressAndCreditNotesUseCase: GetAllClientsWithAddressAndCreditNotesUseCase;

  constructor(
    clientUseCase: GetAllClientsUseCase,
    updateClientUseCase: UpdateClientUseCase,
    deleteClientUseCase: DeleteClientUseCase,
    createClientUseCase: CreateClientUseCase,
    get_all_widht_note: GetAllClientsWithAddressAndCreditNotesUseCase
  ) {
    this.clientUseCase = clientUseCase;
    this.updateClientUseCase = updateClientUseCase;
    this.deleteClientUseCase = deleteClientUseCase;
    this.createClientUseCase = createClientUseCase;
    this.clientService = new ClientService(new ImplClientRepository());
    this.getAllClientsWithAddressAndCreditNotesUseCase = get_all_widht_note;
  }

  public async obtenerClientes(req: any, res: any) {
    try {
      const clientes = await this.clientUseCase.execute(this.clientService);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(clientes));
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error interno del servidor");
    }
  }
  public async crearCliente(req: IncomingMessage, res: any) {
    try {
      let body: Client;
      await req.on("data", (chunk) => {
        console.log(chunk.toString());
        body = JSON.parse(chunk.toString());
        console.log(body);
      });
      await this.createClientUseCase.execute(this.clientService, body!);
      res.writeHead(201, { "Content-Type": "text/plain" });
      res.end("Cliente creado");
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error interno del servidor");
    }
  }
  public async eliminarCliente(req: IncomingMessage, res: any) {
    try {
      let ruc: string = req.url!.split("/")[3];
      console.log("ruc", ruc);
      await this.deleteClientUseCase.execute(this.clientService, ruc!);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Cliente eliminado");
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error interno del servidor");
    }
  }
  public async actualizarCliente(req: IncomingMessage, res: any) {
    try {
      let ruc: string = req.url!.split("/")[3];
      console.log("ruc actualizacion", ruc);
      let body: Client;
      await req.on("data", (chunk) => {
        body = {
          ruc,
          ...JSON.parse(chunk.toString()),
        };
        console.log(body);
      });
      await this.updateClientUseCase.execute(this.clientService, body!);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Cliente actualizado");
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error interno del servidor");
    }
  }
  public async getAllClientsWithAddressAndCreditNotes(
    req: IncomingMessage,
    res: any
  ) {
    try {
      const clients =
        await this.getAllClientsWithAddressAndCreditNotesUseCase.execute(this.clientService);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(clients));
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error interno del servidor");
    }
  }
}

export const clientController = new ClientController(
  new GetAllClientsUseCase(),
  new UpdateClientUseCase(),
  new DeleteClientUseCase(),
  new CreateClientUseCase(),
  new GetAllClientsWithAddressAndCreditNotesUseCase()

);
