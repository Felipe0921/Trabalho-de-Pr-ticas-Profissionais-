var db = require('../../config/database.js');
const CredencialCRUD = require('../model/Credencial.js')

class CredencialController
{
    listarTodasCredenciais()
    {
        return function(request, response) {
            const credencialCRUD = new CredencialCRUD(db);
            credencialCRUD
                .gerarListagemCredenciais()
                .then((resultado) => {
                    console.log("Dados (json) da tabela credencial");
                    console.log(resultado.recordset);
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro)
                    response.status(500).json({
                        erro: "erro na listagem de credenciais"
                    });
                });
        }
    }

    listarTodasCredenciaisPorId()
    {
        return function(request, response) {
            const credencialCRUD = new CredencialCRUD(db)
            credencialCRUD
                .gerarListagemCredenciaisPorID()
                .then((resultado) => {
                    console.log("Dados (json) da tabela credencial pelo ID")
                    console.log(resultado.recordset)
                    response.json(resultado.recordset)
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao listar credenciais por ID"
                    })
                })
        }
    }

    inserirCredenciais()
    {
        return function(request, response)
        {
            let dados = request.body
            console.log("Dados das novas credenciais: " + dados);
            const credencialCRUD = new CredencialCRUD(db);
            credencialCRUD
                .insereCredencial()
                .then((resultado) => {
                    console.log("Analisando credencial");
                    response.status(200).end();
                })
                .catch((erro) => {
                    response.status(500).json({
                        erro: "Erro ao inserir Credencial"
                    });
                });
        }
    }

    atualizarCredencial()
    {
        return function (request, response)
        {
            let dados = request.body;
            console.log("Dados da credencial para atualizar")
            let credencial = request.params.credencial;
            const credencialCRUD = new CredencialCRUD(db);
            credencialCRUD  
                .atualizaCredencial(credencial, dados)
                .then((resultado) => {
                    console.log("Dados a serem atualizados")
                    response.status(200).end();
                })
                .catch((erro) => {
                    console.log("Erro ao atualizar os dados")
                    response.status(500).json({
                        erro: "atualização de credenciais falhou"
                    });
                });
        }
    }

    excluirCredencial()
    {
        return function (request, response)
        {
            const idCredencial = request.params.id;
            const credencialCRUD = new CredencialCRUD(db);
            credencialCRUD
                .excluirCredencial(idCredencial)
                .then((resultado) => {
                    console.log("Vendo exclusao")
                    response.status(200).json({
                        mensage: "Excluido com êxito"
                    })
                })
                .catch((erro) => {
                    console.log("Não foi possível excluir essa credencial")
                    response.status(500).json({
                        erro: "erro ao excluir credencial" + idCredencial
                    });
                });
        }
    }
}

module.exports = CredencialController;