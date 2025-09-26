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
        const data = await fs.readFile(booksFilePath, "utf-8");
        const books = JSON.parse(data);
        return books;
    } catch (err) {
        throw new Error(err)
    }
};
export async function saveAllBooks(books) {
    await fs.writeFile(booksFilePath, JSON.stringify(books, null, 2));
}

export async function saveBook(book) {
    try {
        const books = await getAllBooks();
        const newBook = { id: books.length + 1, ...book };
        books.push(newBook);

        await fs.writeFile(booksFilePath, JSON.stringify(books));
        return newBook;
    } catch (error) {
        throw new Error(error)
    }
};

export async function updateBook(id, data) {
    try {
        const books = await getAllBooks();
        const index = books.findIndex((book) => book.id === id);

        if (index === -1) throw new Error("Book not found");

        const updatedBook = { ...books[index], ...data };
        books[index] = updatedBook;

        await saveAllBooks(books);
        return updatedBook;
    } catch (err) {
        throw new Error(err);
    }
};

export async function delBook(id) {
    const books = await getAllBooks();
    const index = books.findIndex((book) => book.id === id);

    if (index === -1) throw new Error("Book not found");

    const deletedBook = books.splice(index, 1)[0];
    await saveAllBooks(books);

    return deletedBook;
}
