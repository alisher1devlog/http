import http from "node:http";
import { json } from "node:stream/consumers";
import { getAllUsers, saveUser } from "./db.js";




const server = http.createServer(async (req, res) => {
    const method = req.method.toLowerCase();
    const url = req.url;
    if (method === "get" && url === "/users") {
        const users = await getAllUsers();
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(users));
    } else if (method === "get" && url === "/products") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(products));
    } else if (method === "post" && url === "/users") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            console.log("Received body:", body);

            try {
                const user = JSON.parse(body);
                const users = await saveUser(user);

                res.writeHead(201, { "content-type": "application/json" });
                res.end(JSON.stringify(users));
            } catch (err) {
                res.writeHead(404, { "content-type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid Json" }));
            }
        });

    } else if (method === "post" && url === "/products") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                const product = JSON.parse(body);
                products.push({ id: products.length + 1, ...product });
                res.writeHead(201, { "content-type": "application/json" });
                res.write(JSON.stringify(products));
                res.end();
            } catch (err) {
                res.writeHead(404, { "content-type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
        });
    } else {
        res.writeHead(404, ({ "content-type": "application/json" }));
        res.write(JSON.stringify({ message: "API not found" }));
        res.end();
    }
});

server.listen(4444, () => {
    console.log(`Server running on port 4444`);
});