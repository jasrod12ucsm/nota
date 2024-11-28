import { CreateNotaCredito } from "../models/create_nota_credito";
import { NotaCreditoResponse } from "../models/responses/nota_credito_response";

export interface NotaCreditoRepository {
  createNotaCredito(notaCredito: CreateNotaCredito): Promise<any>;

  getNotasCreditos(): Promise<any>;

  getNotaCreditoByCode(code: string): Promise<any>;
  createNotaCredito(notaCredito: CreateNotaCredito): Promise<any>;
  sumRecoudedForP(): Promise<any>;
  sumRecoudedForT(): Promise<any>;
  sumTotalCreditNotePricesByType(): Promise<any>;
  filterCreditNotesByDateRange(startDate: string, endDate: string): Promise<any> ;
  countAndSumCreditNotesByMotive(): Promise<any> ;
}
