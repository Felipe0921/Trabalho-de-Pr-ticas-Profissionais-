class LaboratorioCRUD {
    constructor(db) {
        this._db = db;
    }

    listarTodos() {
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
                    l.quantidade_computadores,
                    l.possui_internet,
                    l.observacao_tecnica
                FROM dbo.RECURSO r
                INNER JOIN dbo.LABORATORIO l
                    ON l.id_recurso = r.id_recurso
                INNER JOIN dbo.TIPO_RECURSO tr
                    ON tr.id_tipo_recurso = r.id_tipo_recurso
                WHERE tr.nome = 'Laboratório'
                ORDER BY r.codigo
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
                SELECT
                    r.id_recurso,
                    r.codigo,
                    r.nome,
                    r.capacidade,
                    r.localizacao,
                    r.ativo,
                    r.observacao,
                    l.quantidade_computadores,
                    l.possui_internet,
                    l.observacao_tecnica
                FROM dbo.RECURSO r
                INNER JOIN dbo.LABORATORIO l
                    ON l.id_recurso = r.id_recurso
                INNER JOIN dbo.TIPO_RECURSO tr
                    ON tr.id_tipo_recurso = r.id_tipo_recurso
                WHERE tr.nome = 'Laboratório'
                  AND r.id_recurso = ${Number(id)}
            `;

            this._db.query(sql, (erro, recordset) => {
                if (erro) {
                    return reject(erro);
                }

                resolve(recordset);
            });
        });
    }

    inserir(laboratorio) {
        return new Promise((resolve, reject) => {
            const sql = `
                DECLARE @id_recurso INT;

                INSERT INTO dbo.RECURSO
                    (
                        id_tipo_recurso,
                        codigo,
                        nome,
                        capacidade,
                        localizacao,
                        observacao
                    )
                SELECT
                    id_tipo_recurso,
                    '${laboratorio.codigo}',
                    '${laboratorio.nome}',
                    ${Number(laboratorio.capacidade)},
                    '${laboratorio.localizacao}',
                    '${laboratorio.observacao || ""}'
                FROM dbo.TIPO_RECURSO
                WHERE nome = 'Laboratório';

                SET @id_recurso = SCOPE_IDENTITY();

                INSERT INTO dbo.LABORATORIO
                    (
                        id_recurso,
                        quantidade_computadores,
                        possui_internet,
                        observacao_tecnica
                    )
                VALUES
                    (
                        @id_recurso,
                        ${Number(laboratorio.quantidade_computadores || 0)},
                        ${laboratorio.possui_internet ? 1 : 0},
                        '${laboratorio.observacao_tecnica || ""}'
                    );

                SELECT @id_recurso AS id_recurso;
            `;

            this._db.query(sql, (erro, recordset) => {
                if (erro) {
                    return reject(erro);
                }

                resolve(recordset);
            });
        });
    }

    atualizar(id, laboratorio) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE dbo.RECURSO
                SET
                    codigo = '${laboratorio.codigo}',
                    nome = '${laboratorio.nome}',
                    capacidade = ${Number(laboratorio.capacidade)},
                    localizacao = '${laboratorio.localizacao}',
                    observacao = '${laboratorio.observacao || ""}',
                    ativo = ${laboratorio.ativo === false ? 0 : 1}
                WHERE id_recurso = ${Number(id)}
                  AND id_recurso IN (
                      SELECT l.id_recurso
                      FROM dbo.LABORATORIO l
                  );

                UPDATE dbo.LABORATORIO
                SET
                    quantidade_computadores =
                        ${Number(laboratorio.quantidade_computadores || 0)},
                    possui_internet =
                        ${laboratorio.possui_internet ? 1 : 0},
                    observacao_tecnica =
                        '${laboratorio.observacao_tecnica || ""}'
                WHERE id_recurso = ${Number(id)};
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
                DELETE FROM dbo.LABORATORIO
                WHERE id_recurso = ${Number(id)};

                DELETE FROM dbo.RECURSO
                WHERE id_recurso = ${Number(id)};
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

module.exports = LaboratorioCRUD;

