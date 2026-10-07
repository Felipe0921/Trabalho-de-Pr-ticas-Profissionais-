import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <header className="bg-blue-700 px-8 py-6 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold text-blue-200">
            ReservaFácil
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Sistema de Reservas
          </h1>

          <p className="mt-2 text-blue-100">
            Gerencie salas, laboratórios e usuários.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-8 py-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Menu principal
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/usuarios"
            className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="text-xl font-bold text-slate-900">
              Usuários
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Cadastre e gerencie os usuários do sistema.
            </p>

            <p className="mt-5 font-semibold text-blue-600">
              Acessar →
            </p>
          </Link>

          <Link
            href="/laboratorios"
            className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="text-xl font-bold text-slate-900">
              Laboratórios
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Gerencie os laboratórios disponíveis.
            </p>

            <p className="mt-5 font-semibold text-blue-600">
              Acessar →
            </p>
          </Link>

          <Link
            href="/salas"
            className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="text-xl font-bold text-slate-900">
              Salas
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Gerencie as salas de aula.
            </p>

            <p className="mt-5 font-semibold text-blue-600">
              Acessar →
            </p>
          </Link>

          <Link
            href="/status"
            className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="text-xl font-bold text-slate-900">
              Status
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Consulte e gerencie os status das reservas.
            </p>

            <p className="mt-5 font-semibold text-blue-600">
              Acessar →
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}

