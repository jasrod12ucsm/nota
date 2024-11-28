import { router } from "../../../..";
import { clientController } from "../controller/client_controller";

export function createClientScope() {
  router.addRoute("GET", "/api/clientes", async (req, res) => {
    await clientController.obtenerClientes(req, res);
  });
  router.addRoute("POST", "/api/clientes", async (req, res) => {
    await clientController.crearCliente(req, res);
  });
  router.addRoute("DELETE", "/api/clientes/:ruc", async (req, res) => {
    await clientController.eliminarCliente(req, res);
  });
  router.addRoute("PUT", "/api/clientes/:ruc", async (req, res) => {
    await clientController.actualizarCliente(req, res);
  });
  router.addRoute("GET", "/api/clientes/all_note", async (req, res) => {
    await clientController.getAllClientsWithAddressAndCreditNotes(req, res);
  })
}
