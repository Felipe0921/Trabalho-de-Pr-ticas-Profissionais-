class AcessoCRUD {
    constructor(db) {
        this._db = db;
    }

    gerarListagemAcessos() {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM dbo.ACESSO ORDER BY id_acesso";

            this._db.query(sql, function(erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("Falha ao listar acessos");
                }
                resolve(recordset);
            });
        });
    }

    gerarListagemAcessoPorID(id) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM dbo.ACESSO WHERE id_acesso = " + id;

            this._db.query(sql, function(erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao buscar acesso por ID");
                }
                resolve(recordset);
            });
        });
    }

    insereAcesso(acesso) {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO dbo.ACESSO ";
            sql += "(id_usuario, login_informado, sucesso, ";
            sql += "endereco_ip, mensagem_resultado) VALUES (";
            sql += acesso.id_usuario == null
                ? "NULL,"
                : acesso.id_usuario + ",";
            sql += "'" + acesso.login_informado + "',";
            sql += acesso.sucesso ? "1," : "0,";
            sql += acesso.endereco_ip == null
                ? "NULL,"
                : "'" + acesso.endereco_ip + "',";
            sql += acesso.mensagem_resultado == null
                ? "NULL)"
                : "'" + acesso.mensagem_resultado + "')";

            console.log("Insert montado = " + sql);

            this._db.query(sql, function(erro) {
                if (erro) {
                    console.log(erro);
                    return reject("Falha ao inserir acesso");
                }
                resolve();
            });
        });
    }

    atualizaAcesso(id, acesso) {
        return new Promise((resolve, reject) => {
            var sql = "UPDATE dbo.ACESSO SET ";
            sql += acesso.id_usuario == null
                ? "id_usuario = NULL,"
                : "id_usuario = " + acesso.id_usuario + ",";
            sql += "login_informado = '" + acesso.login_informado + "',";
            sql += acesso.sucesso ? "sucesso = 1," : "sucesso = 0,";
            sql += acesso.endereco_ip == null
                ? "endereco_ip = NULL,"
                : "endereco_ip = '" + acesso.endereco_ip + "',";
            sql += acesso.mensagem_resultado == null
                ? "mensagem_resultado = NULL "
                : "mensagem_resultado = '" +
                    acesso.mensagem_resultado + "' ";
            sql += "WHERE id_acesso = " + id;

            this._db.query(sql, function(erro) {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao atualizar acesso");
                }
                resolve();
            });
        });
    }

    excluiAcesso(id) {
        return new Promise((resolve, reject) => {
            var sql = "DELETE FROM dbo.ACESSO WHERE id_acesso = " + id;

            this._db.query(sql, function(erro) {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao excluir acesso");
                }
                resolve();
            });
        });
    }
}

module.exports = AcessoCRUD;