const db = require('../../config/database.js');
const SalaCRUD = require('../model/Sala.js');

class SalaController {
    listarTodas() {
        return function (request, response) {
            const model = new SalaCRUD(db);

            model.listarTodas()
                .then((resultado) => {
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: 'Erro ao listar salas'
                    });
                });
        };
    }

    inserir() {
        return function (request, response) {
            const model = new SalaCRUD(db);

            model.inserir(request.body)
                .then(() => {
                    response.status(201).json({
                        mensagem: 'Sala inserida com sucesso'
                    });
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: 'Erro ao inserir sala'
                    });
                });
        };
    }

    excluir() {
        return function (request, response) {
            const id = request.params.id;
            const model = new SalaCRUD(db);

            model.excluir(id)
                .then(() => {
                    response.status(200).json({
                        mensagem: 'Sala excluída com sucesso'
                    });
                })
                .catch((erro) => {
                    console.log(erro);
                    response.status(500).json({
                        erro: 'Erro ao excluir sala'
                    });
                });
        };
    }
}

module.exports = SalaController;
