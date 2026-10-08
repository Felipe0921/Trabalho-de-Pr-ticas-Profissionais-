const TipoRecursoController = require('../controller/TipoRecursoController');

const obj_TipoRecursoController = new TipoRecursoController()

module.exports = (aplicacao) => {
    aplicacao.use((request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*")
        next()
    })

    // rotas e endpoints

    // rota GET, listagem de todos tipo recursos
    aplicacao.get("/TipoRecurso", obj_TipoRecursoController.listarTodosTipoRecurso())

    // rota GET, listagem do tipo recurso po ID
    aplicacao.get("/TipoRecurso/:id", obj_TipoRecursoController.listarTodosTipoRecursoPorID())

    // rota POST, inserir tipo recurso
    aplicacao.post("/TipoRecurso", obj_TipoRecursoController.inserirTipoRecursoNovo())

    // rota PUT, atualizar tipo recurso
    aplicacao.put("/TipoRecurso/:id", obj_TipoRecursoController.atualizarTipoRecurso())

    // rota DELETE, excluir tipo recurso
    aplicacao.delete("/TipoRecurso/:id", obj_TipoRecursoController.excluirTipoRecurso())
    
}