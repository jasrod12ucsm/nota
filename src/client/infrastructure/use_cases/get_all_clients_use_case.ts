import { Client } from "../../domain/models/client";
import { ClientRepository } from "../../domain/repositories/client_repository";
import { ClientService } from "../services/client_service";


export class GetAllClientsUseCase {
    async execute(client:ClientService):Promise<Client[]>{
        return client.get_all_clients();
    }
}