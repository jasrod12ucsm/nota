import { Pool } from "pg";
import client from "../../../shared/database-config";
import { CreateNotaCredito } from "../../domain/models/create_nota_credito";
import { NotaCreditoRepository } from "../../domain/repositories/nota_credito_repository";
import { NotaCreditoResponse } from "../../domain/models/responses/nota_credito_response";

export class ImplNotaCreditoRepository implements NotaCreditoRepository {
  async sumTotalCreditNotePricesByType(): Promise<any> {
    try {
      const query = await client.query(
        "SELECT * FROM sum_total_credit_note_prices_by_type()"
      );
      return query.rows;
    } catch (error) {
      console.error("Error summing total credit note prices by type:", error);
      throw new Error("Error summing total credit note prices by type");
    }
  }
  async sumRecoudedForT(): Promise<any> {
    try {
      const query = await client.query(
        "SELECT * FROM  sum_credit_note_prices_by_type_t()"
      );
      let response = query.rows;
      return response[0];
    } catch (error) {
      console.error("Error getting notas de credito:", error);
      throw new Error("Error getting notas de credito");
    }
  }
  async sumRecoudedForP(): Promise<any> {
    try {
      const query = await client.query(
        "SELECT * FROM  sum_credit_note_prices_by_type_p()"
      );
      let response = query.rows;
      return response[0];
    } catch (error) {
      console.error("Error getting notas de credito:", error);
      throw new Error("Error getting notas de credito");
    }
  }
  async getNotaCreditoByCode(code: string): Promise<NotaCreditoResponse> {
    try {
      console.log("getNotaCreditoByCode");
      const query = await client.query(
        "SELECT * FROM get_credit_notes_with_facture_and_client($1)",
        [code]
      );
      const response = query.rows;
      console.log(response);
      if (response.length === 0) {
        throw new Error("Nota de credito not found");
      }

      let notaCredito: NotaCreditoResponse | null = null;

      for (const element of response) {
        if (!notaCredito) {
          notaCredito = {
            codigoNotaCredito: element.codigo_nota_credito,
            precio: element.precio,
            motivo: element.motivo.trim(),
            tipo: element.tipo,
            facturaCodigo: element.factura_codigo,
            tipoMoneda: element.tipo_moneda,
            precioNeto: element.precio_neto,
            formaPago: element.forma_pago,
            guiaRemisionTransportista: element.guia_remision_transportista,
            igv: element.igv,
            guiaRemisionRemitente: element.guia_remision_remitente,
            facturaImporte: element.factura_importe,
            fechaEmision: element.fecha_emision,
            servicio: element.servicio,
            clienteRuc: element.cliente_ruc,
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
        } else {
          if (
            element.ruta_factura &&
            !notaCredito.rutas.includes(element.ruta_factura.trim())
          ) {
            notaCredito.rutas.push(element.ruta_factura.trim());
          }

          if (
            element.observacion_factura &&
            !notaCredito.observaciones.includes(
              element.observacion_factura.trim()
            )
          ) {
            notaCredito.observaciones.push(element.observacion_factura.trim());
          }
        }
      }

      return notaCredito;
    } catch (error) {
      console.error("Error getting nota de credito by code:", error);
      throw new Error("Error getting nota de credito by code");
    }
  }
  async getNotasCreditos(): Promise<any> {
    try {
      console.log("getNotasCreditos");
      const query = await client.query(
        "SELECT * FROM get_all_credit_notes_with_facture_and_client()"
      );
      const response = query.rows;

      const notasCreditoArray: NotaCreditoResponse[] = [];

      for (const element of response) {
        const existingNotaCredito = notasCreditoArray.find(
          (nc) => nc.codigoNotaCredito === element.codigo_nota_credito
        );

        if (!existingNotaCredito) {
          const newNotaCredito: NotaCreditoResponse = {
            codigoNotaCredito: element.codigo_nota_credito,
            precio: element.precio,
            motivo: element.motivo.trim(),
            tipo: element.tipo,
            facturaCodigo: element.factura_codigo,
            tipoMoneda: element.tipo_moneda,
            precioNeto: element.precio_neto,
            formaPago: element.forma_pago,
            guiaRemisionTransportista: element.guia_remision_transportista,
            igv: element.igv,
            guiaRemisionRemitente: element.guia_remision_remitente,
            facturaImporte: element.factura_importe,
            fechaEmision: element.fecha_emision,
            servicio: element.servicio,
            clienteRuc: element.cliente_ruc,
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
          notasCreditoArray.push(newNotaCredito);
        } else {
          if (
            element.ruta_factura &&
            !existingNotaCredito.rutas.includes(element.ruta_factura.trim())
          ) {
            existingNotaCredito.rutas.push(element.ruta_factura.trim());
          }

          if (
            element.observacion_factura &&
            !existingNotaCredito.observaciones.includes(
              element.observacion_factura.trim()
            )
          ) {
            existingNotaCredito.observaciones.push(
              element.observacion_factura.trim()
            );
          }
        }
      }
      return notasCreditoArray;
    } catch (error) {
      console.error("Error getting notas de credito:", error);
      throw new Error("Error getting notas de credito");
    }
  }
  async createNotaCredito(notaCredito: CreateNotaCredito): Promise<any> {
    try {
      // Insert into prc_nota_credito
      await client.query(
        `INSERT INTO prc_nota_credito (
          codigo,
          precio,
          motivo,
          codigo_factura,
          ruc_cliente,
          tipo
        ) VALUES ($1, $2, $3, $4, $5,$6)`,
        [
          notaCredito.codigo,
          notaCredito.precioNeto,
          notaCredito.motivo,
          notaCredito.codigoFactura,
          notaCredito.rucCliente,
          notaCredito.tipo,
        ]
      );
    } catch (error) {
      console.error("Error creating nota de credito:", error);
      throw new Error("Error creating nota de credito");
    }
  }
  async filterCreditNotesByDateRange(
    startDate: string,
    endDate: string
  ): Promise<any> {
    try {
      const query = await client.query(
        "SELECT * FROM filter_credit_notes_by_date_range($1, $2)",
        [startDate, endDate]
      );
      return query.rows;
    } catch (error) {
      console.error("Error filtering credit notes by date range:", error);
      throw new Error("Error filtering credit notes by date range");
    }
  }

  async countAndSumCreditNotesByMotive(): Promise<any> {
    try {
      const query = await client.query(
        "SELECT * FROM count_and_sum_credit_notes_by_motive()"
      );
      return query.rows;
    } catch (error) {
      console.error(
        "Error counting and summing credit notes by motive:",
        error
      );
      throw new Error("Error counting and summing credit notes by motive");
    }
  }
}
