import { CreateFacture } from "../models/create_facture";
import { FacturaResponse } from "../models/responses/facture_response";



export interface FacturaRepository{
    createFactura(factura:any):Promise<CreateFacture>;
    searchFactureByEmpresaAndCliente(
    clienteRuc: number
  ): Promise<FacturaResponse[]> ;
}