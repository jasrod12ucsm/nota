import { FacturaResponse } from "../../domain/models/responses/facture_response";
import { FacturaService } from "../services/factura_service";
import { NotaCreditoService } from "../services/nota_credito_service";

export class SumRecaudedUseCase {
  constructor(private readonly facturaService: NotaCreditoService) {}

  public async execute(): Promise<FacturaResponse[]> {
    return this.facturaService.sumRecoudedForP();
  }
}