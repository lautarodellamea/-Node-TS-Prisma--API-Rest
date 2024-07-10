import fs from "fs";
import http from "http";


const server = http.createServer((req, res) => {
  console.log(req.url);

  // aca colocamos el codigo de la peticion y el tipo de informacion que va a llegar
  // esto se conoce como SSR (server side rendering), hay muchas formas de hacerlo en node
  /*
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h1>URL ${req.url}</h1>`);
    res.end(); 
  */
  // -------------------------------- -------------------------

  /*
    const data = { name: "John Doe", age: 30, city: "New York" };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data)); */ // forma corta de hacer el write, lo colocamos dentro del end
  // -------------------------------- -------------------------


  // cargando estilos y javascript, tenemos que servir los archivos estaticos
  if (req.url === "/") {
    const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlFile);
    return;
  }

  // Detección de la extensión del archivo solicitado
  // Para poder servir archivos estaticos que se usan dentro del html
  // Esto indica que el cliente está solicitando un archivo CSS O JAVASCRIPT.
  // Dependiendo de la extensión del archivo solicitado, el servidor establece el encabezado Content-Type de la respuesta
  if (req.url?.endsWith(".css")) {
    res.writeHead(200, { "Content-Type": "text/css" });
  } else if (req.url?.endsWith(".js")) {
    res.writeHead(200, { "Content-Type": "text/javascript" });
  }

  // Lectura y envío del contenido del archivo solicitado
  const responseContent = fs.readFileSync(`./public/${req.url}`, "utf-8");
  res.end(responseContent)

  // -------------------------------- -------------------------
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});



// Lo que hicimnos aca es un Web server: viene una peticion y regresamos contenido estatico o dinamico generado del lado del servidor QUE NO ES UN SERVIICO REST, no creamos una API.

// Existen paquetes que me ahorraran ver todo esto - existen frameworks Express, Fastify, y Metaframeworks como Nestjs