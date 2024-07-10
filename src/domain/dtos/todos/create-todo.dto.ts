// DTOs Pattern (Data Transfer Objects): son objetos que queiro trasladarlo a otro lugar pero quiero transformarlo a algo que estoy esperando, podriamos usar ZOD si quisieramos o express-validator, este hace middlewares que se ejecuta antes de la peticion
// me ayuda a hacer vañlidaciones, transformaciones de datos, etc, hacer las insersiones como nececite

export class CreateTodoDto {
  // el private constructor me dice que solo podemos llamar internamente dentro de esta clase
  private constructor(public readonly text: string) { }

  // las properties seran un objeto que simularan el objeto que recibimos de "request.body"
  // retornaremos un arreglo con dos elementos opcionales, el primer argumentoe s un string que indicara que salio mal (el error) y el segundo una instancia de CreateTodoDto
  // los dos opcionales porque si tenemos el string hay un error y sino tendriamos el error tenemos el CreateTodoDto
  // props: { [key: string]: any } esto en ts significa que las props puede ser un objento en el cual podamos tener todas las propiedades que nosotros querramos, las keys son strings y las values cualquier cosa
  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    const { text } = props;

    if (!text) return ["Text property is required", undefined];

    return [undefined, new CreateTodoDto(text)];
  }
}

// aca nos evitamos usar un paquete externo para manejar validaciones como express-validator o zod



// ESTO ES UN EJEMPLO
/* public createTodo = async (req: Request, res: Response) => {

    // saco solo lo que quiero del body para no insertarlo todo como viene
    // de esta forma me ahorro que el usuario pueda mandar lo que sea
    const { text } = req.body

    const newTodo = {
      id: uuidv4(),
      text: text,
      completedAt: null,
    }


    // hago validaciones
    if (text) return res.status(400).json({ error: "Text es requqerido" });



    // inserto en la db
    todos.push(newTodo);

    return res.json(newTodo);
}; */

// EL DTO LO IMPLEMENTARIA PARA VALIDAR LA FORMA DE LOS DATOS QUE QUIERO RECIBIR, DE ESTA FORMA LE SACO ESTA RESPONSABILIDAD AL CONTROLADOR, AHI SOLO VERIFICARIA SI TENGO EL ERROR DEL DETO O NO, EN CASO DE NO TENERLO SIGNIFICA QUE SE VALIDO CORRECTAMENTE