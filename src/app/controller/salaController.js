const db = require("../../config/database.js");
const SalaCRUD = require("../model/Sala.js");

class SalaController {
    listarTodas() {
        return function (request, response) {
            const model = new SalaCRUD(db);

            model.listarTodas()
                .then((resultado) => {
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro ao listar salas"
                    });
                });
        };
    }

    buscarPorID() {
        return function (request, response) {
            const id = request.params.id;
            const model = new SalaCRUD(db);

            model.buscarPorID(id)
                .then((resultado) => {
                    if (resultado.recordset.length === 0) {
                        return response.status(404).json({
                            erro: "Sala não encontrada"
                        });
                    }

                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro ao buscar sala"
                    });
                });
        };
    }

    inserir() {
        return function (request, response) {
            const model = new SalaCRUD(db);

            model.inserir(request.body)
                .then(() => {
                    response.status(201).json({
                        mensagem: "Sala inserida com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro ao inserir sala"
                    });
                });
        };
    }

    atualizar() {
        return function (request, response) {
            const id = request.params.id;
            const model = new SalaCRUD(db);

            model.atualizar(id, request.body)
                .then(() => {
                    response.status(200).json({
                        mensagem: "Sala atualizada com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro ao atualizar sala"
                    });
                });
        };
    }

    excluir() {
        return function (request, response) {
            const id = request.params.id;
            const model = new SalaCRUD(db);

            model.excluir(id)
                .then(() => {
                    response.status(200).json({
                        mensagem: "Sala excluída com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro ao excluir sala"
                    });
                });
        };
    }
}

module.exports = SalaController;
