const mysql2 = require("mysql2/promise")

const newConnection = async () => {

    const connection = await mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "back", //el nombre de mi base de datos 
    password: ""
    })

    return connection
}

module.exports = {
    newConnection
}