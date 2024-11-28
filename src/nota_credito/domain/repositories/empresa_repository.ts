import { Client } from "../../../client/domain/models/client";



export interface EmpresaRepository{
    getEnterprise(): Promise<Client[]>;
}