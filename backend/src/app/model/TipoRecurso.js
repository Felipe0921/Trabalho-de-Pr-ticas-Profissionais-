class TipoRecursoCRUD {
    constructor(db) {
        this._db = db;
    }

    gerarListagemTodosCursos()
    {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM dbo.TIPO_RECURSO ORDER BY id_tipo_recurso";
            this._db.query(sql, function(erro, recordset)
            {
                if (erro) {
                    console.log(erro);
                    return reject("listagem de recursos falhou");
                }
                console.log("listagem de recursos gerada com sucesso");
                resolve(recordset);
            });
        });
    }

    gerarListagemTodosTiposRecursosPorID(id)
    {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM dbo.TIPO_RECURSO WHERE id_tipo_recurso = "+ id;
            this._db.query(sql, function(erro, recordset)
            {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao listar recuso po ID");
                };
                console.log("Listagem por ID feita com sucesso");
                resolve(recordset);
            });
        });
    }

    insereTipoRecurso(recurso)
    {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO dbo.TIPO_RECURSO";
            sql += "(nome, descricao)";
            sql += " VALUES ('" + recurso.nome + "',";
            sql += "'" + recurso.descricao + "')";
            console.log("insert montado " + sql);
            this._db.query(sql, function(erro, recordset) {
                if(erro) {
                    console.log(erro);
                    return reject("Falha ao inserir Tipo recurso");
                }
                console.log("Inserção feita com sucesso");
                resolve(recordset);
            });
        });
    }

    atualizaTipoCurso(id, tipoRecurso)
    {
        return new Promise((resolve, reject) => {
            var sql = "UPDATE dbo.TIPO_RECURSO SET ";
            sql += "nome ='" + tipoRecurso.nome + "',";
            sql += "descricao ='" + tipoRecurso.descricao + "' WHERE id_tipo_recurso = " + id;
            console.log("atualização concluida");
            this._db.query(sql, function (erro, recordset) {
                if(erro) {
                    console.log(erro);
                    return reject("Falha na atualização");
                }
                console.log("atualização feita com sucesso");
                resolve(recordset);
            });
        });
    }

    excluiTipoRecurso(id)
    {
        return new Promise((resolve, reject) => {
            var sql = "DELETE FROM dbo.TIPO_RECURSO WHERE id_tipo_recurso = "+ id;
            this._db.query(sql, function(erro, recordset) {
                if(erro) {
                    console.log(erro);
                    return reject("Erro ao excluir Tipo Recurso");
                }
                console.log("Exclusão feita com êxito");
                resolve(recordset);
            });
        });
    }
}

module.exports = TipoRecursoCRUD;