INSERT INTO dbo.TIPO_RECURSO (nome, descricao)
VALUES
    (N'Laboratório', N'Laboratórios de informática ou áreas técnicas'),
    (N'Sala de aula', N'Salas destinadas a aulas e reuniões');
GO

/* Status da reserva */
INSERT INTO dbo.STATUS_RESERVA (nome, descricao, permite_reserva)
VALUES
    (N'Livre', N'Recurso disponível para reserva', 1),
    (N'Reservado', N'Recurso reservado para uma data e horário', 1),
    (N'Ocupado', N'Recurso em utilização no momento da reserva', 0),
    (N'Bloqueado', N'Recurso indisponível, por exemplo, para manutenção', 0);
GO

/* Usuários de teste */
INSERT INTO dbo.USUARIO
    (cpf, nome_completo, data_nascimento, celular, email)
VALUES
    ('11111111111', N'Administrador do Sistema', '2000-01-10', '11999990001', 'admin@reservafacil.local'),
    ('22222222222', N'Usuário de Teste', '2001-05-20', '11999990002', 'usuario@reservafacil.local');
GO

/*
  O valor abaixo é apenas um hash de exemplo para desenvolvimento.
  No sistema real, o back-end deve criar o hash usando bcrypt.
  Login: admin
  Senha de desenvolvimento: 123456
*/
INSERT INTO dbo.CREDENCIAL (id_usuario, login, senha_hash)
SELECT id_usuario, 'admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC1xH5YjYvYJx5qY5u2'
FROM dbo.USUARIO
WHERE email = 'admin@reservafacil.local';

INSERT INTO dbo.CREDENCIAL (id_usuario, login, senha_hash)
SELECT id_usuario, 'usuario.teste', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC1xH5YjYvYJx5qY5u2'
FROM dbo.USUARIO
WHERE email = 'usuario@reservafacil.local';
GO

/* Recursos de teste */
DECLARE @TipoLaboratorio INT =
    (SELECT id_tipo_recurso FROM dbo.TIPO_RECURSO WHERE nome = N'Laboratório');
DECLARE @TipoSala INT =
    (SELECT id_tipo_recurso FROM dbo.TIPO_RECURSO WHERE nome = N'Sala de aula');

INSERT INTO dbo.RECURSO
    (id_tipo_recurso, codigo, nome, capacidade, localizacao, observacao)
VALUES
    (@TipoLaboratorio, 'LAB01', N'Laboratório de Informática 1', 30, N'Bloco A - Térreo', N'Recurso para aulas práticas'),
    (@TipoLaboratorio, 'LAB02', N'Laboratório de Redes', 25, N'Bloco A - Primeiro andar', N'Possui equipamentos de redes'),
    (@TipoSala, 'SALA101', N'Sala de Aula 101', 40, N'Bloco B - Primeiro andar', N'Sala convencional'),
    (@TipoSala, 'SALA202', N'Sala de Aula 202', 35, N'Bloco B - Segundo andar', N'Sala com projetor');
GO

/* Informações específicas dos laboratórios */
INSERT INTO dbo.LABORATORIO
    (id_recurso, quantidade_computadores, possui_internet, observacao_tecnica)
SELECT id_recurso, 30, 1, N'Computadores disponíveis para os alunos'
FROM dbo.RECURSO
WHERE codigo = 'LAB01';

INSERT INTO dbo.LABORATORIO
    (id_recurso, quantidade_computadores, possui_internet, observacao_tecnica)
SELECT id_recurso, 25, 1, N'Equipamentos para aulas de redes'
FROM dbo.RECURSO
WHERE codigo = 'LAB02';
GO

/* Informações específicas das salas */
INSERT INTO dbo.SALA
    (id_recurso, tipo_sala, possui_projetor, possui_ar_condicionado, observacao)
SELECT id_recurso, N'Sala convencional', 1, 1, N'Projetor instalado'
FROM dbo.RECURSO
WHERE codigo = 'SALA101';

INSERT INTO dbo.SALA
    (id_recurso, tipo_sala, possui_projetor, possui_ar_condicionado, observacao)
SELECT id_recurso, N'Sala convencional', 1, 1, N'Sala ampla'
FROM dbo.RECURSO
WHERE codigo = 'SALA202';
GO

/* Uma reserva de teste */
DECLARE @Recurso INT = (SELECT id_recurso FROM dbo.RECURSO WHERE codigo = 'LAB01');
DECLARE @Usuario INT = (SELECT id_usuario FROM dbo.USUARIO WHERE email = 'usuario@reservafacil.local');
DECLARE @StatusReservado INT = (SELECT id_status_reserva FROM dbo.STATUS_RESERVA WHERE nome = N'Reservado');

INSERT INTO dbo.RESERVA
    (id_recurso, id_usuario, id_status_reserva, data_inicial, data_final,
     hora_inicial, hora_final, finalidade, observacao)
VALUES
    (@Recurso, @Usuario, @StatusReservado, '2026-10-20', '2026-10-20',
     '14:00', '16:00', N'Aula prática de redes', N'Reserva criada para teste');
GO

/* Conferência dos dados inseridos */
SELECT * FROM dbo.USUARIO;
SELECT * FROM dbo.CREDENCIAL;
SELECT * FROM dbo.TIPO_RECURSO;
SELECT * FROM dbo.STATUS_RESERVA;
SELECT * FROM dbo.RECURSO;
SELECT * FROM dbo.LABORATORIO;
SELECT * FROM dbo.SALA;
SELECT * FROM dbo.RESERVA;
GO