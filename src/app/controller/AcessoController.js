var db = require('../../config/database.js');
const AcessoCRUD = require('../model/Acesso.js');

class AcessoController {
    listarTodosAcessos() {
        return function(request, response) {
            const acessoCRUD = new AcessoCRUD(db);

            acessoCRUD.gerarListagemAcessos()
                .then((resultado) => {
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao listar acessos"
                    });
                });
        };
    }

    listarAcessoPorID() {
        return function(request, response) {
            const id = request.params.id;
            const acessoCRUD = new AcessoCRUD(db);

            acessoCRUD.gerarListagemAcessoPorID(id)
                .then((resultado) => {
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao buscar acesso por ID"
                    });
                });
        };
    }

    inserirAcesso() {
        return function(request, response) {
            const dados = request.body;
            const acessoCRUD = new AcessoCRUD(db);

            acessoCRUD.insereAcesso(dados)
                .then(() => {
                    response.status(201).json({
                        mensagem: "Acesso registrado com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao registrar acesso"
                    });
                });
        };
    }

    atualizarAcesso() {
        return function(request, response) {
            const id = request.params.id;
            const dados = request.body;
            const acessoCRUD = new AcessoCRUD(db);

            acessoCRUD.atualizaAcesso(id, dados)
                .then(() => {
                    response.status(200).json({
                        mensagem: "Acesso atualizado com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao atualizar acesso"
                    });
                });
        };
    }

    excluirAcesso() {
        return function(request, response) {
            const id = request.params.id;
            const acessoCRUD = new AcessoCRUD(db);

            acessoCRUD.excluiAcesso(id)
                .then(() => {
                    response.status(200).json({
                        mensagem: "Acesso excluído com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao excluir acesso"
                    });
                });
        };
    }
}

module.exports = AcessoController;