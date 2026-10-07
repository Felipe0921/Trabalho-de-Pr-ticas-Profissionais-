var db = require('../../config/database.js');
const CredencialCRUD = require('../model/Credencial.js')

class CredencialController
{
    listarTodasCredenciais()
    {
        return function(request, response) {
            const credencialCRUD = new CredencialCRUD(db);
            credencialCRUD
                .gerarListagemCredenciais()
                .then((resultado) => {
                    console.log("Dados (json) da tabela usuarios");
                    console.log(resultado.recordset);
                    response.json(resultado.recordset);
                })
                .catch((erro) => {
                    console.log(erro)
                    response.status(500).json({
                        erro: "erro na listagem de credenciais"
                    });
                });
        }
    }

    
}