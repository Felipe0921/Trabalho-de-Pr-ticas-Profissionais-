var db = require('../../config/database.js');
const RecursoCRUD = require('../model/Recurso.js')

class RecursoController
{
    listarTodosRecursos()
    {
        return function(request, response) {
            const recursoCRUD = new RecursoCRUD(db);
            recursoCRUD
                .gerarListagemRecurso()
                .then((resultado) => {
                    console.log("Dados (json) da tabela recurso");
                    console.log(resultado.recordset);
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro)
                    response.status(500).json({
                        erro: "erro na listagem de recursos"
                    });
                });
        }
    }

    listarTodosRecusosPorId()
    {
        return function(request, response) {
            const idRecurso = request.params.id
            const recursoCRUD = new RecursoCRUD(db)
            recursoCRUD
                .gerarListagemRecursoPorID(idRecurso)
                .then((resultado) => {
                    console.log("Dados (json) da tabela recurso pelo ID")
                    console.log(resultado.recordset)
                    response.json(resultado.recordset)
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao listar recurso por ID"
                    })
                })
        }
    }

    inserirRecurso()
    {
        return function(request, response)
        {
            let dados = request.body
            console.log("Dados das novos recursos: " + dados);
            const recursoCRUD = new RecursoCRUD(db);
            recursoCRUD
                .insereRecurso(dados)
                .then((resultado) => {
                    console.log("Analisando recurso");
                    response.status(200).end();
                })
                .catch((erro) => {
                    response.status(500).json({
                        erro: "Erro ao inserir recurso",
                        detalhe: erro
                    });
                });
        }
    }

    atualizarRecurso()
    {
        return function (request, response)
        {
            let dados = request.body;
            console.log("Dados do recurso para atualizar")
            let idRecurso = request.params.id;
            const recursoCRUD = new RecursoCRUD(db);
            recursoCRUD  
                .atualizaRecurso(idRecurso, dados)
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

    excluirRecurso()
    {
        return function (request, response)
        {
            const idRecurso = request.params.id;
            const recursoCRUD = new RecursoCRUD(db);
            recursoCRUD
                .excluiRecurso(idRecurso)
                .then((resultado) => {
                    console.log("Analisando exclusao")
                    response.status(200).json({
                        mensage: "Excluido com êxito"
                    })
                })
                .catch((erro) => {
                    console.log("Não foi possível excluir esse recurso")
                    response.status(500).json({
                        erro: "erro ao excluir recurso" + idRecurso
                    });
                });
        }
    }
}

module.exports = RecursoController;