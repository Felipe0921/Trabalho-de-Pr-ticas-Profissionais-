const db = require("../../config/database.js");
const CredencialCRUD = require("../model/Credencial.js");

class CredencialController {
    listarTodasCredenciais() {
        return function (request, response) {
            const model = new CredencialCRUD(db);

            model.gerarListagemCredenciais()
                .then((resultado) => {
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro na listagem de credenciais"
                    });
                });
        };
    }

    listarTodasCredenciaisPorId() {
        return function (request, response) {
            const id = request.params.id;
            const model = new CredencialCRUD(db);

            model.gerarListagemCredenciaisPorID(id)
                .then((resultado) => {
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro ao listar credencial por ID"
                    });
                });
        };
    }

    inserirCredenciais() {
        return function (request, response) {
            const dados = request.body;
            const model = new CredencialCRUD(db);

            model.insereCredencial(dados)
                .then(() => {
                    response.status(201).json({
                        mensagem: "Credencial cadastrada com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro ao inserir credencial"
                    });
                });
        };
    }

    login() {
        return function (request, response) {
            const dados = request.body;

            const loginInformado =
                dados.login || dados.email;

            const senhaInformada =
                dados.senha || dados.senha_hash;

            if (!loginInformado || !senhaInformada) {
                return response.status(400).json({
                    erro: "Login e senha são obrigatórios"
                });
            }

            const model = new CredencialCRUD(db);

            model.autenticar(
                loginInformado,
                senhaInformada
            )
                .then((resultado) => {
                    if (
                        !resultado.recordset ||
                        resultado.recordset.length === 0
                    ) {
                        return response.status(401).json({
                            erro: "Login ou senha inválidos"
                        });
                    }

                    response.status(200).json({
                        mensagem: "Login realizado com sucesso",
                        usuario: resultado.recordset[0]
                    });
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro ao realizar login"
                    });
                });
        };
    }

    atualizarCredencial() {
        return function (request, response) {
            const id = request.params.id;
            const dados = request.body;
            const model = new CredencialCRUD(db);

            model.atualizaCredencial(id, dados)
                .then(() => {
                    response.status(200).json({
                        mensagem: "Credencial atualizada com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro ao atualizar credencial"
                    });
                });
        };
    }

    excluirCredencial() {
        return function (request, response) {
            const id = request.params.id;
            const model = new CredencialCRUD(db);

            model.excluirCredencial(id)
                .then(() => {
                    response.status(200).json({
                        mensagem: "Credencial excluída com sucesso"
                    });
                })
                .catch((erro) => {
                    console.log(erro);

                    response.status(500).json({
                        erro: "Erro ao excluir credencial"
                    });
                });
        };
    }
}

module.exports = CredencialController;
