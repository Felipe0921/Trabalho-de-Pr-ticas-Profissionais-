var db = require('../../config/database.js');
const TipoRecursoCRUD = require('../model/TipoRecurso.js');

class TipoRecursoController
{
    listarTodosTipoRecurso()
    {
        return function(request, response) {
            const tiporecursoCRUD = new TipoRecursoCRUD(db);
            tiporecursoCRUD
                .gerarListagemTodosCursos()
                .then((resultado) => {
                    console.log("Dados (json) da tabela TipoRecurso")
                    console.log(resultado.recordset);
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro)
                    response.status(500).json({
                        erro: "Falha na listagem"
                    })
                })
        }
    }

    listarTodosTipoRecursoPorID()
    {
        return function (request, response) {
            const idtiporecurso = request.params.id;
            const tiporecursoCRUD = new TipoRecursoCRUD(db);
            tiporecursoCRUD
                .gerarListagemTodosTiposRecursosPorID(idtiporecurso)
                .then((resultado) => {
                    console.log("Dados (json) de tipo recursos po ID")
                    console.log(resultado.recordset)
                    response.json(resultado.recordset)
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: "Erro ao listar tipo recursos po ID"
                    })
                })
        }
    }

    inserirTipoRecursoNovo()
    {
        return function(request, response) {
            let dados = request.body;
            console.log("dados do novo tipo recurso: " + dados);
            const tiporecursoCRUD = new TipoRecursoCRUD(db);
            tiporecursoCRUD
                .insereTipoRecurso(dados)
                .then((resultado) => {
                    console.log("Analisando tipo recurso")
                    response.status(200).json({
                        mensage: "Dados do novo tipo recurso inseridos com sucesso"
                    })
                })
                .catch((erro) => {
                    response.status(500).json({
                        erro: "Falha ao inserir tipo recurso"
                    })
                })
        }
    }

    atualizarTipoRecurso()
    {
        return function (request, response)
        {
            let dados = request.body
            console.log("Dados a atualizar")
            let idtiporecurso = request.params.id;
            const tiporecursoCRUD = new TipoRecursoCRUD(db);
            tiporecursoCRUD
                .atualizaTipoCurso(idtiporecurso, dados)
                .then((resultado) => {
                    console.log("Dados atualizados com sucesso")
                    response.status(200).end()
                })
                .catch((erro) => {
                    console.log(erro)
                    response.status(500).json({
                        erro: "Falha ao atualizar tipo curso"
                    })
                })
        }
    }

    excluirTipoRecurso()
    {
        return function(request, response) {
            const idtiporecurso = request.params.id;
            const tiporecursoCRUD = new TipoRecursoCRUD(db)
            tiporecursoCRUD
                .excluiTipoRecurso(idtiporecurso)
                .then((resultado) => {
                    console.log("Tipo recurso excluido")
                    response.status(200).end()
                })
                .catch((erro) => {
                    console.log(("Não foi possivel excluir "))
                    response.status(500).json({
                        erro: "Erro ao excluir tipo recurso"
                    })
                })
        }
    }
}

module.exports = TipoRecursoController;