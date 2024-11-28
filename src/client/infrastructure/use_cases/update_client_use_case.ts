import { Client } from "../../domain/models/client";
import { ClientService } from "../services/client_service";



export class UpdateClientUseCase{
    async execute(client:ClientService,cliente:Client):Promise<any>{
        return client.update_client(cliente);
    }
}