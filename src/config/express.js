const express = require("express");

const aplicacao = express();

aplicacao.use((request, response, next) => {
    response.header(
        "Access-Control-Allow-Origin",
        "*"
    );

    response.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    if (request.method === "OPTIONS") {
        return response.sendStatus(200);
    }

    next();
});

aplicacao.use(express.json());

module.exports = aplicacao;


