const API_URL = "http://localhost:3000";

async function tratarResposta(resposta, mensagemErro) {
    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(
            dados.erro || dados.mensagem || mensagemErro
        );
    }

    return dados;
}

export async function listarUsuarios() {
    const resposta = await fetch(`${API_URL}/Usuario`);
    return tratarResposta(resposta, "Erro ao buscar usuários");
}

export async function cadastrarUsuario(usuario) {
    const resposta = await fetch(`${API_URL}/Usuario`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    return tratarResposta(resposta, "Erro ao cadastrar usuário");
}

export async function listarStatus() {
    const resposta = await fetch(`${API_URL}/Status`);
    return tratarResposta(resposta, "Erro ao buscar status");
}

export async function cadastrarStatus(status) {
    const resposta = await fetch(`${API_URL}/Status`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(status)
    });

    return tratarResposta(resposta, "Erro ao cadastrar status");
}

export async function listarLaboratorios() {
    const resposta = await fetch(`${API_URL}/Laboratorio`);
    return tratarResposta(resposta, "Erro ao buscar laboratórios");
}

export async function cadastrarLaboratorio(laboratorio) {
    const resposta = await fetch(`${API_URL}/Laboratorio`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(laboratorio)
    });

    return tratarResposta(resposta, "Erro ao cadastrar laboratório");
}

export async function listarSalas() {
    const resposta = await fetch(`${API_URL}/Sala`);
    return tratarResposta(resposta, "Erro ao buscar salas");
}

export async function cadastrarSala(sala) {
    const resposta = await fetch(`${API_URL}/Sala`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sala)
    });

    return tratarResposta(resposta, "Erro ao cadastrar sala");
}