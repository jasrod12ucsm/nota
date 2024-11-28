type Handler = (req: any, res: any) => Promise<void>;

interface Route {
  method: string;
  path: string;
  handler: Handler;
}

export class Router {
  private routes: Route[] = [];

  addRoute(method: string, path: string, handler: Handler) {
    this.routes.push({ method, path, handler });
  }

  async handleRequest(req: any, res: any) {
    const { method, url } = req;
    const route = this.routes.find(r => r.method === method && this.matchPath(r.path, url));
    if (route) {
      await route.handler(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Ruta no encontrada");
    }
  }

  private matchPath(routePath: string, url: string) {
    if (routePath.includes(":")) {
      // Ruta dinámica como "/api/clientes/:id"
      const routeParts = routePath.split("/");
      const urlParts = url.split("/");
      if (routeParts.length !== urlParts.length) return false;

      return routeParts.every((part, index) => part.startsWith(":") || part === urlParts[index]);
    }
    return routePath === url;
  }
  
}