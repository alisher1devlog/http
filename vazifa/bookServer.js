import http from "node:http";
import { json } from "node:stream/consumers";
import { getAllBooks, saveBook, updateBook,delBook } from "./db.js";
import { error } from "node:console";

const server = http.createServer(async (req, res) => {
    const method = req.method.toLowerCase();
    const url = req.url;

    if (method === "get" && url === "/books") {
        const books = await getAllBooks();
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(books));
    } else if (method === "get" && url.startsWith("/books/")) {
        const id = url.split("/")[2];
        const books = await getAllBooks();
        const book = books.find(b => b.id === +id);

        if (!book) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: `${id} id dagi kitob topilmadi!` }));
            return;
        }

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(book));
    } else if (method === "post" && url === "/books") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            console.log(body);
            try {
                const book = JSON.parse(body);
                const books = await saveBook(book);

                res.writeHead(201, { "content-type": "application/json" });
                res.end(JSON.stringify(books));
            } catch (error) {
                throw new Error(error);
            }
        });
    } else if (method === "put" && url.startsWith("/books/")) {
        const id = Number(url.split("/")[2]);

        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", async () => {
            try {
                const data = JSON.parse(body);
                const updatedBook = await updateBook(id, data);
                res.writeHead(200, { "content-type": "application/json" });
                res.write(JSON.stringify(updatedBook));
                res.end();
            } catch (err) {
                res.writeHead(404, { "content-type": "application/json" });
                res.end(JSON.stringify({ error: err.message }))
            }

        })
    } else if (method === "delete" && url.startsWith("/books/")) {
        const id = Number(url.split("/")[2]);
        try {
            const deletedBook = await delBook(id);
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "Deleted successfully", deletedBook }));
        } catch (err) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: err.message }));
        }

    } else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});


server.listen(3000, () => {
    console.log("Server running on port 3000");

});
