const LaboratorioController = require("../controller/laboratorioController");

const controller = new LaboratorioController();

module.exports = (aplicacao) => {
    aplicacao.get(
        "/Laboratorio",
        controller.listarTodos()
    );

    aplicacao.get(
        "/Laboratorio/:id",
        controller.buscarPorID()
    );

    aplicacao.post(
        "/Laboratorio",
        controller.inserir()
    );

    aplicacao.put(
        "/Laboratorio/:id",
        controller.atualizar()
    );

    aplicacao.delete(
        "/Laboratorio/:id",
        controller.excluir()
    );
};


