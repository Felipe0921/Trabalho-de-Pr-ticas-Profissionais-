import Link from "next/link";

const opcoes = [
    {
        nome: "Usuários",
        descricao: "Cadastrar e consultar usuários",
        caminho: "/usuarios"
    },
    {
        nome: "Laboratórios",
        descricao: "Gerenciar os laboratórios",
        caminho: "/laboratorios"
    },
    {
        nome: "Salas",
        descricao: "Gerenciar as salas",
        caminho: "/salas"
    },
    {
        nome: "Status",
        descricao: "Consultar os status",
        caminho: "/status"
    }
];

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-100">
            <header className="bg-blue-700 px-6 py-8 text-white">
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-3xl font-bold">
                        ReservaFácil
                    </h1>

                    <p className="mt-2 text-blue-100">
                        Sistema de reservas de salas e laboratórios
                    </p>
                </div>
            </header>

            <section className="mx-auto max-w-6xl px-6 py-10">
                <h2 className="text-2xl font-bold text-slate-800">
                    Menu principal
                </h2>

                <p className="mt-2 text-slate-600">
                    Escolha uma opção para continuar.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {opcoes.map((opcao) => (
                        <Link
                            key={opcao.caminho}
                            href={opcao.caminho}
                            className="rounded-lg bg-white p-6 shadow transition hover:shadow-md"
                        >
                            <h3 className="text-xl font-bold text-blue-700">
                                {opcao.nome}
                            </h3>

                            <p className="mt-3 text-sm text-slate-600">
                                {opcao.descricao}
                            </p>

                            <p className="mt-6 text-sm font-semibold text-blue-600">
                                Acessar
                            </p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}



