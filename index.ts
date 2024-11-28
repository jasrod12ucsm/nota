import http, { IncomingMessage, RequestListener, ServerResponse } from "http";
import client from './src/shared/database-config';
import { Router } from "./src/shared/router";
import { createClientScope } from "./src/client/presentation/scope/client_scope";
import { notaCreditoScope } from "./src/nota_credito/presentation/nota_credito_scope";
client.connect((err)=>{
  if(err){
    console.log('Error en la conexión a la base de datos');
    console.log(err);
  }else{
    console.log('Conectado a la base de datos');
  }
})
export const router = new Router();
const setCorsHeaders = (res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen
  res.setHeader('Access-Control-Allow-Methods', '*'); // Permitir todos los métodos HTTP
  res.setHeader('Access-Control-Allow-Headers', '*'); // Permitir todos los encabezados
};

// Define las rutas
createClientScope();
notaCreditoScope();

const server = http.createServer(async (req: IncomingMessage, res: any) => {
  setCorsHeaders(res);

  router.handleRequest(req, res);
});

server.listen(3000, () => {
  console.log("Servidor en ejecución en http://localhost:3000");
});
