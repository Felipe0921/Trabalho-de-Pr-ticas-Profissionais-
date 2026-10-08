const StatusReservaController = require('../controller/statusReservaController');

const controller = new StatusReservaController();

module.exports = (aplicacao) => {
    aplicacao.get('/Status', controller.listarTodos());

    aplicacao.get('/Status/:id', controller.buscarPorID());

    aplicacao.post('/Status', controller.inserir());

    aplicacao.put('/Status/:id', controller.atualizar());

    aplicacao.delete('/Status/:id', controller.excluir());
};
