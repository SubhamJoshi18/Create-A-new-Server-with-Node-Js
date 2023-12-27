const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Log In page NODE JS</title></head>");
    res.write(
      '<body><form action = "message" method = "POST"><input type ="text" name ="message"><button type="submit">SEND</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(chunk);
    });
    return req.on("end", () => {
      const ParsedBody = Buffer.concat(body).toString();
      const message = ParsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Node Js</title></head>");
  res.write("<body><h1>Welcome to the Home Page</h1></body>");
  res.write("</html>");
  res.end();
});
const port = 3000;
server.listen(port);
