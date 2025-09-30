const http = require("http");

const PORT = 3000;
// create server

const server = http.createServer((req, res) => {
    const {url, method} = req;
    // defining routes
    if (url === "/" && method === "POST") {
        res.writeHead (200, {"Content-Type": "text/plain"}); // OK
        res.end("Welcome to Danny's Kitchen");
    }else if (url === "/about" && method === "GET") {
        res.writeHead(200, {"Content-Type": "text/plain"}); // OK
        res.end("About Danny's Kitchen");
    }else if (url === "/contact-us" && method === "GET") {
        res.writeHead(200, {"Content-Type": "text/plain"}); // OK
        res.end("Contact Danny's Kitchen");
    }else if (url === "*" && method === "GET") {
        res.writeHead(404, {"Content-Type": "text/plain"}); // Not Found
        res.end("Page not found");
    }
});


// start server on port 3000
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




//learn how to do post 
// find out other npm packages to use in backend