const HistoricoReservaController =
    require('../controller/historicoReservaController');

const obj_HistoricoReservaController =
    new HistoricoReservaController();

module.exports = (aplicacao) => {
    aplicacao.get("/HistoricoReserva",obj_HistoricoReservaController.listarTodosHistoricos());

    aplicacao.get("/HistoricoReserva/:id",obj_HistoricoReservaController.listarHistoricoPorID());

    aplicacao.post("/HistoricoReserva",obj_HistoricoReservaController.inserirHistorico());

    aplicacao.put("/HistoricoReserva/:id",obj_HistoricoReservaController.atualizarHistorico());

    aplicacao.delete("/HistoricoReserva/:id",obj_HistoricoReservaController.excluirHistorico());
};