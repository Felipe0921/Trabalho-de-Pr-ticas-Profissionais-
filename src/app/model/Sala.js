class SalaCRUD {
    constructor(db) {
        this._db = db;
    }

    listarTodas() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT
                    r.id_recurso,
                    r.codigo,
                    r.nome,
                    r.capacidade,
                    r.localizacao,
                    r.ativo,
                    r.observacao,
                    s.tipo_sala,
                    s.possui_projetor,
                    s.possui_ar_condicionado,
                    s.observacao AS observacao_sala
                FROM dbo.RECURSO r
                INNER JOIN dbo.SALA s
                    ON s.id_recurso = r.id_recurso
                INNER JOIN dbo.TIPO_RECURSO tr
                    ON tr.id_tipo_recurso = r.id_tipo_recurso
                WHERE tr.nome = 'Sala de aula'
                ORDER BY r.codigo
            `;

            this._db.query(sql, (erro, recordset) => {
                if (erro) return reject(erro);
                resolve(recordset);
            });
        });
    }

    inserir(sala) {
        return new Promise((resolve, reject) => {
            const sql = `
                DECLARE @id_recurso INT;

                INSERT INTO dbo.RECURSO
                    (id_tipo_recurso, codigo, nome, capacidade, localizacao, observacao)
                SELECT
                    id_tipo_recurso,
                    '${sala.codigo}',
                    '${sala.nome}',
                    ${Number(sala.capacidade)},
                    '${sala.localizacao}',
                    '${sala.observacao || ""}'
                FROM dbo.TIPO_RECURSO
                WHERE nome = 'Sala de aula';

                SET @id_recurso = SCOPE_IDENTITY();

                INSERT INTO dbo.SALA
                    (id_recurso, tipo_sala, possui_projetor, possui_ar_condicionado, observacao)
                VALUES
                    (@id_recurso,
                     '${sala.tipo_sala || ""}',
                     ${sala.possui_projetor ? 1 : 0},
                     ${sala.possui_ar_condicionado ? 1 : 0},
                     '${sala.observacao_sala || ""}');

                SELECT @id_recurso AS id_recurso;
            `;

            this._db.query(sql, (erro, recordset) => {
                if (erro) return reject(erro);
                resolve(recordset);
            });
        });
    }

    excluir(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                DELETE FROM dbo.SALA
                WHERE id_recurso = ${Number(id)};

                DELETE FROM dbo.RECURSO
                WHERE id_recurso = ${Number(id)};
            `;

            this._db.query(sql, (erro, recordset) => {
                if (erro) return reject(erro);
                resolve(recordset);
            });
        });
    }
}

module.exports = SalaCRUD;