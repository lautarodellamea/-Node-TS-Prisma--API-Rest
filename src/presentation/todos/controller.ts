import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {
  // DI: inyeccion de dependencias
  constructor() { }

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();

    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    // esto me convierte el string en un numero  o puedo usar el parseInt mas adelante para transformarlo
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `Todo with id ${id} not found` });
  };

  public createTodo = async (req: Request, res: Response) => {
    // usando el dto
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error: error });

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) return res.status(400).json({ error: error });

    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    if (!todo)
      return res.status(400).json({ error: `Todo with id ${id} not found` });


    const updatedTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: updateTodoDto!.values,
    });

    res.json(updatedTodo);
  };



  // a modo de explicacion, se pueden hacer soft delete que seria marcar el registro como que el registro no existe, para que no pueda ser consultado, es para mantener la integridad por ejemplo si tenemos un producto y lo borrramos entraria en compromiso con las ordenes donde estuvo ese producto. Simplemente lo marcamos como borrado o inhabilitado para que no pueda ser comprado (NO LO ELIMINAMOS FISICAMENTE DE LA BASE DE DATOS)
  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const deleted = await prisma.todo.delete({
      // cuidado que si no ponemos el where podemos borrar toda la base de datos
      where: { id: id },
    });

    deleted
      ? res.json(deleted)
      : res.status(404).json({ error: `Todo with id ${id} not found` });
  };
}
