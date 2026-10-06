const UsuarioController = require("../controller/usuarioController")

const obj_UsuarioController = new UsuarioController()

module.exports = (aplicacao) => {
    aplicacao.use((request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*")
        next()
    })

    // rotas / endpoints

    // rota GET, listagem de usuarios
    aplicacao.get("/Usuario", obj_UsuarioController.listarTodosUsuarios())

    // rota GET listagem de usuarios por id
    aplicacao.get("/Usuario/:id", obj_UsuarioController.listarTodosUsuariosPorID())

    // rota GET listagem de usuarios por cpf
    aplicacao.get("/Usuario/cpf/:cpf", obj_UsuarioController.listarTodosUsuariosPorCPF())

    // rota DELETE excluir usuario por id
    aplicacao.delete("/Usuario/:id", obj_UsuarioController.excluirUsuarioPorID())

    // rota POST insere um novo usuario
    aplicacao.post("/Usuario", obj_UsuarioController.inserirUsuarioNovo())

    // rota PUT atualiza um usuario
    aplicacao.put("/Usuario", obj_UsuarioController.atualizarUsuario())
}