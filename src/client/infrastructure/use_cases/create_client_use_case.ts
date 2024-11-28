import { Client } from "../../domain/models/client";
import { ClientService } from "../services/client_service";


export class CreateClientUseCase{
    async execute(client:ClientService,cliente:Client):Promise<any>{
        return client.create_client(cliente);
    }
}