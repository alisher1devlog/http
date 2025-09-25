import fs from "node:fs/promises";

const booksFilePath = "./bookDatabase/books.json";


export async function getAllBooks() {
    try {
        const data = await fs.readFile(booksFilePath, "utf-8");
        const books = JSON.parse(data);
        console.log(books);
        
        return books;
    } catch (err) {
        throw new Error(err);
    }
};

export async function getBook() {
    try {
        const data = await fs.readFile(booksFilePath,"utf-8");
        const books = JSON.parse(data);
        return books;
    } catch (err) {
        throw new Error(err)
    }
};