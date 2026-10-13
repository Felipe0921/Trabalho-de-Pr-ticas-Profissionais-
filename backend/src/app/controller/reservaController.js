var db = require('../../config/database.js');
const ReservaCRUD = require('../model/Reserva.js');

class ReservaController {
    listarTodasReservas() {
        return function(request, response) {
            const reservaCRUD = new ReservaCRUD(db);

            reservaCRUD.gerarListagemReserva()
                .then((resultado) => {
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao listar reservas"
                    });
                });
        };
    }

    listarReservaPorID() {
        return function(request, response) {
            const id = request.params.id;
            const reservaCRUD = new ReservaCRUD(db);

            reservaCRUD.gerarListagemReservaPorID(id)
                .then((resultado) => {
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao listar reserva por ID"
                    });
                });
        };
    }

    inserirReserva() {
        return function(request, response) {
            const dados = request.body;
            const reservaCRUD = new ReservaCRUD(db);

            reservaCRUD.insereReserva(dados)
                .then(() => {
                    response.status(201).json({
                        mensagem: "Reserva inserida com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao inserir reserva",
                        detalhe: erro
                    });
                });
        };
    }

    atualizarReserva() {
        return function(request, response) {
            const id = request.params.id;
            const dados = request.body;
            const reservaCRUD = new ReservaCRUD(db);

            reservaCRUD.atualizaReserva(id, dados)
                .then(() => {
                    response.status(200).json({
                        mensagem: "Reserva atualizada com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao atualizar reserva"
                    });
                });
        };
    }

    excluirReserva() {
        return function(request, response) {
            const id = request.params.id;
            const reservaCRUD = new ReservaCRUD(db);

            reservaCRUD.excluiReserva(id)
                .then(() => {
                    response.status(200).json({
                        mensagem: "Reserva excluída com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao excluir reserva"
                    });
                });
        };
    }
}

module.exports = ReservaController;