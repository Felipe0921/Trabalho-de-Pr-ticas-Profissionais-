CREATE TABLE dbo.USUARIO
(
    id_usuario       INT IDENTITY(1,1) NOT NULL,
    cpf              VARCHAR(11) NOT NULL,
    nome_completo    NVARCHAR(150) NOT NULL,
    data_nascimento  DATE NOT NULL,
    celular          VARCHAR(20) NULL,
    email            VARCHAR(150) NOT NULL,
    ativo            BIT NOT NULL CONSTRAINT DF_USUARIO_ATIVO DEFAULT (1),
    data_cadastro    DATETIME2(0) NOT NULL CONSTRAINT DF_USUARIO_DATA_CADASTRO DEFAULT (SYSDATETIME()),

    CONSTRAINT PK_USUARIO PRIMARY KEY (id_usuario),
    CONSTRAINT UQ_USUARIO_CPF UNIQUE (cpf),
    CONSTRAINT UQ_USUARIO_EMAIL UNIQUE (email),
    CONSTRAINT CK_USUARIO_CPF_TAMANHO CHECK (LEN(cpf) IN (11, 14)),
    CONSTRAINT CK_USUARIO_EMAIL_FORMATO CHECK (email LIKE '%_@_%._%')
);
GO

CREATE TABLE dbo.CREDENCIAL
(
    id_credencial     INT IDENTITY(1,1) NOT NULL,
    id_usuario        INT NOT NULL,
    login             VARCHAR(80) NOT NULL,
    senha_hash        VARCHAR(255) NOT NULL,
    ultimo_acesso     DATETIME2(0) NULL,
    ativo             BIT NOT NULL CONSTRAINT DF_CREDENCIAL_ATIVO DEFAULT (1),
    data_criacao      DATETIME2(0) NOT NULL CONSTRAINT DF_CREDENCIAL_DATA_CRIACAO DEFAULT (SYSDATETIME()),
    data_atualizacao  DATETIME2(0) NOT NULL CONSTRAINT DF_CREDENCIAL_DATA_ATUALIZACAO DEFAULT (SYSDATETIME()),

    CONSTRAINT PK_CREDENCIAL PRIMARY KEY (id_credencial),
    CONSTRAINT UQ_CREDENCIAL_USUARIO UNIQUE (id_usuario),
    CONSTRAINT UQ_CREDENCIAL_LOGIN UNIQUE (login),
    CONSTRAINT FK_CREDENCIAL_USUARIO FOREIGN KEY (id_usuario)
        REFERENCES dbo.USUARIO(id_usuario)
);
GO

CREATE TABLE dbo.TIPO_RECURSO
(
    id_tipo_recurso  INT IDENTITY(1,1) NOT NULL,
    nome             NVARCHAR(60) NOT NULL,
    descricao        NVARCHAR(250) NULL,
    ativo            BIT NOT NULL CONSTRAINT DF_TIPO_RECURSO_ATIVO DEFAULT (1),

    CONSTRAINT PK_TIPO_RECURSO PRIMARY KEY (id_tipo_recurso),
    CONSTRAINT UQ_TIPO_RECURSO_NOME UNIQUE (nome)
);
GO

CREATE TABLE dbo.STATUS_RESERVA
(
    id_status_reserva  INT IDENTITY(1,1) NOT NULL,
    nome               NVARCHAR(40) NOT NULL,
    descricao          NVARCHAR(250) NULL,
    permite_reserva    BIT NOT NULL CONSTRAINT DF_STATUS_PERMITE_RESERVA DEFAULT (1),
    ativo              BIT NOT NULL CONSTRAINT DF_STATUS_ATIVO DEFAULT (1),

    CONSTRAINT PK_STATUS_RESERVA PRIMARY KEY (id_status_reserva),
    CONSTRAINT UQ_STATUS_RESERVA_NOME UNIQUE (nome)
);
GO

CREATE TABLE dbo.RECURSO
(
    id_recurso       INT IDENTITY(1,1) NOT NULL,
    id_tipo_recurso  INT NOT NULL,
    codigo           VARCHAR(30) NOT NULL,
    nome             NVARCHAR(120) NOT NULL,
    capacidade       INT NOT NULL,
    localizacao      NVARCHAR(150) NOT NULL,
    ativo            BIT NOT NULL CONSTRAINT DF_RECURSO_ATIVO DEFAULT (1),
    observacao       NVARCHAR(500) NULL,

    CONSTRAINT PK_RECURSO PRIMARY KEY (id_recurso),
    CONSTRAINT UQ_RECURSO_CODIGO UNIQUE (codigo),
    CONSTRAINT FK_RECURSO_TIPO FOREIGN KEY (id_tipo_recurso)
        REFERENCES dbo.TIPO_RECURSO(id_tipo_recurso),
    CONSTRAINT CK_RECURSO_CAPACIDADE CHECK (capacidade > 0)
);
GO

CREATE TABLE dbo.LABORATORIO
(
    id_recurso                INT NOT NULL,
    quantidade_computadores   INT NULL,
    possui_internet           BIT NULL,
    observacao_tecnica        NVARCHAR(500) NULL,

    CONSTRAINT PK_LABORATORIO PRIMARY KEY (id_recurso),
    CONSTRAINT FK_LABORATORIO_RECURSO FOREIGN KEY (id_recurso)
        REFERENCES dbo.RECURSO(id_recurso),
    CONSTRAINT CK_LABORATORIO_QTD_COMPUTADORES CHECK
        (quantidade_computadores IS NULL OR quantidade_computadores >= 0)
);
GO

CREATE TABLE dbo.SALA
(
    id_recurso              INT NOT NULL,
    tipo_sala               NVARCHAR(80) NULL,
    possui_projetor         BIT NULL,
    possui_ar_condicionado BIT NULL,
    observacao              NVARCHAR(500) NULL,

    CONSTRAINT PK_SALA PRIMARY KEY (id_recurso),
    CONSTRAINT FK_SALA_RECURSO FOREIGN KEY (id_recurso)
        REFERENCES dbo.RECURSO(id_recurso)
);
GO

CREATE TABLE dbo.RESERVA
(
    id_reserva         BIGINT IDENTITY(1,1) NOT NULL,
    id_recurso         INT NOT NULL,
    id_usuario         INT NOT NULL,
    id_status_reserva  INT NOT NULL,
    data_inicial       DATE NOT NULL,
    data_final         DATE NOT NULL,
    hora_inicial       TIME(0) NOT NULL,
    hora_final         TIME(0) NOT NULL,
    finalidade         NVARCHAR(250) NULL,
    observacao         NVARCHAR(500) NULL,
    data_criacao       DATETIME2(0) NOT NULL CONSTRAINT DF_RESERVA_DATA_CRIACAO DEFAULT (SYSDATETIME()),
    data_atualizacao   DATETIME2(0) NOT NULL CONSTRAINT DF_RESERVA_DATA_ATUALIZACAO DEFAULT (SYSDATETIME()),
    cancelada_em       DATETIME2(0) NULL,
    cancelada_por      INT NULL,

    CONSTRAINT PK_RESERVA PRIMARY KEY (id_reserva),
    CONSTRAINT FK_RESERVA_RECURSO FOREIGN KEY (id_recurso)
        REFERENCES dbo.RECURSO(id_recurso),
    CONSTRAINT FK_RESERVA_USUARIO FOREIGN KEY (id_usuario)
        REFERENCES dbo.USUARIO(id_usuario),
    CONSTRAINT FK_RESERVA_STATUS FOREIGN KEY (id_status_reserva)
        REFERENCES dbo.STATUS_RESERVA(id_status_reserva),
    CONSTRAINT FK_RESERVA_CANCELADA_POR FOREIGN KEY (cancelada_por)
        REFERENCES dbo.USUARIO(id_usuario),
    CONSTRAINT CK_RESERVA_DATAS CHECK (data_inicial <= data_final),
    CONSTRAINT CK_RESERVA_HORAS CHECK (hora_inicial < hora_final),
    CONSTRAINT CK_RESERVA_CANCELAMENTO CHECK
        ((cancelada_em IS NULL AND cancelada_por IS NULL) OR
         (cancelada_em IS NOT NULL AND cancelada_por IS NOT NULL))
);
GO

CREATE TABLE dbo.ACESSO
(
    id_acesso          BIGINT IDENTITY(1,1) NOT NULL,
    id_usuario         INT NULL,
    login_informado    VARCHAR(80) NOT NULL,
    data_hora_acesso   DATETIME2(0) NOT NULL CONSTRAINT DF_ACESSO_DATA_HORA DEFAULT (SYSDATETIME()),
    sucesso            BIT NOT NULL,
    endereco_ip        VARCHAR(45) NULL,
    mensagem_resultado NVARCHAR(250) NULL,

    CONSTRAINT PK_ACESSO PRIMARY KEY (id_acesso),
    CONSTRAINT FK_ACESSO_USUARIO FOREIGN KEY (id_usuario)
        REFERENCES dbo.USUARIO(id_usuario)
);
GO

CREATE TABLE dbo.HISTORICO_RESERVA
(
    id_historico            BIGINT IDENTITY(1,1) NOT NULL,
    id_reserva              BIGINT NOT NULL,
    id_status_anterior      INT NULL,
    id_status_novo          INT NOT NULL,
    id_usuario_responsavel  INT NOT NULL,
    data_hora_alteracao     DATETIME2(0) NOT NULL CONSTRAINT DF_HISTORICO_DATA_HORA DEFAULT (SYSDATETIME()),
    observacao              NVARCHAR(500) NULL,

    CONSTRAINT PK_HISTORICO_RESERVA PRIMARY KEY (id_historico),
    CONSTRAINT FK_HISTORICO_RESERVA FOREIGN KEY (id_reserva)
        REFERENCES dbo.RESERVA(id_reserva),
    CONSTRAINT FK_HISTORICO_STATUS_ANTERIOR FOREIGN KEY (id_status_anterior)
        REFERENCES dbo.STATUS_RESERVA(id_status_reserva),
    CONSTRAINT FK_HISTORICO_STATUS_NOVO FOREIGN KEY (id_status_novo)
        REFERENCES dbo.STATUS_RESERVA(id_status_reserva),
    CONSTRAINT FK_HISTORICO_USUARIO FOREIGN KEY (id_usuario_responsavel)
        REFERENCES dbo.USUARIO(id_usuario)
);
GO

/* Índices para as consultas previstas no projeto */
CREATE INDEX IX_RESERVA_RECURSO_DATA
    ON dbo.RESERVA(id_recurso, data_inicial, data_final, hora_inicial, hora_final);

CREATE INDEX IX_RESERVA_USUARIO
    ON dbo.RESERVA(id_usuario, data_inicial);

CREATE INDEX IX_RESERVA_STATUS
    ON dbo.RESERVA(id_status_reserva, data_inicial);

CREATE INDEX IX_ACESSO_USUARIO_DATA
    ON dbo.ACESSO(id_usuario, data_hora_acesso);

CREATE INDEX IX_HISTORICO_RESERVA_DATA
    ON dbo.HISTORICO_RESERVA(id_reserva, data_hora_alteracao);
GO

PRINT N'Banco e tabelas criados com sucesso.';
GO