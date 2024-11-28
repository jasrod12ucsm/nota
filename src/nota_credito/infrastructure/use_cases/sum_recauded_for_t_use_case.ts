import { NotaCreditoService } from "../services/nota_credito_service";

export class SumRecaudedTotalUseCase {
  constructor(private readonly notaCreditoRepository: NotaCreditoService) {}

  async sumRecaudedTotal() {
    return this.notaCreditoRepository.sumRecoudedForT();
  }
}
