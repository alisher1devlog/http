import fs from "node:fs/promises";

const usersFilePath = "./database/users.json";
const producstFilePath = "./database/products.json";


export async function getAllUsers() {
    try {
        const data = await fs.readFile(usersFilePath, "utf-8");
        const users = await JSON.parse(data);
        console.log(users);
        return users;
    } catch (err) {
        throw new Error(err);
    }
}

export async function saveUser(user) {
    try {
        const users = await getAllUsers();
        const newUser = { id: users.length + 1, ...user };
        users.push(newUser);

        fs.writeFile(usersFilePath,JSON.stringify(users));
        return users;
    } catch (err) {
        throw new Error(err);
    }
}
