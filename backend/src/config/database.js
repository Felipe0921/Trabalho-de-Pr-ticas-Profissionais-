// Chama o pacote do Banco
const mssql = require("mssql");

// Configuração para conectar ao Banco
const configuracao = {
    user    : "BD26574",
    password: "BD26574",
    server: "regulus.cotuca.unicamp.br",
    database: "BD26574",
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

// Executa a conexão com o Banco
mssql.connect(configuracao)
    .then(() => {
        console.log( "Conexão com o banco de dados completo");
    })
    .catch((erro) => {
        console.log("Erro ao conectar com o banco");
        console.log("\nErro = " + erro);
    })

module.exports = mssql;