const express = require("express");

const aplicacao = express();

aplicacao.use(express.json());

module.exports = aplicacao;