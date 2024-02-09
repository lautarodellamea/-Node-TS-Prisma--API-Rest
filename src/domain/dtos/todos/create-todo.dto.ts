export class CreateTodoDto {
  // el private constructor me dice que solo podemos llamar internamente dentro de esta clase
  private constructor(public readonly text: string) {}

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
