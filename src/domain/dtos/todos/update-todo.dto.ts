export class UpdateTodoDto {
  // el private constructor me dice que solo podemos llamar internamente dentro de esta clase
  private constructor(
    public readonly id?: number,
    public readonly text?: string,
    public readonly completedAt?: string
  ) { }


  // esto lo hacemos para tener las propiedades que queremos actualizar
  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  // las properties seran un objeto que simularan el objeto que recibimos de "request.body"
  // retornaremos un arreglo con dos elementos opcionales, el primer argumentoe s un string que indicara que salio mal (el error) y el segundo una instancia de UpdateTodoDto
  // los dos opcionales porque si tenemos el string hay un error y sino tendriamos el error tenemos el UpdateTodoDto
  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;
    let newCompletedAt = completedAt;

    if (!id || isNaN(Number(id))) {
      return ["id must be a valid number", undefined];
    }

    if (completedAt) {
      newCompletedAt = new Date(completedAt);

      if (newCompletedAt.toString() === "Invalid Date") {
        return ["CompletedAt is not a valid date", undefined];
      }
    }

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
  }
}

// aca nos evitamos usar un paquete externo para manejar validaciones como express-validator o zod
