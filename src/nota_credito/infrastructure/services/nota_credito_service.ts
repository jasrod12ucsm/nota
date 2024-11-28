import { NotaCreditoResponse } from "../../domain/models/responses/nota_credito_response";
import { NotaCreditoRepository } from "../../domain/repositories/nota_credito_repository";
import { ImplNotaCreditoRepository } from "../repositories/impl_nota_credito_repository";

export class NotaCreditoService {
  private nota_credito_repository: NotaCreditoRepository;
  constructor() {
    this.nota_credito_repository = new ImplNotaCreditoRepository();
  }

  async createNotaCredito(nota_credito: any): Promise<any> {
    return this.nota_credito_repository.createNotaCredito(nota_credito);
  }

  async getNotasCreditos(): Promise<any> {
    return this.nota_credito_repository.getNotasCreditos();
  }
  async getByCode(code: string): Promise<any> {
    return this.nota_credito_repository.getNotaCreditoByCode(code);
  }
  async sumRecoudedForP(): Promise<any> {
    return this.nota_credito_repository.sumRecoudedForP();
  }
  async sumRecoudedForT(): Promise<any> {
    return this.nota_credito_repository.sumRecoudedForT();
  }
  async sumTotalCreditNotePricesByType(): Promise<any> {
    return this.nota_credito_repository.sumTotalCreditNotePricesByType();
  }
  async filterCreditNotesByDateRange(
    startDate: string,
    endDate: string
  ): Promise<any> {
    return this.nota_credito_repository.filterCreditNotesByDateRange(
      startDate,
      endDate
    );
  }
  async countAndSumCreditNotesByMotive(): Promise<any> {
    return this.nota_credito_repository.countAndSumCreditNotesByMotive();
  }
}
