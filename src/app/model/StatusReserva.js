class StatusReservaCRUD {
    constructor(db) {
        this._db = db;
    }

    listarTodos() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT *
                FROM dbo.STATUS_RESERVA
                ORDER BY id_status_reserva
            `;

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
            const sql = `
                SELECT *
                FROM dbo.STATUS_RESERVA
                WHERE id_status_reserva = ${Number(id)}
            `;

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
            const sql = `
                INSERT INTO dbo.STATUS_RESERVA
                    (nome, descricao, permite_reserva, ativo)
                VALUES
                    ('${status.nome}',
                     '${status.descricao || ""}',
                     ${status.permite_reserva ? 1 : 0},
                     ${status.ativo === false ? 0 : 1})
            `;

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
            const sql = `
                UPDATE dbo.STATUS_RESERVA
                SET
                    nome = '${status.nome}',
                    descricao = '${status.descricao || ""}',
                    permite_reserva = ${status.permite_reserva ? 1 : 0},
                    ativo = ${status.ativo === false ? 0 : 1}
                WHERE id_status_reserva = ${Number(id)}
            `;

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
            const sql = `
                DELETE FROM dbo.STATUS_RESERVA
                WHERE id_status_reserva = ${Number(id)}
            `;

            this._db.query(sql, (erro, recordset) => {
                if (erro) {
                    return reject(erro);
                }

                resolve(recordset);
            });
        });
    }
}

module.exports = StatusReservaCRUD;
