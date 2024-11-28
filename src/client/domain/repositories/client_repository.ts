import { Client } from "../models/client";
import { ClientWithCreditNotesResponse } from "../models/client_width_credit_notes_resposne";

export interface ClientRepository{
    getAll(): Promise<Client[]>;
    createClient(cliente:Client):Promise<any>;
    deleteClient(ruc:String):Promise<any>;
    updateClient(cliente:Client):Promise<any>;
    getAllClientsWithAddressAndCreditNotes(): Promise<ClientWithCreditNotesResponse[]>;

}