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
            const cpfUsuario = request.params.cpf;
            const usuarioCRUD = new UsuarioCRUD(db);
            usuarioCRUD
                .gerarListagemDeUsuarioPorCPF()
                .then((resultado) => {
                    console.log("Dados (json) do usuario por cpf")
                    console.log(resultado.request)
                    response.json(resultado.request)
                })
                .catch((erro) => {
                    console.log(erro)
                    response.status(500).json({
                        erro: "erro ao listar usuarios por cpf"
                    })
                })
        }
    }

    excluirUsuarioPorID()
    {
        return function(request, response) 
        {
            const idUsuario = request.params.id;
            const usuarioCRUD = new UsuarioCRUD(db)
            usuarioCRUD
                .excluirUsuario(idUsuario)
                .then((resultado) => {
                    console.log("Usuario id = "+idUsuario+"excluido com êxito")
                    response.status(500).json({
                        erro: "erro ao excluir Usuario de id = " + idUsuario
                    })
                })
        }
    }

    inserirUsuarioNovo()
    {
        return function(request, response)
        {
            let dados = request.body
            console.log("dados do novo usuario: "+dados)
            const usuarioCRUD = new UsuarioCRUD(db)
            usuarioCRUD 
                .insereUsuario()
                .then((resposta) => {
                    console.log("Usuario inserido com sucesso")
                    response.status(200).end()
                })
                .catch((erro) => {
                    console.log(500).json({
                        erro: "Erro ao inserir Usuario" 
                    })
                })
            }
    }
}
