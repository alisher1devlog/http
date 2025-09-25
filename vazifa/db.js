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

export async function saveBook(book) {
    try {
        const books = await getAllBooks();
        const newBook = {id: books.length + 1, ...book};
        books.push(newBook);

        fs.writeFile(booksFilePath,JSON.stringify(books));
        return books;
    } catch (error) {
        throw new Error(error)
    }
};
