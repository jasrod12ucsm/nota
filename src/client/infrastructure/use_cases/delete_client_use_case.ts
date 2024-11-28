import { ClientService } from "../services/client_service";



export class DeleteClientUseCase{
    async execute(client:ClientService,ruc:String):Promise<any>{
        return client.delete_client(ruc);
    }
}