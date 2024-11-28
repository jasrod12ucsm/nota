import { Client } from "../../domain/models/client";
import { ClientWithCreditNotesResponse } from "../../domain/models/client_width_credit_notes_resposne";
import { ClientRepository } from "../../domain/repositories/client_repository";

export class ClientService {
  constructor(private clientRepository: ClientRepository) {}
  async get_all_clients(): Promise<Client[]> {
    return this.clientRepository.getAll();
  }
  async create_client(client: Client): Promise<any> {
    return this.clientRepository.createClient(client);
  }
  async delete_client(ruc: String): Promise<any> {
    return this.clientRepository.deleteClient(ruc);
  }
  async update_client(client: Client): Promise<any> {
    return this.clientRepository.updateClient(client);
  }

  async getAllClientsWithAddressAndCreditNotes(): Promise<
    ClientWithCreditNotesResponse[]
  > {
    return this.clientRepository.getAllClientsWithAddressAndCreditNotes();
  }
}
