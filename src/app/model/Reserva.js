class ReservaCRUD {
    constructor(db) {
        this._db = db;
    }

    gerarListagemReserva() {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM dbo.RESERVA ORDER BY id_reserva";

            this._db.query(sql, function(erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("Falha ao listar reservas");
                }
                resolve(recordset);
            });
        });
    }

    gerarListagemReservaPorID(id) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM dbo.RESERVA WHERE id_reserva = " + id;

            this._db.query(sql, function(erro, recordset) {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao listar reserva por ID");
                }
                resolve(recordset);
            });
        });
    }

    insereReserva(reserva) {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO dbo.RESERVA ";
            sql += "(id_recurso, id_usuario, id_status_reserva, ";
            sql += "data_inicial, data_final, hora_inicial, hora_final, ";
            sql += "finalidade, observacao) VALUES (";
            sql += reserva.id_recurso + ",";
            sql += reserva.id_usuario + ",";
            sql += reserva.id_status_reserva + ",";
            sql += "'" + reserva.data_inicial + "',";
            sql += "'" + reserva.data_final + "',";
            sql += "'" + reserva.hora_inicial + "',";
            sql += "'" + reserva.hora_final + "',";
            sql += reserva.finalidade == null
                ? "NULL,"
                : "'" + reserva.finalidade + "',";
            sql += reserva.observacao == null
                ? "NULL)"
                : "'" + reserva.observacao + "')";

            console.log("Insert montado = " + sql);

            this._db.query(sql, function(erro) {
                if (erro) {
                    console.log(erro);
                    return reject("Falha ao inserir reserva");
                }
                resolve();
            });
        });
    }

    atualizaReserva(id, reserva) {
        return new Promise((resolve, reject) => {
            var sql = "UPDATE dbo.RESERVA SET ";
            sql += "id_recurso = " + reserva.id_recurso + ",";
            sql += "id_usuario = " + reserva.id_usuario + ",";
            sql += "id_status_reserva = " + reserva.id_status_reserva + ",";
            sql += "data_inicial = '" + reserva.data_inicial + "',";
            sql += "data_final = '" + reserva.data_final + "',";
            sql += "hora_inicial = '" + reserva.hora_inicial + "',";
            sql += "hora_final = '" + reserva.hora_final + "',";
            sql += reserva.finalidade == null
                ? "finalidade = NULL,"
                : "finalidade = '" + reserva.finalidade + "',";
            sql += reserva.observacao == null
                ? "observacao = NULL,"
                : "observacao = '" + reserva.observacao + "',";
            sql += "data_atualizacao = SYSDATETIME() ";
            sql += "WHERE id_reserva = " + id;

            console.log("Update montado = " + sql);

            this._db.query(sql, function(erro) {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao atualizar reserva");
                }
                resolve();
            });
        });
    }

    excluiReserva(id) {
        return new Promise((resolve, reject) => {
            var sql = "DELETE FROM dbo.RESERVA WHERE id_reserva = " + id;

            this._db.query(sql, function(erro) {
                if (erro) {
                    console.log(erro);
                    return reject("Erro ao excluir reserva");
                }
                resolve();
            });
        });
    }
}

module.exports = ReservaCRUD;