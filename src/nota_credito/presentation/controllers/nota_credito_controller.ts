import { IncomingMessage } from "http";
import { NotaCreditoService } from "../../infrastructure/services/nota_credito_service";
import { GetNotasCreditosUseCase } from "../../infrastructure/use_cases/get_notas_creditos_use_case";
import { CreateNotaCreditoUseCase } from "../../infrastructure/use_cases/create_nota_credito_use_case";
import { FacturaService } from "../../infrastructure/services/factura_service";
import { NotaCreditoCreateDto } from "../../domain/models/nota_credito_create_dto";
import { FindNotaCreditoByCodeUseCase } from "../../infrastructure/use_cases/find_nota_credito_by_code_use_case";
import { SearchFactureByEmpresaAndClienteUseCase } from "../../infrastructure/use_cases/search_facture_width_empresa_and_cliente_use_case";
import { SumRecaudedUseCase } from "../../infrastructure/use_cases/sum_recauded_for_p_use_case";
import { SumRecaudedTotalUseCase } from "../../infrastructure/use_cases/sum_recauded_for_t_use_case";
import { SumTotalNoteCreditoUseCase } from "../../infrastructure/use_cases/sum_total:_note_credito_use_case";
import { FilterCreditByDateRangeUseCase } from "../../infrastructure/use_cases/filter_nota_by_date";
import { CountSumCreditByMotiveUseCase } from "../../infrastructure/use_cases/count_sum_credit_notes_by_motive_use_case";

export class NotaCreditoController {
  private notaCreditoUseCase: GetNotasCreditosUseCase;
  private createNotaCreditoUseCase: CreateNotaCreditoUseCase;
  private findNotaCreditoByCodeUseCase: FindNotaCreditoByCodeUseCase;
  private searchByCliente: SearchFactureByEmpresaAndClienteUseCase;
  private sumRecaudedForP: SumRecaudedUseCase;
  private sumRecoudedTotal: SumRecaudedTotalUseCase;
  private notaCreditosumTotalUseCase: SumTotalNoteCreditoUseCase;
  private filterCreditNotesByDateRangeUseCase: FilterCreditByDateRangeUseCase;
  private countAndSumCreditNotesByMotiveUseCase: CountSumCreditByMotiveUseCase;
  constructor(
    nota_credito_service: NotaCreditoService,
    facture_service: FacturaService
  ) {
    this.notaCreditoUseCase = new GetNotasCreditosUseCase(nota_credito_service);
    this.createNotaCreditoUseCase = new CreateNotaCreditoUseCase(
      nota_credito_service,
      facture_service
    );
    this.findNotaCreditoByCodeUseCase = new FindNotaCreditoByCodeUseCase(
      nota_credito_service
    );
    this.searchByCliente = new SearchFactureByEmpresaAndClienteUseCase(
      facture_service
    );
    this.sumRecaudedForP = new SumRecaudedUseCase(nota_credito_service);
    this.sumRecoudedTotal = new SumRecaudedTotalUseCase(nota_credito_service);
    this.notaCreditosumTotalUseCase = new SumTotalNoteCreditoUseCase(
      nota_credito_service
    );
    this.filterCreditNotesByDateRangeUseCase =
      new FilterCreditByDateRangeUseCase(nota_credito_service);
    this.countAndSumCreditNotesByMotiveUseCase =
      new CountSumCreditByMotiveUseCase(nota_credito_service);
  }
  public async getNotasCreditos(req: IncomingMessage, res: any) {
    try {
      const notas_creditos = await this.notaCreditoUseCase.getNotasCreditos();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(notas_creditos));
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(error);
    }
  }
  public async createNotaCredito(req: IncomingMessage, res: any) {
    try {
      let body: NotaCreditoCreateDto;
      await req.on("data", (chunk) => {
        console.log(chunk.toString());
        body = JSON.parse(chunk.toString());
        console.log(body);
      });
      await this.createNotaCreditoUseCase.createNotaCredito(body);
      res.writeHead(201, { "Content-Type": "text/plain" });
      res.end("Nota de credito creada");
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error interno del servidor");
    }
  }
  public async findNotaCreditoByCode(req: IncomingMessage, res: any) {
    let code: string = req.url!.split("/")[3];
    try {
      const nota_credito =
        await this.findNotaCreditoByCodeUseCase.getNotasCreditos(code);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(nota_credito));
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(error);
    }
  }
  public async searchFactureByEmpresaAndCliente(
    req: IncomingMessage,
    res: any
  ) {
    const urlParts = req.url!.split("/");
    const clienteRuc = parseInt(urlParts[3]);

    try {
      const facturas = await this.searchByCliente.execute(clienteRuc);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(facturas));
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error interno del servidor");
    }
  }
  public async sumRecaudedForPartial(req: IncomingMessage, res: any) {
    try {
      let recauded = await this.sumRecaudedForP.execute();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(recauded));
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error interno del servidor");
    }
  }
  public async sumRecaudedForTotal(req: IncomingMessage, res: any) {
    try {
      let recauded = await this.sumRecoudedTotal.sumRecaudedTotal();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(recauded));
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error interno del servidor");
    }
  }
  public async sumTotalCreditNotePricesByType(req: IncomingMessage, res: any) {
    try {
      const totals = await this.notaCreditosumTotalUseCase.execute();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(totals));
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error interno del servidor");
    }
  }
  public async filterCreditNotesByDateRange(req: IncomingMessage, res: any) {
    const urlParts = req.url!.split("/");
    const startDate = urlParts[4];
    const endDate = urlParts[5];
    console.log(startDate, endDate);
    try {
      const creditNotes =
        await this.filterCreditNotesByDateRangeUseCase.execute(
          startDate,
          endDate
        );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(creditNotes));
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error interno del servidor");
    }
  }
  public async countAndSumCreditNotesByMotive(req: IncomingMessage, res: any) {
    try {
      const result = await this.countAndSumCreditNotesByMotiveUseCase.execute();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } catch (error) {
      console.log(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error interno del servidor");
    }
  }
}

export const notaCreditoController = new NotaCreditoController(
  new NotaCreditoService(),
  new FacturaService()
);
