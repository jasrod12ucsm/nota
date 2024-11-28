import { NotaCreditoService } from "../services/nota_credito_service";

export class CountSumCreditByMotiveUseCase {
  constructor(private readonly notaCreditoService: NotaCreditoService) {}

  async execute(): Promise<any> {
    return this.notaCreditoService.countAndSumCreditNotesByMotive();
  }
}