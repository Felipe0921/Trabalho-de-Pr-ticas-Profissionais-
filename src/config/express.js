const express = require("express");

const usuarioRouters = require("../app/routes/usuarioRouters");
const statusReservaRouters = require("../app/routes/statusReservaRouters");
const laboratorioRouters = require("../app/routes/laboratorioRouters");
const salaRouters = require("../app/routes/salaRouters");

const aplicacao = express();

aplicacao.use(express.json());

// Carregamento das rotas
usuarioRouters(aplicacao);
statusReservaRouters(aplicacao);
laboratorioRouters(aplicacao);
salaRouters(aplicacao);

module.exports = aplicacao;
