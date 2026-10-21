"use client";

import { useEffect, useState } from "react";
import {
    listarStatus,
    cadastrarStatus
} from "../../lib/api";

export default function StatusPage() {
    const [status, setStatus] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    const [formulario, setFormulario] = useState({
        nome: "",
        descricao: "",
        permite_reserva: true,
        ativo: true
    });

    async function carregarStatus() {
        try {
            setErro("");
            const dados = await listarStatus();
            setStatus(Array.isArray(dados) ? dados : []);
        } catch (erro) {
            setErro(erro.message);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarStatus();
    }, []);

    function alterarCampo(event) {
        const { name, value, type, checked } = event.target;

        setFormulario({
            ...formulario,
            [name]: type === "checkbox" ? checked : value
        });
    }

    async function cadastrar(event) {
        event.preventDefault();

        try {
            setErro("");
            setMensagem("");

            await cadastrarStatus(formulario);

            setMensagem("Status cadastrado com sucesso!");

            setFormulario({
                nome: "",
                descricao: "",
                permite_reserva: true,
                ativo: true
            });

            await carregarStatus();
        } catch (erro) {
            setErro(erro.message);
        }
    }

    return (
        <main className="min-h-screen bg-slate-100 p-6 md:p-10">
            <div className="mx-auto max-w-6xl">
                <p className="font-semibold text-blue-600">ReservaFácil</p>

                <h1 className="mt-2 text-3xl font-bold text-slate-900">
                    Status das reservas
                </h1>

                <p className="mt-2 text-slate-600">
                    Cadastre e consulte os status utilizados no sistema.
                </p>

                {erro && (
                    <div className="mt-6 rounded-xl bg-red-100 p-4 text-red-700">
                        {erro}
                    </div>
                )}

                {mensagem && (
                    <div className="mt-6 rounded-xl bg-green-100 p-4 text-green-700">
                        {mensagem}
                    </div>
                )}

                <div className="mt-8 grid gap-6 lg:grid-cols-[350px_1fr]">
                    <form
                        onSubmit={cadastrar}
                        className="rounded-2xl bg-white p-6 shadow-sm"
                    >
                        <h2 className="text-xl font-bold">
                            Novo status
                        </h2>

                        <input
                            name="nome"
                            value={formulario.nome}
                            onChange={alterarCampo}
                            placeholder="Nome do status"
                            required
                            className="mt-5 w-full rounded-xl border p-3"
                        />

                        <textarea
                            name="descricao"
                            value={formulario.descricao}
                            onChange={alterarCampo}
                            placeholder="Descrição"
                            className="mt-4 w-full rounded-xl border p-3"
                        />

                        <label className="mt-4 flex gap-2">
                            <input
                                type="checkbox"
                                name="permite_reserva"
                                checked={formulario.permite_reserva}
                                onChange={alterarCampo}
                            />
                            Permite reserva
                        </label>

                        <label className="mt-3 flex gap-2">
                            <input
                                type="checkbox"
                                name="ativo"
                                checked={formulario.ativo}
                                onChange={alterarCampo}
                            />
                            Status ativo
                        </label>

                        <button className="mt-6 w-full rounded-xl bg-blue-600 p-3 font-bold text-white hover:bg-blue-700">
                            Cadastrar status
                        </button>
                    </form>

                    <section className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold">
                            Status cadastrados
                        </h2>

                        {carregando ? (
                            <p className="mt-5">Carregando...</p>
                        ) : (
                            <div className="mt-5 overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b text-sm text-slate-500">
                                            <th className="p-3">ID</th>
                                            <th className="p-3">Nome</th>
                                            <th className="p-3">Descrição</th>
                                            <th className="p-3">Ativo</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {status.map((item) => (
                                            <tr
                                                key={
                                                    item.id_status_reserva ||
                                                    item.id_status
                                                }
                                                className="border-b"
                                            >
                                                <td className="p-3">
                                                    {item.id_status_reserva ||
                                                        item.id_status}
                                                </td>

                                                <td className="p-3 font-semibold">
                                                    {item.nome}
                                                </td>

                                                <td className="p-3">
                                                    {item.descricao}
                                                </td>

                                                <td className="p-3">
                                                    {item.ativo ? "Sim" : "Não"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}

