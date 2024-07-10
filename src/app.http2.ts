import fs from "fs";
import http2 from "http2";

// crear certificado (debemos tener git ya que instala openssl), en caso de no fucionar en windows instalar git y ver variables de entorno
// openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt


/* 
HTTP/2 mejora significativamente el rendimiento, la eficiencia y la seguridad en comparación con HTTP/1.1, mediante la introducción de características como la multiplexación de streams, la compresión de cabeceras, la priorización de streams y el server push. Esto permite a las aplicaciones web modernas ofrecer una experiencia más rápida y fluida a los usuarios finales.
 */

const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    console.log(req.url);

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


    // hacemos este try catch para no romper el servidor cuando pida el favicon.ico ya que no existe
    try {
      const responseContent = fs.readFileSync(`./public/${req.url}`, "utf-8");
      res.end(responseContent);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end();
    }
    // ----------------------------------------------------------
  }
);

server.listen(8080, () => {
  console.log("Server running on port 8080");
});


// VEMOS QUE ES MUY TEDIOSO HACER TODO ESTO A MANO, para evitar tener que reinventar la rueda usaremos Express