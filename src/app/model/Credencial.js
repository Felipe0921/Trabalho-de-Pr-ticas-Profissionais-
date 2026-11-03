class CredencialCRUD {
    constructor(db) {
        this._db = db;
    }

    gerarListagemCredenciais() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT *
                FROM dbo.CREDENCIAL
                ORDER BY id_credencial
            `;

            this._db.query(sql, (erro, recordset) => {
                if (erro) {
                    console.log(erro);
                    return reject(erro);
                }

                resolve(recordset);
            });
        });
    }

    gerarListagemCredenciaisPorID(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT *
                FROM dbo.CREDENCIAL
                WHERE id_usuario = ${Number(id)}
            `;

            this._db.query(sql, (erro, recordset) => {
                if (erro) {
                    console.log(erro);
                    return reject(erro);
                }

                resolve(recordset);
            });
        });
    }

    autenticar(login, senha) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT
                    c.id_credencial,
                    c.id_usuario,
                    c.login,
                    u.nome_completo,
                    u.cpf,
                    u.email
                FROM dbo.CREDENCIAL c
                INNER JOIN dbo.USUARIO u
                    ON u.id_usuario = c.id_usuario
                WHERE c.login = '${login}'
                  AND c.senha_hash = '${senha}'
            `;

            this._db.query(sql, (erro, recordset) => {
                if (erro) {
                    console.log(erro);
                    return reject(erro);
                }

                resolve(recordset);
            });
        });
    }

    insereCredencial(credencial) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO dbo.CREDENCIAL
                    (id_usuario, login, senha_hash)
                VALUES
                    (
                        ${Number(credencial.id_usuario)},
                        '${credencial.login}',
                        '${credencial.senha_hash}'
                    )
            `;

            this._db.query(sql, (erro, recordset) => {
                if (erro) {
                    console.log(erro);
                    return reject(erro);
                }

                resolve(recordset);
            });
        });
    }

    atualizaCredencial(id, credencial) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE dbo.CREDENCIAL
                SET
                    login = '${credencial.login}',
                    senha_hash = '${credencial.senha_hash}'
                WHERE id_credencial = ${Number(id)}
            `;

            this._db.query(sql, (erro, recordset) => {
                if (erro) {
                    console.log(erro);
                    return reject(erro);
                }

                resolve(recordset);
            });
        });
    }

    excluirCredencial(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                DELETE FROM dbo.CREDENCIAL
                WHERE id_credencial = ${Number(id)}
            `;

            this._db.query(sql, (erro, recordset) => {
                if (erro) {
                    console.log(erro);
                    return reject(erro);
                }

                resolve(recordset);
            });
        });
    }
}

module.exports = CredencialCRUD;
