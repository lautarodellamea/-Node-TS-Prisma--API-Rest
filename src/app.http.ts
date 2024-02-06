import fs from "fs";
import http from "http";

const server = http.createServer((req, res) => {
  console.log(req.url);

  // aca colocamos el codigo de la peticion y el timpo de informacion que va a llegar
  // esto se conoce como SSR (server side rendering), hay muchas formas de hacerlo en node
  /* res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h1>URL ${req.url}</h1>`);
  res.end(); */
  // -------------------------------- -------------------------

  /*   const data = { name: "John Doe", age: 30, city: "New York" };
  res.writeHead(200, { "Content-Type": "application/json" });
  // forma corta de hacer el write, lo colocamos dentro del end
  res.end(JSON.stringify(data)); */
  // -------------------------------- -------------------------

  // existen paquetes que me ahorraran ver todo esto - existen frameworks Express, fastify,y metaframeworks como Nestjs
  // cargando estilos y javascript, tenemos que servir los archivos estaticos
  if (req.url === "/") {
    const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlFile);
    return;
  }

  if (req.url?.endsWith(".css")) {
    res.writeHead(200, { "Content-Type": "text/css" });
  } else if (req.url?.endsWith(".js")) {
    res.writeHead(200, { "Content-Type": "text/javascript" });
  }

  const responseContent = fs.readFileSync(`./public/${req.url}`, "utf-8");
  res.end(responseContent)

  // -------------------------------- -------------------------
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
