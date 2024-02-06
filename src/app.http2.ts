import fs from "fs";
import http2 from "http2";

// crear certificado (debemos tener git ya que instala openssl), en casod e no fucionar en windows instalar git y ver variables de entorno
// openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt

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


// VEMOS QUE ES MUY TEDIOSO HACER TODOE STO A MANO