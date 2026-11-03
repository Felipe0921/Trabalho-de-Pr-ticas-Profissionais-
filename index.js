const aplicacao = require("./src/config/express");

// Inicializa a conexão com o banco
require("./src/config/database");

// Importa as rotas
const usuarioRouters = require("./src/app/routes/usuarioRouters");
const credencialRouters = require("./src/app/routes/credencialRouters");
const laboratorioRouters = require("./src/app/routes/laboratorioRouters");
const salaRouters = require("./src/app/routes/salaRouters");
const statusReservaRouters = require("./src/app/routes/statusReservaRouters");

// Registra as rotas na aplicação
usuarioRouters(aplicacao);
credencialRouters(aplicacao);
laboratorioRouters(aplicacao);
salaRouters(aplicacao);
statusReservaRouters(aplicacao);

// Rota inicial para testar a API
aplicacao.get("/", (request, response) => {
    response.json({
        mensagem: "API funcionando!"
    });
});

// Inicia o servidor
aplicacao.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000" );
});


