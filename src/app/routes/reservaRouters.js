const ReservaController = require('../controller/reservaController');

const obj_ReservaController = new ReservaController();

module.exports = (aplicacao) => {
    aplicacao.get("/Reserva",obj_ReservaController.listarTodasReservas());

    aplicacao.get("/Reserva/:id",obj_ReservaController.listarReservaPorID());

    aplicacao.post("/Reserva",obj_ReservaController.inserirReserva());

    aplicacao.put("/Reserva/:id",obj_ReservaController.atualizarReserva());

    aplicacao.delete("/Reserva/:id",obj_ReservaController.excluirReserva());
};