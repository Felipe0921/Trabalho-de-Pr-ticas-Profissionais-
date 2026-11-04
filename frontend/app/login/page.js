"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function entrar(event) {
        event.preventDefault();

        setErro("");
        setCarregando(true);

        try {
            const resposta = await fetch("http://localhost:3000/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    senha
                })
            });

            const texto = await resposta.text();

            let dados = {};

            if (texto) {
                try {
                    dados = JSON.parse(texto);
                } catch {
                    dados = {};
                }
            }

            if (!resposta.ok) {
                throw new Error(
                    dados.erro ||
                    dados.mensagem ||
                    "E-mail ou senha inválidos."
                );
            }

            const usuario = dados.usuario || dados;

            localStorage.setItem(
                "usuario",
                JSON.stringify(usuario)
            );

            router.push("/reservas");
        } catch (erro) {
            setErro(
                erro.message ||
                "Não foi possível realizar o login."
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
                        Organize salas, laboratórios e reservas
                        em um só lugar.
                    </p>
                </div>

                <div style={estilos.ladoDireito}>
                    <p style={estilos.pequenoTitulo}>
                        ACESSO AO SISTEMA
                    </p>

                    <h2 style={estilos.titulo}>
                        Bem-vindo
                    </h2>

                    <p style={estilos.subtitulo}>
                        Entre com seus dados para continuar.
                    </p>

                    {erro && (
                        <div style={estilos.erro}>
                            {erro}
                        </div>
                    )}

                    <form
                        onSubmit={entrar}
                        style={estilos.formulario}
                    >
                        <label style={estilos.label}>
                            E-mail
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="Digite seu e-mail"
                            required
                            style={estilos.input}
                        />

                        <label style={estilos.label}>
                            Senha
                        </label>

                        <input
                            type="password"
                            value={senha}
                            onChange={(event) =>
                                setSenha(event.target.value)
                            }
                            placeholder="Digite sua senha"
                            required
                            style={estilos.input}
                        />

                        <button
                            type="submit"
                            disabled={carregando}
                            style={estilos.botao}
                        >
                            {carregando
                                ? "Entrando..."
                                : "Entrar"}
                        </button>
                    </form>

                    <div style={estilos.divisor}>
                        <span>ou</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => router.push("/cadastro")}
                        style={estilos.botaoSecundario}
                    >
                        Criar uma conta
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        style={estilos.voltar}
                    >
                        Voltar ao início
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
        gridTemplateColumns: "0.9fr 1.1fr",
        width: "100%",
        maxWidth: "850px",
        overflow: "hidden",
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0 12px 35px rgba(35, 78, 95, 0.14)"
    },

    ladoEsquerdo: {
        padding: "52px 40px",
        backgroundColor: "#315b72",
        color: "#ffffff"
    },

    logo: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "52px",
        height: "52px",
        borderRadius: "12px",
        backgroundColor: "#d98b42",
        fontWeight: "bold",
        fontSize: "17px",
        marginBottom: "42px"
    },

    tituloMarca: {
        margin: 0,
        fontSize: "30px"
    },

    textoMarca: {
        maxWidth: "260px",
        marginTop: "14px",
        color: "#dce8eb",
        lineHeight: 1.6
    },

    ladoDireito: {
        padding: "52px 44px"
    },

    pequenoTitulo: {
        margin: 0,
        color: "#3f7d72",
        fontSize: "12px",
        fontWeight: "bold",
        letterSpacing: "1.5px"
    },

    titulo: {
        margin: "12px 0 8px",
        color: "#263943",
        fontSize: "28px"
    },

    subtitulo: {
        margin: 0,
        color: "#68777d"
    },

    erro: {
        marginTop: "20px",
        padding: "12px",
        borderRadius: "7px",
        backgroundColor: "#f9e4e2",
        color: "#a64f49",
        fontSize: "14px"
    },

    formulario: {
        display: "flex",
        flexDirection: "column",
        marginTop: "28px"
    },

    label: {
        marginBottom: "7px",
        color: "#263943",
        fontSize: "14px",
        fontWeight: "bold"
    },

    input: {
        width: "100%",
        marginBottom: "18px",
        padding: "13px",
        border: "1px solid #cbd8d6",
        borderRadius: "7px",
        outline: "none",
        color: "#263943",
        fontSize: "14px"
    },

    botao: {
        marginTop: "4px",
        padding: "14px",
        border: "none",
        borderRadius: "7px",
        backgroundColor: "#315b72",
        color: "#ffffff",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "bold"
    },

    divisor: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "23px 0 16px",
        color: "#9aa7aa",
        fontSize: "13px"
    },

    botaoSecundario: {
        width: "100%",
        padding: "13px",
        border: "1px solid #315b72",
        borderRadius: "7px",
        backgroundColor: "#ffffff",
        color: "#315b72",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "bold"
    },

    voltar: {
        display: "block",
        width: "100%",
        marginTop: "20px",
        border: "none",
        backgroundColor: "transparent",
        color: "#68777d",
        cursor: "pointer",
        fontSize: "13px"
    }
};
