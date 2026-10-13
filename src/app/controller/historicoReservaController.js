var db = require('../../config/database.js');
const HistoricoReservaCRUD = require('../model/historicoReserva.js');

class HistoricoReservaController {
    listarTodosHistoricos() {
        return function(request, response) {
            const historicoCRUD = new HistoricoReservaCRUD(db);

            historicoCRUD.gerarListagemHistorico()
                .then((resultado) => {
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao listar histórico"
                    });
                });
        };
    }

    listarHistoricoPorID() {
        return function(request, response) {
            const id = request.params.id;
            const historicoCRUD = new HistoricoReservaCRUD(db);

            historicoCRUD.gerarListagemHistoricoPorID(id)
                .then((resultado) => {
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao buscar histórico por ID"
                    });
                });
        };
    }

    inserirHistorico() {
        return function(request, response) {
            const dados = request.body;
            const historicoCRUD = new HistoricoReservaCRUD(db);

            historicoCRUD.insereHistorico(dados)
                .then(() => {
                    response.status(201).json({
                        mensagem: "Histórico inserido com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao inserir histórico"
                    });
                });
        };
    }

    atualizarHistorico() {
        return function(request, response) {
            const id = request.params.id;
            const dados = request.body;
            const historicoCRUD = new HistoricoReservaCRUD(db);

            historicoCRUD.atualizaHistorico(id, dados)
                .then(() => {
                    response.status(200).json({
                        mensagem: "Histórico atualizado com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao atualizar histórico"
                    });
                });
        };
    }

    excluirHistorico() {
        return function(request, response) {
            const id = request.params.id;
            const historicoCRUD = new HistoricoReservaCRUD(db);

            historicoCRUD.excluiHistorico(id)
                .then(() => {
                    response.status(200).json({
                        mensagem: "Histórico excluído com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao excluir histórico"
                    });
                });
        };
    }
}

module.exports = HistoricoReservaController;