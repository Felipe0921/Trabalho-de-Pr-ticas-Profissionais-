const mssql = require("mssql");

const configuracao = {
    user : "BD26559",
    password: "BD26559",
    server: "regulus.cotuca.unicamp.br",
    database: "26559",
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

mssql.connect(configuracao)
    .then(() => {
        console.log( "Conexão com o banco de dados completo");
    })
    .catch((erro) => {
        console.log("Erro ao conectar com o banco");
        console.log("\nErro = " + erro);
    })

    module.exports = mssql;