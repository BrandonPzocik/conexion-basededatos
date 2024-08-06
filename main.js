const express = require("express")
const app = express()

const {newConnection} = require("./BD")

app.use(express.json())

//obtener los books 
app.get("/", async (request, response) => {
    const connection = await newConnection()
    const results = await connection.query("SELECT * FROM books")
    response.json(results[0])
    connection.end()
})

//obtener uno solo por id
app.get("/books/:IdBooks", async (request, response) => {
    const connection = await newConnection()
    const id = request.params.IdBooks 
    const results = await connection.query("SELECT * FROM books WHERE IdBooks = ?", id)
    response.json(results[0])
    connection.end()
})

//crear un nuevo libro 
app.post("/books", async (request, response) =>{
    const connection = await newConnection() 
    const {Titulo, Autor } = request.body
    connection.query("INSERT INTO books (Titulo, Autor) values (?, ?)", [Titulo, Autor])
    response.send("Book creado correctamente")
    connection.end()
})

//Eliminar un books por su id 
app.delete("/books/:IdBooks", async (request, response) => {
    const connection = await newConnection()
    const id = request.params.IdBooks 
    const results = await connection.query("DELETE FROM books WHERE IdBooks = ?", id)
    response.json(results[0])
    connection.end()
})

app.listen(4000)
console.log("servidor iniciado")