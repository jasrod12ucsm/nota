import { FacturaRepository } from "../../domain/repositories/factura_repository";
import { CreateFacture } from "../../domain/models/create_facture";
import { ImplFacturaRepository } from "../repositories/facture_repository_impl";
import { FacturaResponse } from "../../domain/models/responses/facture_response";

export class FacturaService {
  private facturaRepository: FacturaRepository;
  constructor() {
    this.facturaRepository = new ImplFacturaRepository();
  }

  async createFactura(createFacture: CreateFacture): Promise<any> {
    try {
      // Call the repository method to create a factura
      return await this.facturaRepository.createFactura(createFacture);
    } catch (error) {
      throw new Error("Error creating factura");
    }
  }

  async searchFactureByEmpresaAndCliente(
    clienteRuc: number
  ): Promise<FacturaResponse[]> {
    return this.facturaRepository.searchFactureByEmpresaAndCliente(
      clienteRuc
    );
  }
}
