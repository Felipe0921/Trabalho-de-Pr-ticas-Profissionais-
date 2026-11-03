"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    listarSalas,
    listarLaboratorios
} from "../../lib/api";

const formularioInicial = {
    recurso: "",
    data: "",
    hora_inicio: "",
    hora_fim: "",
    finalidade: ""
};

export default function ReservasPage() {
    const router = useRouter();

    const [usuario, setUsuario] = useState(null);
    const [recursos, setRecursos] = useState([]);
    const [reservas, setReservas] = useState([]);
    const [formulario, setFormulario] = useState(formularioInicial);
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("usuario");

        if (usuarioSalvo) {
            setUsuario(JSON.parse(usuarioSalvo));
        }

        carregarRecursos();
    }, []);

    async function carregarRecursos() {
        try {
            const salas = await listarSalas();
            const laboratorios = await listarLaboratorios();

            const listaSalas = Array.isArray(salas)
                ? salas
                : salas.recordset || [];

            const listaLaboratorios = Array.isArray(laboratorios)
                ? laboratorios
                : laboratorios.recordset || [];

            setRecursos([
                ...listaSalas.map((item) => ({
                    id: `sala-${item.id_recurso}`,
                    id_recurso: item.id_recurso,
                    tipo: "Sala",
                    nome: item.nome,
                    codigo: item.codigo
                })),
                ...listaLaboratorios.map((item) => ({
                    id: `laboratorio-${item.id_recurso}`,
                    id_recurso: item.id_recurso,
                    tipo: "Laboratório",
                    nome: item.nome,
                    codigo: item.codigo
                }))
            ]);
        } catch {
            setErro("Erro ao carregar salas e laboratórios.");
        }
    }

    function alterarCampo(event) {
        setFormulario({
            ...formulario,
            [event.target.name]: event.target.value
        });
    }

    function criarReserva(event) {
        event.preventDefault();

        setErro("");
        setMensagem("");

        if (formulario.hora_fim <= formulario.hora_inicio) {
            setErro("O horário final deve ser depois do horário inicial.");
            return;
        }

        const recurso = recursos.find(
            (item) => item.id === formulario.recurso
        );

        if (!recurso) {
            setErro("Escolha uma sala ou laboratório.");
            return;
        }

        setReservas([
            ...reservas,
            {
                id: Date.now(),
                recurso,
                data: formulario.data,
                hora_inicio: formulario.hora_inicio,
                hora_fim: formulario.hora_fim,
                finalidade: formulario.finalidade
            }
        ]);

        setFormulario(formularioInicial);
        setMensagem("Reserva registrada com sucesso.");
    }

    function removerReserva(id) {
        setReservas(
            reservas.filter((reserva) => reserva.id !== id)
        );
    }

    function sair() {
        localStorage.removeItem("usuario");
        router.push("/login");
    }

    return (
        <main className="min-h-screen bg-gray-100">
            <header className="bg-slate-700 p-4 text-white">
                <div className="mx-auto flex max-w-5xl items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">
                            ReservaFácil
                        </h1>

                        <p className="text-sm">
                            Reservas
                        </p>
                    </div>

                    <button
                        onClick={sair}
                        className="rounded border px-3 py-1"
                    >
                        Sair
                    </button>
                </div>
            </header>

            <div className="mx-auto max-w-5xl p-5">
                <nav className="mb-5 flex flex-wrap gap-2">
                    <Link
                        href="/usuarios"
                        className="rounded bg-white px-3 py-2 text-sm"
                    >
                        Usuários
                    </Link>

                    <Link
                        href="/laboratorios"
                        className="rounded bg-white px-3 py-2 text-sm"
                    >
                        Laboratórios
                    </Link>

                    <Link
                        href="/salas"
                        className="rounded bg-white px-3 py-2 text-sm"
                    >
                        Salas
                    </Link>

                    <Link
                        href="/status"
                        className="rounded bg-white px-3 py-2 text-sm"
                    >
                        Status
                    </Link>
                </nav>

                <h2 className="text-2xl font-bold">
                    Nova reserva
                </h2>

                <p className="mt-1 text-gray-600">
                    {usuario
                        ? `Usuário: ${usuario.nome_completo}`
                        : "Preencha os dados abaixo."}
                </p>

                {erro && (
                    <p className="mt-4 rounded bg-red-100 p-3 text-red-700">
                        {erro}
                    </p>
                )}

                {mensagem && (
                    <p className="mt-4 rounded bg-green-100 p-3 text-green-700">
                        {mensagem}
                    </p>
                )}

                <form
                    onSubmit={criarReserva}
                    className="mt-5 max-w-xl rounded bg-white p-5 shadow"
                >
                    <label className="block font-semibold">
                        Sala ou laboratório
                    </label>

                    <select
                        name="recurso"
                        value={formulario.recurso}
                        onChange={alterarCampo}
                        required
                        className="mt-1 w-full rounded border p-2"
                    >
                        <option value="">
                            Selecione
                        </option>

                        {recursos.map((recurso) => (
                            <option
                                key={recurso.id}
                                value={recurso.id}
                            >
                                {recurso.tipo} - {recurso.codigo} -{" "}
                                {recurso.nome}
                            </option>
                        ))}
                    </select>

                    <label className="mt-4 block font-semibold">
                        Data
                    </label>

                    <input
                        type="date"
                        name="data"
                        value={formulario.data}
                        onChange={alterarCampo}
                        required
                        className="mt-1 w-full rounded border p-2"
                    />

                    <div className="mt-4 flex gap-3">
                        <div className="w-1/2">
                            <label className="block font-semibold">
                                Início
                            </label>

                            <input
                                type="time"
                                name="hora_inicio"
                                value={formulario.hora_inicio}
                                onChange={alterarCampo}
                                required
                                className="mt-1 w-full rounded border p-2"
                            />
                        </div>

                        <div className="w-1/2">
                            <label className="block font-semibold">
                                Fim
                            </label>

                            <input
                                type="time"
                                name="hora_fim"
                                value={formulario.hora_fim}
                                onChange={alterarCampo}
                                required
                                className="mt-1 w-full rounded border p-2"
                            />
                        </div>
                    </div>

                    <label className="mt-4 block font-semibold">
                        Finalidade
                    </label>

                    <textarea
                        name="finalidade"
                        value={formulario.finalidade}
                        onChange={alterarCampo}
                        required
                        placeholder="Informe a finalidade"
                        className="mt-1 w-full rounded border p-2"
                    />

                    <button
                        type="submit"
                        className="mt-4 rounded bg-slate-700 px-4 py-2 text-white"
                    >
                        Reservar
                    </button>
                </form>

                <section className="mt-6 max-w-xl rounded bg-white p-5 shadow">
                    <h2 className="text-xl font-bold">
                        Minhas reservas
                    </h2>

                    {reservas.length === 0 ? (
                        <p className="mt-3 text-gray-600">
                            Nenhuma reserva cadastrada.
                        </p>
                    ) : (
                        <div className="mt-3">
                            {reservas.map((reserva) => (
                                <div
                                    key={reserva.id}
                                    className="mb-3 border-b pb-3"
                                >
                                    <p className="font-semibold">
                                        {reserva.recurso.nome}
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        {reserva.data} —{" "}
                                        {reserva.hora_inicio} às{" "}
                                        {reserva.hora_fim}
                                    </p>

                                    <p className="text-sm">
                                        {reserva.finalidade}
                                    </p>

                                    <button
                                        onClick={() =>
                                            removerReserva(reserva.id)
                                        }
                                        className="mt-2 text-sm text-red-700"
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}





