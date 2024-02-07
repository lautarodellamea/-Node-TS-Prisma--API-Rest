import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  routes: Router;
  publicPath?: string;
}

export class Server {
  private app = express();
  // el readonly indica que una vez que se ha asignado un valor a esta propiedad en el constructor, no se puede modificar posteriormente.
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, publicPath = "public" } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {
    // Middlewares: funciones que se ejecutan en todo momento que pasen por una ruta
    // para poder parsear y trabajar con json de las respuestas y peticiones
    // de esta forma mi servidor puede recibir informacion en dos formatos, la segunda se usa mucho con angular
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    // Public Folder
    this.app.use(express.static(this.publicPath));

    // Routes
    this.app.use(this.routes)


    // de esta forma podemos recargar la pagina y las rutas seran accesibles mediante node. 
    // esto ayuda a los SPA
    this.app.get("*", (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
