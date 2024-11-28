import { router } from "../../..";
import { notaCreditoController } from "./controllers/nota_credito_controller";

export function notaCreditoScope() {
  router.addRoute("GET", "/api/nota", async (req, res) => {
    await notaCreditoController.getNotasCreditos(req, res);
  });
  router.addRoute("POST", "/api/nota", async (req, res) => {
    await notaCreditoController.createNotaCredito(req, res);
  });
  router.addRoute(
    "GET",
    "/api/nota/count-and-sum-by-motive",
    async (req, res) => {
      await notaCreditoController.countAndSumCreditNotesByMotive(req, res);
    }
  );
  //find by code
  router.addRoute("GET", "/api/nota/:code", async (req, res) => {
    await notaCreditoController.findNotaCreditoByCode(req, res);
  });

  router.addRoute(
    "GET",
    "/api/nota/filter-by-date/:startDate/:endDate",
    async (req, res) => {
      await notaCreditoController.filterCreditNotesByDateRange(req, res);
    }
  );
  router.addRoute("GET", "/api/factura/:clienteRuc", async (req, res) => {
    await notaCreditoController.searchFactureByEmpresaAndCliente(req, res);
  });
  router.addRoute("GET", "/api/partial/recauded", async (req, res) => {
    await notaCreditoController.sumRecaudedForPartial(req, res);
  });
  router.addRoute("GET", "/api/total/recauded", async (req, res) => {
    await notaCreditoController.sumRecaudedForTotal(req, res);
  });
  router.addRoute(
    "GET",
    "/api/all/sum-total-prices-by-type",
    async (req, res) => {
      await notaCreditoController.sumTotalCreditNotePricesByType(req, res);
    }
  );
}
