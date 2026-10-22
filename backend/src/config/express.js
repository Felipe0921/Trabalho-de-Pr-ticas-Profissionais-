const express = require("express");

const aplicacao = express();

aplicacao.use(express.json());

require('../app/routes/usuarioRouters')(aplicacao);
require('../app/routes/credencialRouters')(aplicacao);
require('../app/routes/tipoRecursoRouters')(aplicacao);
require('../app/routes/statusReservaRouters')(aplicacao);
require('../app/routes/salaRouters')(aplicacao);
require('../app/routes/laboratorioRoutes')(aplicacao);
require('../app/routes/recursoRouters')(aplicacao);
require('../app/routes/ReservaRouters')(aplicacao);
require('../app/routes/historicoReservaRouters')(aplicacao);
require('../app/routes/AcessoRouters')(aplicacao);



module.exports = aplicacao;