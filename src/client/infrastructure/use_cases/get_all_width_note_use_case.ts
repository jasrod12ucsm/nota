import { ClientWithCreditNotesResponse } from "../../domain/models/client_width_credit_notes_resposne";
import { ClientService } from "../services/client_service";

export class GetAllClientsWithAddressAndCreditNotesUseCase {
  constructor() {}

  async execute(client:ClientService): Promise<ClientWithCreditNotesResponse[]> {
    return client.getAllClientsWithAddressAndCreditNotes();
  }
}