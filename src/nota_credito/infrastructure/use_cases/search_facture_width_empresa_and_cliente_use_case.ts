import { FacturaResponse } from "../../domain/models/responses/facture_response";
import { FacturaService } from "../services/factura_service";

export class SearchFactureByEmpresaAndClienteUseCase {
  constructor(private readonly facturaService: FacturaService) {}

  async execute(cliente: number): Promise<FacturaResponse[]> {
    return this.facturaService.searchFactureByEmpresaAndCliente(cliente);
  }
}