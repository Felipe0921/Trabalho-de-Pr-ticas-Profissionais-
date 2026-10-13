class HistoricoReservaCRUD {
    constructor(db) {
        this._db = db;
    }

    gerarListagemHistorico() {
        return new Promise((resolve, reject) => {
            var sql =
                "SELECT * FROM dbo.HISTORICO_RESERVA ORDER BY id_historico";

            this._db.query(sql, function(erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("Falha ao listar histórico");
                }
                resolve(recordset);
            });
        });
    }

    gerarListagemHistoricoPorID(id) {
        return new Promise((resolve, reject) => {
            var sql =
                "SELECT * FROM dbo.HISTORICO_RESERVA WHERE id_historico = " + id;

            this._db.query(sql, function(erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao buscar histórico por ID");
                }
                resolve(recordset);
            });
        });
    }

    insereHistorico(historico) {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO dbo.HISTORICO_RESERVA ";
            sql += "(id_reserva, id_status_anterior, id_status_novo, ";
            sql += "id_usuario_responsavel, observacao) VALUES (";
            sql += historico.id_reserva + ",";
            sql += historico.id_status_anterior == null
                ? "NULL,"
                : historico.id_status_anterior + ",";
            sql += historico.id_status_novo + ",";
            sql += historico.id_usuario_responsavel + ",";
            sql += historico.observacao == null
                ? "NULL)"
                : "'" + historico.observacao + "')";

            console.log("Insert montado = " + sql);

            this._db.query(sql, function(erro) {
                if (erro) {
                    console.log(erro);
                    return reject("Falha ao inserir histórico");
                }
                resolve();
            });
        });
    }

    atualizaHistorico(id, historico) {
        return new Promise((resolve, reject) => {
            var sql = "UPDATE dbo.HISTORICO_RESERVA SET ";
            sql += "id_reserva = " + historico.id_reserva + ",";
            sql += historico.id_status_anterior == null
                ? "id_status_anterior = NULL,"
                : "id_status_anterior = " + historico.id_status_anterior + ",";
            sql += "id_status_novo = " + historico.id_status_novo + ",";
            sql += "id_usuario_responsavel = " +
                historico.id_usuario_responsavel + ",";
            sql += historico.observacao == null
                ? "observacao = NULL "
                : "observacao = '" + historico.observacao + "' ";
            sql += "WHERE id_historico = " + id;

            this._db.query(sql, function(erro) {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao atualizar histórico");
                }
                resolve();
            });
        });
    }

    excluiHistorico(id) {
        return new Promise((resolve, reject) => {
            var sql =
                "DELETE FROM dbo.HISTORICO_RESERVA WHERE id_historico = " + id;

            this._db.query(sql, function(erro) {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao excluir histórico");
                }
                resolve();
            });
        });
    }
}

module.exports = HistoricoReservaCRUD;