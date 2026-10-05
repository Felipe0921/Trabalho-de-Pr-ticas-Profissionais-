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
            var sql = "SELECT * FROM dbo.USUARIO WHERE cps + " +cpf;
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
            console.log("Inserido com sucesso" + sql);
            this._db.query(sql, function(resolve, reject) {
                
            })
        })
    }

}

module.exports = UsuarioCRUD;