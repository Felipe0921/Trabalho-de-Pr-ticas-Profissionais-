const StatusReservaController = require('../controller/statusReservaController');

const obj_StatusReservaController = new StatusReservaController();

module.exports = (aplicacao) => {
    aplicacao.get('/Status', obj_StatusReservaController.listarTodos());

    aplicacao.get('/Status/:id', obj_StatusReservaController.buscarPorID());

    aplicacao.post('/Status', obj_StatusReservaController.inserir());

    aplicacao.put('/Status/:id', obj_StatusReservaController.atualizar());

    aplicacao.delete('/Status/:id', obj_StatusReservaController.excluir());
};