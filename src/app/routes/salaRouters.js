const SalaController = require('../controller/salaController');

const controller = new SalaController();

module.exports = (aplicacao) => {
    aplicacao.get('/Sala', controller.listarTodas());

    aplicacao.post('/Sala', controller.inserir());

    aplicacao.delete('/Sala/:id', controller.excluir());
};