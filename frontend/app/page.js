import Link from "next/link";

const opcoes = [
    {
        titulo: "Usuários",
        descricao: "Cadastre e gerencie os usuários do sistema.",
        rota: "/usuarios",
        cor: "#315b72",
        sigla: "US"
    },
    {
        titulo: "Laboratórios",
        descricao: "Consulte e gerencie os laboratórios disponíveis.",
        rota: "/laboratorios",
        cor: "#3f7d72",
        sigla: "LA"
    },
    {
        titulo: "Salas",
        descricao: "Gerencie as salas utilizadas nas reservas.",
        rota: "/salas",
        cor: "#d98b42",
        sigla: "SA"
    },
    {
        titulo: "Status",
        descricao: "Consulte os status das reservas.",
        rota: "/status",
        cor: "#7e8990",
        sigla: "ST"
    }
];

export default function PaginaInicial() {
    return (
        <main style={estilos.pagina}>
            <header style={estilos.cabecalho}>
                <div style={estilos.cabecalhoInterno}>
                    <div style={estilos.marca}>
                        <div style={estilos.logo}>RF</div>

                        <div>
                            <h1 style={estilos.tituloMarca}>
                                ReservaFácil
                            </h1>

                            <p style={estilos.subtituloMarca}>
                                Sistema de reservas acadêmicas
                            </p>
                        </div>
                    </div>

                    <Link href="/login" style={estilos.botaoLogin}>
                        Entrar
                    </Link>
                </div>
            </header>

            <section style={estilos.conteudo}>
                <p style={estilos.etiqueta}>
                    PAINEL PRINCIPAL
                </p>

                <h2 style={estilos.tituloPagina}>
                    Organize seus espaços
                      

                    de forma simples.
                </h2>

                <p style={estilos.descricaoPagina}>
                    Acesse uma opção para gerenciar usuários,
                    laboratórios, salas e status.
                </p>

                <div style={estilos.grade}>
                    {opcoes.map((opcao) => (
                        <Link
                            key={opcao.titulo}
                            href={opcao.rota}
                            style={{
                                ...estilos.card,
                                borderTopColor: opcao.cor
                            }}
                        >
                            <div
                                style={{
                                    ...estilos.sigla,
                                    color: opcao.cor
                                }}
                            >
                                {opcao.sigla}
                            </div>

                            <h3 style={estilos.tituloCard}>
                                {opcao.titulo}
                            </h3>

                            <p style={estilos.descricaoCard}>
                                {opcao.descricao}
                            </p>

                            <span
                                style={{
                                    ...estilos.link,
                                    color: opcao.cor
                                }}
                            >
                                Acessar área →
                            </span>
                        </Link>
                    ))}
                </div>

                <p style={estilos.informacao}>
                    Escolha uma área para continuar.
                </p>
            </section>
        </main>
    );
}

const estilos = {
    pagina: {
        minHeight: "100vh",
        backgroundColor: "#f4f6f5",
        color: "#263943",
        fontFamily: "Arial, sans-serif"
    },

    cabecalho: {
        backgroundColor: "#315b72",
        borderBottom: "4px solid #d98b42",
        color: "#ffffff"
    },

    cabecalhoInterno: {
        width: "90%",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "22px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },

    marca: {
        display: "flex",
        alignItems: "center",
        gap: "12px"
    },

    logo: {
        display: "flex",
        width: "46px",
        height: "46px",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        backgroundColor: "#d98b42",
        color: "#ffffff",
        fontWeight: "bold"
    },

    tituloMarca: {
        margin: 0,
        color: "#ffffff",
        fontSize: "25px"
    },

    subtituloMarca: {
        margin: "5px 0 0",
        color: "#dce8eb",
        fontSize: "13px"
    },

    botaoLogin: {
        padding: "11px 22px",
        border: "1px solid #ffffff",
        borderRadius: "7px",
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "bold",
        textDecoration: "none"
    },

    conteudo: {
        width: "90%",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "48px 0"
    },

    etiqueta: {
        margin: "0 0 12px",
        color: "#3f7d72",
        fontSize: "12px",
        fontWeight: "bold",
        letterSpacing: "1.5px"
    },

    tituloPagina: {
        margin: 0,
        color: "#263943",
        fontSize: "34px",
        lineHeight: 1.2
    },

    descricaoPagina: {
        margin: "15px 0 30px",
        color: "#68777d",
        fontSize: "15px"
    },

    grade: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px"
    },

    card: {
        display: "block",
        minHeight: "210px",
        padding: "20px",
        border: "1px solid #dce4e3",
        borderTop: "4px solid",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        color: "#263943",
        textDecoration: "none",
        boxShadow: "0 3px 10px rgba(38, 57, 67, 0.07)"
    },

    sigla: {
        display: "flex",
        width: "38px",
        height: "38px",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        backgroundColor: "#edf3f2",
        fontSize: "12px",
        fontWeight: "bold"
    },

    tituloCard: {
        margin: "24px 0 8px",
        color: "#263943",
        fontSize: "20px"
    },

    descricaoCard: {
        minHeight: "42px",
        margin: 0,
        color: "#68777d",
        fontSize: "13px",
        lineHeight: 1.5
    },

    link: {
        display: "inline-block",
        marginTop: "18px",
        fontSize: "13px",
        fontWeight: "bold"
    },

    informacao: {
        marginTop: "28px",
        color: "#68777d",
        fontSize: "13px"
    }
};







