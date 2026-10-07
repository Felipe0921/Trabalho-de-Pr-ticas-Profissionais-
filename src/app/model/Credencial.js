class CredencialCRUD {
    constructor(db) {
        this._db = db;
    }

    gerarListagemCredenciais()
    {
        return new Promise((resolve, reject) => {
            var sql = "SELCT * FROM dbo.CREDENCIAL ORDER BY id_credencial";
            this._db.query(sql, function(erro, recordset)
            {
                if(erro) 
                {
                    console.log(erro);
                    return reject("falha ao listar credenciais");
                }
                console.log("listagem de credenciais listada com êxito");
                resolve(recordset);
            });
        });
    }

    gerarListagemCredenciaisPorID(id)
    {
        return new Promise((resolve, reject)=>{
            var sql = "SELECT * FROM dbo.CREDENCIAIS WHERE id_usuario" + Id;
            this._db.query(sql, function(erro, recordset)
            {
                if(erro)
                {
                    console.log(erro);
                    return reject("Erro ao listar credenciais por ID");
                }
                console.log("Listagem feita com sucesso")
                resolve(recordset);
            });
        });
    }

    insereCredencial(credencial)
    {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO dbo.CREDENCIAL"
            sql += "(id_usuario, login, senha_hash)";
            sql += "VALUES ('" + credencial.id_usuario + "',";
            sql += "'" + credencial.login + "',";
            sql += "'" + credencial.senha.hash +"')";
            console.log("Insert montado " + sql);
            this._db.query(sql, function(erro) {
                if(erro)
                {
                    console.log(erro);
                    return reject("Falha ao inserir credencial");
                }
                resolve();
            });
        });
    }

    atualizaCredencial(credencial, usuario)
    {
        return new Promise((resolve, reject) => {
            var sql = "UPDATE dbo.CREDENCIAL SET";
                sql += "login = '" + credencial.login + "',";
                sql += "celular = " + credencial.senha_hash + "' WHERE '" +usuario+"'";
                console.log("Update feito");
                this._db.query(sql, function(erro) {
                    if (erro) {
                        console.log(erro);
                        return reject("Erro ao atualizar credencial");
                    }
                    resolve();
                });
        });
    }

    excluirCredencial(id)
    {
        return new Promise((resolve, reject) => {
            var sql = "DELETE FROM dbo.CREDENCIAL WHERE id_credencial'" + id + "'";
            this._db.query(sql, function(erro){
                if(erro) {
                    console.log(erro);
                    reject("Erro ao excluir credencial");
                }
                resolve();
            });
        });
    }
}

module.exports = CredencialCRUD;