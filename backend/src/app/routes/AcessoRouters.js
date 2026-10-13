const AcessoController =
    require('../controller/AcessoController');

const obj_AcessoController = new AcessoController();

module.exports = (aplicacao) => {
    aplicacao.get("/Acesso",obj_AcessoController.listarTodosAcessos());

    aplicacao.get("/Acesso/:id",obj_AcessoController.listarAcessoPorID());

    aplicacao.post("/Acesso",obj_AcessoController.inserirAcesso());

    aplicacao.put("/Acesso/:id",obj_AcessoController.atualizarAcesso());

    aplicacao.delete("/Acesso/:id",obj_AcessoController.excluirAcesso());
};