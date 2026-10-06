var db = require('../../config/database.js');
const UsuarioCRUD = require('../model/Usuario.js');

class UsuarioController
{
    listarTodosUsuarios()
    {
        return function(request, response) {
            const usuarioCRUD = new UsuarioCRUD(db);
            usuarioCRUD
                .gerarListagemDeUsuario()
                .then((resultado) => {
                    console.log("DADOS (json) da tabela usuarios")
                    console.log(resultado.recordset)
                    response.json(resultado.recordset)
                })
                .catch((erro) => {
                    console.log(erro)
                    response.status(500).json({
                        erro: "erro ao listar os usuarios"
                    })
                })
        }
    }

    listarTodosUsuariosPorID()
    {
        return function(request, response)
        {
            const idUsuario = request.params.id;
            const usuarioCRUD = new UsuarioCRUD(db);
            usuarioCRUD 
                .gerarListagemDeUsuarioPorID(id)
                .then((resultado) => {
                    console.log("Dados (json) de todos os usuarios por id ")
                    console.log(resultado.request)
                    response.json(resultado.request)
                })
                .catch((erro) => {
                    console.log(erro)
                    response.status(500).json({
                        erro: "erro ao listar usuarios pelo id"
                    })
                })
        }
    }

    listarTodosUsuariosPorCPF()
    {
        return function(request, response)
        {
            const 
        }
    }

}