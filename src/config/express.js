const express = require("express");

const aplicacao = express();

require('../app/routes/usuarioRouters')(app);
require('../app/routes/credencialRouters')(app);
require('../app/routes/tipoRecursoRouters')(app);
require('../app/routes/statusReservaRouters')(app);
require('../app/routes/salaRouters')(app);
require('../app/routes/laboratorioRouters')(app);
require('../app/routes/recursoRouters')(app);
require('../app/routes/ReservaRoutes')(app);
require('../app/routes/HistoricoReservaRoutes')(app);
require('../app/routes/AcessoRoutes')(app);

aplicacao.use(express.json());

module.exports = aplicacao;