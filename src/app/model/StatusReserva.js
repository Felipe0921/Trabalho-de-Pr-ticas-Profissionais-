class StatusReservaCRUD {
    constructor(db) {
        this._db = db;
    }

    listarTodos() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM dbo.STATUS_RESERVA ORDER BY id_status_reserva";

            this._db.query(sql, (erro, recordset) => {
                if (erro) {
                    return reject(erro);
                }

                resolve(recordset);
            });
        });
    }

    buscarPorID(id) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM dbo.STATUS_RESERVA WHERE id_status_reserva =" + id;

            this._db.query(sql, (erro, recordset) => {
                if (erro) {
                    return reject(erro);
                }

                resolve(recordset);
            });
        });
    }

    inserir(status) {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO dbo.STATUS_RESERVA " 
            sql += "(nome, descricao)";
            sql += " VALUES ('" + status.nome + "',"
            sql += "'" + status.descricao + "')";

            this._db.query(sql, (erro, recordset) => {
                if (erro) {
                    return reject(erro);
                }

                resolve(recordset);
            });
        });
    }

    atualizar(id, status) {
        return new Promise((resolve, reject) => {
            var sql = "UPDATE dbo.STATUS_RESERVA SET ";
            sql += "nome ='" + status.nome + "',"
            sql += "descricao ='" + status.descricao + "' WHERE id = '"+id+"'";
            console.log("Update feito ")

            this._db.query(sql, (erro, recordset) => {
                if (erro) {
                    return reject(erro);
                }

                resolve(recordset);
            });
        });
    }

    excluir(id) {
        return new Promise((resolve, reject) => {
            var sql = "DELETE FROM dbo.STATUS_RESERVA WHERE id_usuario = " + id;

            this._db.query(sql, function (erro, recordset){
                if (erro) {
                    return reject(erro);
                }

                resolve(recordset);
            });
        });
    }
}

module.exports = StatusReservaCRUD;