class UsuarioCRUD {
    constructor(db) {
        this._db = db;
    }

    gerarListagemDeUsuario()
    {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM dbo.USUARIO ORDER BY id_usuario";
            this._db.query(sql, function(erro, recordset)
            {
                if (erro) {
                    console.log("erro = " + erro);
                    return reject("listagem de Usuarios falhou!");
                }
                console.log("listagem de usuarios gerada com sucesso");
                resolve(recordset);
            });
        });
    }

    gerarListagemDeUsuarioPorID(id)
    {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM dbo.USUARIO WHERE id_usuario = " + id;
            this._db.query(sql, function(erro, recordset)
            {
                if (erro) {
                    console.log("erro = " + erro);
                    return reject("listagem de Usuarios por ID falhou!");
                }
                console.log("listagem de usuarios por ID gerada com sucesso");
                resolve(recordset);
            });
        })
    }

    gerarListagemDeUsuarioPorCPF(cpf)
    {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM dbo.USUARIO WHERE cpf =  + '"+cpf+"'";
            this._db.query(sql, function(erro, recordset){
                if (erro) {
                    console.log("erro = " + erro);
                    return reject("listagem de usuarios por CPF falhou");
                }
                console.log("listagem de usuarios po CPF feita com sucesso");
                resolve(recordset);
            });
        });
    }

    insereUsuario(usuario)
    {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO dbo.USUARIO" 
            sql += "(cpf, nome_completo, data_nascimento, celular, email)";
            sql += " VALUES ('" + usuario.cpf + "',"
            sql += "'" + usuario.nome_completo + "',";
            sql += "'" + usuario.data_nascimento + "',";
            sql += "'" + usuario.celular + "',";
            sql += "'" + usuario.email + "')";
            console.log("Insert montado " + sql);
            this._db.query(sql, function(erro) {
                if (erro) {
                    console.log(erro);
                    return reject("Falha ao inserir usuario" + erro);
                }
                resolve();
            })
        })
    }

    atualizaUsuario(cpf, usuario)
    {
        return new Promise((resolve, reject) => {
            var sql = "UPDATE dbo.USUARIO SET ";
            sql += "nome_completo ='" + usuario.nome_completo + "',"
            sql += "celular ='" + usuario.celular + "',";
            sql += "email ='" + usuario.email + "' WHERE cpf = '"+cpf+"'";
            console.log("Update feito ")
            this._db.query(sql, function(erro) {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao atualizar o usuario");
                }
                resolve();
            });
        });
    }

    excluirUsuario(cpf)
    {
        return new Promise((resolve, reject) => {
            var sql = "DELETE FROM dbo.USUARIO WHERE cpf = '" + cpf +"'";
            this._db.query(sql, function(erro){
                if (erro) {
                    console.log("erro = " + erro)
                    return reject("Falha ao excluir usuario " + cpf)
                }
                console.log("Sucesso ao excluir usuario " + cpf)
                resolve()
            });
        });
    }
}

module.exports = UsuarioCRUD;