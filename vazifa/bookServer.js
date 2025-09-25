import http from "node:http";
import { json } from "node:stream/consumers";
import { getAllBooks } from "./db.js";

const server = http.createServer(async (req, res) => {
    const method = req.method.toLowerCase();
    const url = req.url;

    if (method === "get" && url === "/books") {
        const books = await getAllBooks();
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(books));
    } else if (method === "get" && url === "/users/:id") {

        const { id } = req.params;
        const data = req.body;

        const userIndex = books.findIndex((book) => book.id === +id);
        console.log({ id, data, userIndex });
        if (userIndex === -1) {
            res.status(404);
            res.end({
                message: `${id} User not found`,
            });
        }

        const book = books[userIndex];
        console.log({ book });
    }
    else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});