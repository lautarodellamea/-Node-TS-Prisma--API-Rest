import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todoController = new TodosController();

    // como mando argunentos para pasarlo a otra funcion con la misma cantidad de argumentos en la misma posision pordemos cambiar esta linea por la de abajo
    /* router.get("/api/todos", (req, res) => todoController.getTodos(req, res)); */
    // solo mandamos la referencia a la funcion
    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodoById);
    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);



    return router;
  }
}
