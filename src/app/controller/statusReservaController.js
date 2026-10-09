const db = require('../../config/database.js');
const StatusReservaCRUD = require('../model/StatusReserva.js');

class StatusReservaController {
    listarTodos() {
        return function (request, response) {
            const statusreservaCRUD = new StatusReservaCRUD(db);

            statusreservaCRUD.listarTodos()
                .then((resultado) => {
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: 'Erro ao listar status'
                    });
                });
        };
    }

    buscarPorID() {
        return function (request, response) {
            const id = request.params.id;
            const statusreservaCRUD = new StatusReservaCRUD(db);

            statusreservaCRUD.buscarPorID(id)
                .then((resultado) => {
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: 'Erro ao buscar status'
                    });
                });
        };
    }

    inserir() {
        return function (request, response) {
            const dados = request.body;
            const statusreservaCRUD = new StatusReservaCRUD(db);

            statusreservaCRUD.inserir(dados)
                .then(() => {
                    response.status(201).json({
                        mensagem: 'Status inserido com sucesso'
                    });
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: 'Erro ao inserir status'
                    });
                });
        };
    }

    atualizar() {
        return function (request, response) {
            const id = request.params.id;
            const dados = request.body;
            const statusreservaCRUD = new StatusReservaCRUD(db);

            statusreservaCRUD.atualizar(id, dados)
                .then(() => {
                    response.status(200).json({
                        mensagem: 'Status atualizado com sucesso'
                    });
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: 'Erro ao atualizar status'
                    });
                });
        };
    }

    excluir() {
        return function (request, response) {
            const id = request.params.id;
            const statusreservaCRUD = new StatusReservaCRUD(db);

            statusreservaCRUD.excluir(id)
                .then(() => {
                    response.status(200).json({
                        mensagem: 'Status excluído com sucesso'
                    });
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: 'Erro ao excluir status'
                    });
                });
        };
    }
}

module.exports = StatusReservaController;