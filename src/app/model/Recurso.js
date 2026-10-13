class RecursoCRUD {
    constructor(db) {
        this._db = db;
    }

    gerarListagemRecurso()
    {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM dbo.RECURSO ORDER BY id_recurso";
            this._db.query(sql, function(erro, recordset)
            {
                if(erro) 
                {
                    console.log(erro);
                    return reject("falha ao listar recursos");
                }
                console.log("listagem de recursos listada com êxito");
                resolve(recordset);
            });
        });
    }

    gerarListagemRecursoPorID(id)
    {
        return new Promise((resolve, reject)=>{
            var sql = "SELECT * FROM dbo.RECURSO WHERE id_recurso =" + id;
            this._db.query(sql, function(erro, recordset)
            {
                if(erro)
                {
                    console.log(erro);
                    return reject("Erro ao listar recurso por ID");
                }
                console.log("Listagem feita com sucesso")
                resolve(recordset);
            });
        });
    }

    insereRecurso(recurso)
    {
        return new Promise((resolve, reject) => {
            console.log("A credencial recebida é " + recurso)
            var sql = "INSERT INTO dbo.CREDENCIAL"
            sql += "(id_usuario, login, senha_hash)";
            sql += "VALUES (" + recurso.id_tipo_recurso + ",";
            sql += "'" + recurso.codigo + "',";
            sql += "'" + recurso.nome +"',";
            sql += "'" + recurso.capacidade + "',";
            sql += "'" + recurso.localizacao + "',";
            sql += "'" + recurso.ativo + "',";
            sql += "'" + recurso.observacao + "')";
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

    atualizaRecurso(id, recurso)
    {
        return new Promise((resolve, reject) => {
            var sql = "UPDATE dbo.RECURSO SET ";
                sql += "id_tipo_recurso = '" + recurso.id_tipo_recurso + "',";
                sql += "codigo = '" + recurso.codigo + "',";
                sql += "nome = '" + recurso.nome + "',";
                sql += "capacidade = '" + recurso.capacidade + "',";
                sql += "localizacao = '" + recurso.localizacao + "',";
                sql += "ativo = '" + recurso.ativo + "',";
                sql += "observacao = '" + recurso.observacao + "' WHERE id_recurso =" +id
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

    excluiRecurso(id)
    {
        return new Promise((resolve, reject) => {
            var sql = "DELETE FROM dbo.RECURSO WHERE id_recurso =" + id
            this._db.query(sql, function(erro){
                if(erro) {
                    console.log(erro);
                    reject("Erro ao excluir recurso");
                }
                resolve();
            });
        });
    }
}

module.exports = RecursoCRUD;