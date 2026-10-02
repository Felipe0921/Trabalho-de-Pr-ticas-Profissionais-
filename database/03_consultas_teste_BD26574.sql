SELECT
    r.id_recurso,
    r.codigo,
    r.nome,
    tr.nome AS tipo_recurso,
    r.capacidade,
    r.localizacao,
    r.ativo
FROM dbo.RECURSO AS r
INNER JOIN dbo.TIPO_RECURSO AS tr
    ON tr.id_tipo_recurso = r.id_tipo_recurso
ORDER BY tr.nome, r.codigo;
GO

/* 2. Listar reservas com usuário, recurso e status */
SELECT
    rv.id_reserva,
    r.codigo AS codigo_recurso,
    r.nome AS nome_recurso,
    u.nome_completo AS usuario,
    sr.nome AS status_reserva,
    rv.data_inicial,
    rv.data_final,
    rv.hora_inicial,
    rv.hora_final,
    rv.finalidade
FROM dbo.RESERVA AS rv
INNER JOIN dbo.RECURSO AS r
    ON r.id_recurso = rv.id_recurso
INNER JOIN dbo.USUARIO AS u
    ON u.id_usuario = rv.id_usuario
INNER JOIN dbo.STATUS_RESERVA AS sr
    ON sr.id_status_reserva = rv.id_status_reserva
ORDER BY rv.data_inicial, rv.hora_inicial;
GO

/* 3. Consultar reservas por data */
DECLARE @DataConsulta DATE = '2026-10-20';

SELECT
    r.codigo,
    r.nome,
    u.nome_completo AS usuario,
    rv.data_inicial,
    rv.hora_inicial,
    rv.hora_final,
    sr.nome AS status_reserva
FROM dbo.RESERVA AS rv
INNER JOIN dbo.RECURSO AS r ON r.id_recurso = rv.id_recurso
INNER JOIN dbo.USUARIO AS u ON u.id_usuario = rv.id_usuario
INNER JOIN dbo.STATUS_RESERVA AS sr ON sr.id_status_reserva = rv.id_status_reserva
WHERE @DataConsulta BETWEEN rv.data_inicial AND rv.data_final
  AND rv.cancelada_em IS NULL
ORDER BY rv.hora_inicial;
GO

/* 4. Verificar quantidade de registros por tabela */
SELECT 'USUARIO' AS tabela, COUNT(*) AS quantidade FROM dbo.USUARIO
UNION ALL SELECT 'CREDENCIAL', COUNT(*) FROM dbo.CREDENCIAL
UNION ALL SELECT 'TIPO_RECURSO', COUNT(*) FROM dbo.TIPO_RECURSO
UNION ALL SELECT 'STATUS_RESERVA', COUNT(*) FROM dbo.STATUS_RESERVA
UNION ALL SELECT 'RECURSO', COUNT(*) FROM dbo.RECURSO
UNION ALL SELECT 'LABORATORIO', COUNT(*) FROM dbo.LABORATORIO
UNION ALL SELECT 'SALA', COUNT(*) FROM dbo.SALA
UNION ALL SELECT 'RESERVA', COUNT(*) FROM dbo.RESERVA
UNION ALL SELECT 'ACESSO', COUNT(*) FROM dbo.ACESSO
UNION ALL SELECT 'HISTORICO_RESERVA', COUNT(*) FROM dbo.HISTORICO_RESERVA;
GO