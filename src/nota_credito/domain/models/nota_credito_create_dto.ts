export class NotaCreditoCreateDto {
  // NotaCredito fields
  codigo: string;
  precio: number;
  motivo: string;
  ruc_cliente: number;
  tipo?: 'P' | 'T'; // Optional, defaults to 'P'
  observaciones?: string[]; // Optional, array of observations
  rutas?: string[]; // Optional, array of routes

  // Factura fields
  factura_codigo: string;
  factura_precio_neto: number;
  factura_guia_remision_transportista: string;
  factura_igv: number;
  factura_guia_remision_remitente: string;
  factura_importe_total: number;
  factura_fecha_emision: string;
  factura_ruc_cliente: number;
  factura_ruc_empresa?: number; 
  factura_servicio: string;
  factura_tipo_moneda?: 'S' | 'D'; // Optional, defaults to 'S'
  factura_forma_pago?: 'C' | 'R'; // Optional, defaults to 'C' R es credito, C es contado
}