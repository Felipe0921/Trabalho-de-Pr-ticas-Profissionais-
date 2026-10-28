const SalaController = require("../controller/salaController");

const controller = new SalaController();

module.exports = (aplicacao) => {
    aplicacao.get(
        "/Sala",
        controller.listarTodas()
    );

    aplicacao.get(
        "/Sala/:id",
        controller.buscarPorID()
    );

    aplicacao.post(
        "/Sala",
        controller.inserir()
    );

    aplicacao.put(
        "/Sala/:id",
        controller.atualizar()
    );

    aplicacao.delete(
        "/Sala/:id",
        controller.excluir()
    );
};
