export class FacturaResponse {
  codigoFactura: string;
  tipoMoneda: string;
  precioNeto: number;
  formaPago: string;
  guiaRemisionTransportista: string;
  igv: number;
  guiaRemisionRemitente: string;
  importeTotal: number;
  fechaEmision: Date;
  servicio: string;
  clienteNombre: string;
  clienteDepartamento: string;
  clienteCalle: string;
  clienteAvenida: string | null;
  clienteDistrito: string;
  clienteCiudad: string;
  empresaNombre: string;
  empresaDepartamento: string;
  empresaCalle: string;
  empresaAvenida: string | null;
  empresaDistrito: string;
  empresaCiudad: string;
  empresaRuc: number;
  rutas: string[];
  observaciones: string[];
}