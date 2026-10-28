const db = require("../../config/database.js");
const LaboratorioCRUD = require("../model/Laboratorio.js");

class LaboratorioController {
    listarTodos() {
        return function (request, response) {
            const model = new LaboratorioCRUD(db);

            model.listarTodos()
                .then((resultado) => {
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro ao listar laboratórios"
                    });
                });
        };
    }

    buscarPorID() {
        return function (request, response) {
            const id = request.params.id;
            const model = new LaboratorioCRUD(db);

            model.buscarPorID(id)
                .then((resultado) => {
                    if (resultado.recordset.length === 0) {
                        return response.status(404).json({
                            erro: "Laboratório não encontrado"
                        });
                    }

                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro ao buscar laboratório"
                    });
                });
        };
    }

    inserir() {
        return function (request, response) {
            const model = new LaboratorioCRUD(db);

            model.inserir(request.body)
                .then(() => {
                    response.status(201).json({
                        mensagem: "Laboratório inserido com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro ao inserir laboratório"
                    });
                });
        };
    }

    atualizar() {
        return function (request, response) {
            const id = request.params.id;
            const model = new LaboratorioCRUD(db);

            model.atualizar(id, request.body)
                .then(() => {
                    response.status(200).json({
                        mensagem: "Laboratório atualizado com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro ao atualizar laboratório"
                    });
                });
        };
    }

    excluir() {
        return function (request, response) {
            const id = request.params.id;
            const model = new LaboratorioCRUD(db);

            model.excluir(id)
                .then(() => {
                    response.status(200).json({
                        mensagem: "Laboratório excluído com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro ao excluir laboratório"
                    });
                });
        };
    }
}

module.exports = LaboratorioController;
