import { NotaCreditoService } from "../services/nota_credito_service";

export class SumTotalNoteCreditoUseCase {
  constructor(private readonly notaCreditoService: NotaCreditoService) {}

  async execute(): Promise<any> {
    return this.notaCreditoService.sumTotalCreditNotePricesByType();
  }
}