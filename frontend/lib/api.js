const API_URL = "http://localhost:3000";

export async function listarUsuarios( ) {
    const resposta = await fetch(`${API_URL}/Usuario`);

    if (!resposta.ok) {
        throw new Error("Erro ao buscar usuários");
    }

    return await resposta.json();
}

export async function cadastrarUsuario(usuario) {
    const resposta = await fetch(`${API_URL}/Usuario`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.erro || "Erro ao cadastrar usuário");
    }

    return dados;
}