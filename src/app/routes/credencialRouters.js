const CredencialController = require("../controller/credenciaisController");

const controller = new CredencialController();

module.exports = (aplicacao) => {
    aplicacao.get(
        "/Credencial",
        controller.listarTodasCredenciais()
    );

    aplicacao.get(
        "/Credencial/:id",
        controller.listarTodasCredenciaisPorId()
    );

    aplicacao.post(
        "/Credencial",
        controller.inserirCredenciais()
    );

    aplicacao.post(
        "/Login",
        controller.login()
    );

    aplicacao.put(
        "/Credencial/:id",
        controller.atualizarCredencial()
    );

    aplicacao.delete(
        "/Credencial/:id",
        controller.excluirCredencial()
    );
};
