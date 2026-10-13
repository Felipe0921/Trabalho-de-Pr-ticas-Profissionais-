const CredencialController = require('../controller/credenciaisController');

const obj_CredencialController = new CredencialController()

module.exports = (aplicacao) => {
    aplicacao.use((request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*")
        next()
    })

    //  rotas / endpoints

    // rotaGET, Listagem de credenciais
    aplicacao.get("/Credencial", obj_CredencialController.listarTodasCredenciais());

    // totaGET, listagem de credenciais por ID
    aplicacao.get("/Credencial/:id", obj_CredencialController.listarTodasCredenciaisPorId());

    // rota POST insere credenciais
    aplicacao.post("/Credencial", obj_CredencialController.inserirCredenciais())

    // rota PUT atualiza credencial
    aplicacao.put("/Credencial/:id", obj_CredencialController.atualizarCredencial())

    // rota DELETE exclui credenciais
    aplicacao.delete("/Credencial/:id", obj_CredencialController.excluirCredencial())
}