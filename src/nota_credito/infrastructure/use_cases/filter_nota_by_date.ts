import { NotaCreditoService } from "../services/nota_credito_service";

export class FilterCreditByDateRangeUseCase {
  constructor(private readonly notaCreditoService: NotaCreditoService) {}

  async execute(startDate: string, endDate: string): Promise<any> {
    return this.notaCreditoService.filterCreditNotesByDateRange(startDate, endDate);
  }
}