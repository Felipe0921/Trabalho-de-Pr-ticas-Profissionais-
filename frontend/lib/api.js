const API_URL = "http://localhost:3000";

async function tratarResposta(resposta, mensagemErro) {
    const texto = await resposta.text();

    let dados = {};

    if (texto) {
        try {
            dados = JSON.parse(texto);
        } catch {
            dados = {
                mensagem: texto
            };
        }
    }

    if (!resposta.ok) {
        throw new Error(
            dados.erro ||
            dados.mensagem ||
            mensagemErro
        );
    }

    return dados;
}

// USUARIOS

export async function listarUsuarios() {
    const resposta = await fetch(`${API_URL}/Usuario`);

    return tratarResposta(
        resposta,
        "Erro ao buscar usuários"
    );
}

export async function buscarUsuarioPorId(id) {
    const resposta = await fetch(`${API_URL}/Usuario/${id}`);

    return tratarResposta(
        resposta,
        "Erro ao buscar usuário por ID"
    );
}

export async function buscarUsuarioPorCpf(cpf) {
    const resposta = await fetch(
        `${API_URL}/Usuario/cpf/${cpf}`
    );

    return tratarResposta(
        resposta,
        "Erro ao buscar usuário por CPF"
    );
}

export async function cadastrarUsuario(usuario) {
    const resposta = await fetch(`${API_URL}/Usuario`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    return tratarResposta(
        resposta,
        "Erro ao cadastrar usuário"
    );
}

export async function atualizarUsuario(cpf, usuario) {
    const resposta = await fetch(
        `${API_URL}/Usuario/${cpf}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        }
    );

    return tratarResposta(
        resposta,
        "Erro ao atualizar usuário"
    );
}

export async function excluirUsuario(id) {
    const resposta = await fetch(
        `${API_URL}/Usuario/${id}`,
        {
            method: "DELETE"
        }
    );

    return tratarResposta(
        resposta,
        "Erro ao excluir usuário"
    );
}

//STATUS

export async function listarStatus() {
    const resposta = await fetch(`${API_URL}/Status`);

    return tratarResposta(
        resposta,
        "Erro ao buscar status"
    );
}

export async function buscarStatusPorId(id) {
    const resposta = await fetch(`${API_URL}/Status/${id}`);

    return tratarResposta(
        resposta,
        "Erro ao buscar status por ID"
    );
}

export async function cadastrarStatus(status) {
    const resposta = await fetch(`${API_URL}/Status`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(status)
    });

    return tratarResposta(
        resposta,
        "Erro ao cadastrar status"
    );
}

export async function atualizarStatus(id, status) {
    const resposta = await fetch(`${API_URL}/Status/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(status)
    });

    return tratarResposta(
        resposta,
        "Erro ao atualizar status"
    );
}

export async function excluirStatus(id) {
    const resposta = await fetch(`${API_URL}/Status/${id}`, {
        method: "DELETE"
    });

    return tratarResposta(
        resposta,
        "Erro ao excluir status"
    );
}

//LABORATORIOS

export async function listarLaboratorios() {
    const resposta = await fetch(
        `${API_URL}/Laboratorio`
    );

    return tratarResposta(
        resposta,
        "Erro ao buscar laboratórios"
    );
}

export async function buscarLaboratorioPorId(id) {
    const resposta = await fetch(
        `${API_URL}/Laboratorio/${id}`
    );

    return tratarResposta(
        resposta,
        "Erro ao buscar laboratório por ID"
    );
}

export async function cadastrarLaboratorio(laboratorio) {
    const resposta = await fetch(
        `${API_URL}/Laboratorio`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(laboratorio)
        }
    );

    return tratarResposta(
        resposta,
        "Erro ao cadastrar laboratório"
    );
}

export async function atualizarLaboratorio(
    id,
    laboratorio
) {
    const resposta = await fetch(
        `${API_URL}/Laboratorio/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(laboratorio)
        }
    );

    return tratarResposta(
        resposta,
        "Erro ao atualizar laboratório"
    );
}

export async function excluirLaboratorio(id) {
    const resposta = await fetch(
        `${API_URL}/Laboratorio/${id}`,
        {
            method: "DELETE"
        }
    );

    return tratarResposta(
        resposta,
        "Erro ao excluir laboratório"
    );
}

//SALAS

export async function listarSalas() {
    const resposta = await fetch(`${API_URL}/Sala`);

    return tratarResposta(
        resposta,
        "Erro ao buscar salas"
    );
}

export async function buscarSalaPorId(id) {
    const resposta = await fetch(
        `${API_URL}/Sala/${id}`
    );

    return tratarResposta(
        resposta,
        "Erro ao buscar sala por ID"
    );
}

export async function cadastrarSala(sala) {
    const resposta = await fetch(`${API_URL}/Sala`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sala)
    });

    return tratarResposta(
        resposta,
        "Erro ao cadastrar sala"
    );
}

export async function atualizarSala(id, sala) {
    const resposta = await fetch(
        `${API_URL}/Sala/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sala)
        }
    );

    return tratarResposta(
        resposta,
        "Erro ao atualizar sala"
    );
}

export async function excluirSala(id) {
    const resposta = await fetch(
        `${API_URL}/Sala/${id}`,
        {
            method: "DELETE"
        }
    );

    return tratarResposta(
        resposta,
        "Erro ao excluir sala"
    );
}






