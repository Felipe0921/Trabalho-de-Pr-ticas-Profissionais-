const RecursoController = require('../controller/credenciaisController');

const obj_RecursoController = new RecursoController()

module.exports = (aplicacao) => {
    aplicacao.use((request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*")
        next()
    })

    //  rotas / endpoints

    // rotaGET, Listagem de recurso
    aplicacao.get("/Recurso", obj_RecursoController.listarTodosRecursos());

    // totaGET, listagem de recurso por ID
    aplicacao.get("/Recurso/:id", obj_RecursoController.listarTodosRecusosPorId());

    // rota POST insere recurso
    aplicacao.post("/Recurso", obj_RecursoController.inserirRecurso())

    // rota PUT atualiza recurso
    aplicacao.put("/Recurso/:id", obj_RecursoController.atualizarRecurso())

    // rota DELETE exclui recurso
    aplicacao.delete("/Recurso/:id", obj_RecursoController.excluirRecurso())
}