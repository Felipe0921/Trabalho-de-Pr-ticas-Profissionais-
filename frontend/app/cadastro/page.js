"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

const formularioInicial = {
    nome_completo: "",
    cpf: "",
    data_nascimento: "",
    email: "",
    celular: "",
    senha: ""
};

export default function CadastroPage() {
    const router = useRouter();

    const [formulario, setFormulario] = useState(
        formularioInicial
    );

    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    function alterarCampo(event) {
        const { name, value } = event.target;

        setFormulario((anterior) => ({
            ...anterior,
            [name]: value
        }));
    }

    async function criarConta(event) {
        event.preventDefault();

        setErro("");
        setMensagem("");
        setCarregando(true);

        try {
            const respostaUsuario = await fetch(
                `${API_URL}/Usuario`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        cpf: formulario.cpf,
                        nome_completo:
                            formulario.nome_completo,
                        data_nascimento:
                            formulario.data_nascimento,
                        celular: formulario.celular,
                        email: formulario.email
                    })
                }
            );

            await tratarResposta(
                respostaUsuario,
                "Erro ao cadastrar usuário"
            );

            const respostaBusca = await fetch(
                `${API_URL}/Usuario/cpf/${formulario.cpf}`
            );

            const dadosUsuario = await tratarResposta(
                respostaBusca,
                "Usuário criado, mas não foi possível encontrá-lo"
            );

            const usuarios = Array.isArray(dadosUsuario)
                ? dadosUsuario
                : dadosUsuario.recordset || [];

            const usuario = usuarios[0];

            if (!usuario || !usuario.id_usuario) {
                throw new Error(
                    "Não foi possível encontrar o ID do usuário"
                );
            }

            const respostaCredencial = await fetch(
                `${API_URL}/Credencial`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id_usuario: usuario.id_usuario,
                        login: formulario.email,
                        senha_hash: formulario.senha
                    })
                }
            );

            await tratarResposta(
                respostaCredencial,
                "Usuário criado, mas não foi possível cadastrar a senha"
            );

            setMensagem(
                "Conta criada com sucesso! Redirecionando para o login..."
            );

            setFormulario(formularioInicial);

            setTimeout(() => {
                router.push("/login");
            }, 1500);
        } catch (erro) {
            setErro(
                erro.message ||
                "Não foi possível criar a conta."
            );
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main style={estilos.pagina}>
            <section style={estilos.cartao}>
                <div style={estilos.ladoEsquerdo}>
                    <div style={estilos.logo}>RF</div>

                    <h1 style={estilos.tituloMarca}>
                        ReservaFácil
                    </h1>

                    <p style={estilos.textoMarca}>
                        Crie sua conta para reservar salas e
                        laboratórios.
                    </p>
                </div>

                <div style={estilos.ladoDireito}>
                    <p style={estilos.etiqueta}>
                        NOVO CADASTRO
                    </p>

                    <h2 style={estilos.titulo}>
                        Criar conta
                    </h2>

                    <p style={estilos.subtitulo}>
                        Cadastre seus dados para fazer reservas.
                    </p>

                    {erro && (
                        <div style={estilos.erro}>
                            {erro}
                        </div>
                    )}

                    {mensagem && (
                        <div style={estilos.sucesso}>
                            {mensagem}
                        </div>
                    )}

                    <form
                        onSubmit={criarConta}
                        style={estilos.formulario}
                    >
                        <label style={estilos.label}>
                            Nome completo
                        </label>

                        <input
                            name="nome_completo"
                            value={formulario.nome_completo}
                            onChange={alterarCampo}
                            placeholder="Digite seu nome"
                            required
                            style={estilos.input}
                        />

                        <label style={estilos.label}>
                            CPF
                        </label>

                        <input
                            name="cpf"
                            value={formulario.cpf}
                            onChange={alterarCampo}
                            placeholder="Digite seu CPF"
                            required
                            style={estilos.input}
                        />

                        <label style={estilos.label}>
                            Data de nascimento
                        </label>

                        <input
                            name="data_nascimento"
                            type="date"
                            value={formulario.data_nascimento}
                            onChange={alterarCampo}
                            required
                            style={estilos.input}
                        />

                        <label style={estilos.label}>
                            E-mail
                        </label>

                        <input
                            name="email"
                            type="email"
                            value={formulario.email}
                            onChange={alterarCampo}
                            placeholder="Digite seu e-mail"
                            required
                            style={estilos.input}
                        />

                        <label style={estilos.label}>
                            Celular
                        </label>

                        <input
                            name="celular"
                            value={formulario.celular}
                            onChange={alterarCampo}
                            placeholder="Digite seu celular"
                            required
                            style={estilos.input}
                        />

                        <label style={estilos.label}>
                            Senha
                        </label>

                        <input
                            name="senha"
                            type="password"
                            value={formulario.senha}
                            onChange={alterarCampo}
                            placeholder="Digite uma senha"
                            required
                            minLength={4}
                            style={estilos.input}
                        />

                        <button
                            type="submit"
                            disabled={carregando}
                            style={estilos.botao}
                        >
                            {carregando
                                ? "Criando conta..."
                                : "Criar conta"}
                        </button>
                    </form>

                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        style={estilos.botaoSecundario}
                    >
                        Já tenho uma conta
                    </button>
                </div>
            </section>
        </main>
    );
}

const estilos = {
    pagina: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backgroundColor: "#eef3f2",
        fontFamily: "Arial, Helvetica, sans-serif"
    },

    cartao: {
        display: "grid",
        gridTemplateColumns: "0.8fr 1.2fr",
        width: "100%",
        maxWidth: "900px",
        overflow: "hidden",
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0 12px 35px rgba(35, 78, 95, 0.14)"
    },

    ladoEsquerdo: {
        padding: "48px 36px",
        backgroundColor: "#315b72",
        color: "#ffffff"
    },

    logo: {
        display: "flex",
        width: "52px",
        height: "52px",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        backgroundColor: "#d98b42",
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: "17px",
        marginBottom: "38px"
    },

    tituloMarca: {
        margin: 0,
        fontSize: "28px"
    },

    textoMarca: {
        maxWidth: "250px",
        color: "#dce8eb",
        lineHeight: 1.6
    },

    ladoDireito: {
        padding: "40px"
    },

    etiqueta: {
        margin: 0,
        color: "#3f7d72",
        fontSize: "12px",
        fontWeight: "bold",
        letterSpacing: "1.3px"
    },

    titulo: {
        margin: "10px 0 6px",
        color: "#263943",
        fontSize: "28px"
    },

    subtitulo: {
        margin: 0,
        color: "#68777d"
    },

    formulario: {
        display: "flex",
        flexDirection: "column",
        marginTop: "24px"
    },

    label: {
        marginBottom: "6px",
        color: "#263943",
        fontSize: "13px",
        fontWeight: "bold"
    },

    input: {
        width: "100%",
        marginBottom: "14px",
        padding: "12px",
        border: "1px solid #cbd8d6",
        borderRadius: "7px",
        color: "#263943",
        fontSize: "14px"
    },

    botao: {
        marginTop: "5px",
        padding: "13px",
        border: "none",
        borderRadius: "7px",
        backgroundColor: "#315b72",
        color: "#ffffff",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "bold"
    },

    botaoSecundario: {
        width: "100%",
        marginTop: "14px",
        padding: "12px",
        border: "1px solid #315b72",
        borderRadius: "7px",
        backgroundColor: "#ffffff",
        color: "#315b72",
        cursor: "pointer",
        fontWeight: "bold"
    },

    erro: {
        marginTop: "18px",
        padding: "11px",
        borderRadius: "7px",
        backgroundColor: "#f9e4e2",
        color: "#a64f49",
        fontSize: "13px"
    },

    sucesso: {
        marginTop: "18px",
        padding: "11px",
        borderRadius: "7px",
        backgroundColor: "#e3f1e9",
        color: "#28734d",
        fontSize: "13px"
    }
};


