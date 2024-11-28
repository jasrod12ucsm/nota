import client from "../../../shared/database-config";
import { CreateFacture } from "../../domain/models/create_facture";
import { FacturaResponse } from "../../domain/models/responses/facture_response";
import { FacturaRepository } from "../../domain/repositories/factura_repository";

export class ImplFacturaRepository implements FacturaRepository {
  async createFactura(factura: CreateFacture): Promise<any> {
    try {
      // Insert into prc_factura
      await client.query(
        `INSERT INTO prc_factura (
          codigo,
          precio_neto,
          guia_remision_transportista,
          igv,
          guia_remision_remitente,
          importe_total,
          fecha_emision,
          ruc_cliente
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          factura.codigo,
          factura.precioNeto,
          factura.guiaRemisionTransportista,
          factura.igv,
          factura.guiaRemisionRemitente,
          factura.importeTotal,
          factura.fechaEmision,
          factura.rucCliente,
        ]
      );

      // Insert into mst_ruta_factura
      for (const ruta of factura.rutas) {
        await client.query(
          `INSERT INTO mst_ruta_factura (codigo_factura, ruta) VALUES ($1, $2)`,
          [factura.codigo, ruta]
        );
      }

      // Insert into mst_observacion_factura
      for (const observacion of factura.observaciones) {
        await client.query(
          `INSERT INTO mst_observacion_factura (codigo_factura, observacion) VALUES ($1, $2)`,
          [factura.codigo, observacion]
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async searchFactureByEmpresaAndCliente(
    clienteRuc: number
  ): Promise<FacturaResponse[]> {
    console.log(clienteRuc);
    try {
      const query = await client.query(
        "SELECT * FROM search_facture_by_cliente($1)",
        [clienteRuc]
      );
      const response = query.rows;

      const facturas: FacturaResponse[] = [];

      for (const element of response) {
        const existingFactura = facturas.find(
          (f) => f.codigoFactura === element.codigo_factura
        );

        if (!existingFactura) {
          const newFactura: FacturaResponse = {
            codigoFactura: element.codigo_factura,
            tipoMoneda: element.tipo_moneda,
            precioNeto: element.precio_neto,
            formaPago: element.forma_pago,
            guiaRemisionTransportista: element.guia_remision_transportista,
            igv: element.igv,
            guiaRemisionRemitente: element.guia_remision_remitente,
            importeTotal: element.importe_total,
            fechaEmision: element.fecha_emision,
            servicio: element.servicio,
            clienteNombre: element.cliente_nombre.trim(),
            clienteDepartamento: element.cliente_departamento.trim(),
            clienteCalle: element.cliente_calle.trim(),
            clienteAvenida: element.cliente_avenida
              ? element.cliente_avenida.trim()
              : null,
            clienteDistrito: element.cliente_distrito.trim(),
            clienteCiudad: element.cliente_ciudad.trim(),
            empresaNombre: element.empresa_nombre.trim(),
            empresaDepartamento: element.empresa_departamento.trim(),
            empresaCalle: element.empresa_calle.trim(),
            empresaAvenida: element.empresa_avenida
              ? element.empresa_avenida.trim()
              : null,
            empresaDistrito: element.empresa_distrito.trim(),
            empresaCiudad: element.empresa_ciudad.trim(),
            empresaRuc: element.empresa_ruc,
            rutas: element.ruta_factura ? [element.ruta_factura.trim()] : [],
            observaciones: element.observacion_factura
              ? [element.observacion_factura.trim()]
              : [],
          };
          facturas.push(newFactura);
        } else {
          if (
            element.ruta_factura &&
            !existingFactura.rutas.includes(element.ruta_factura.trim())
          ) {
            existingFactura.rutas.push(element.ruta_factura.trim());
          }

          if (
            element.observacion_factura &&
            !existingFactura.observaciones.includes(
              element.observacion_factura.trim()
            )
          ) {
            existingFactura.observaciones.push(
              element.observacion_factura.trim()
            );
          }
        }
      }

      return facturas;
    } catch (error) {
      console.error("Error searching facturas by empresa and cliente:", error);
      throw new Error("Error searching facturas by empresa and cliente");
    }
  }
}
