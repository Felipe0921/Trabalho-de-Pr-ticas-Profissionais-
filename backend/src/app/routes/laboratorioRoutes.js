const LaboratorioController = require('../controller/laboratorioController');

const controller = new LaboratorioController();

module.exports = (aplicacao) => {
    aplicacao.get('/Laboratorio', controller.listarTodos());

    aplicacao.post('/Laboratorio', controller.inserir());

    aplicacao.delete('/Laboratorio/:id', controller.excluir());
};