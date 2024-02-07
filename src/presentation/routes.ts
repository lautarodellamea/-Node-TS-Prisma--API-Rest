import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/todos", TodoRoutes.routes);

    // de esta forma podria cambiar en un futuro a: 
    // router.use("/api/v2/todos", TodoRoutes.routes);
    // router.use("/api2/todos", TodoRoutes.routes);
    // y nada mas se veria afectado


    // si tuvieramos mas rutas, las veriamos asi y cada una se manejarian de manera independiente en su modulo
    /*router.use("/api/auth", TodoRoutes.routes);
    router.use("/api/products", TodoRoutes.routes);
    router.use("/api/clients", TodoRoutes.routes);
    router.use("/api/users", TodoRoutes.routes); 
    */

    return router;
  }
}
