"use client";

import { useEffect, useState } from "react";

import {
    listarStatus,
    cadastrarStatus,
    atualizarStatus,
    excluirStatus
} from "../../lib/api";

const formularioInicial = {
    nome: "",
    descricao: "",
    permite_reserva: true,
    ativo: true
};

export default function StatusPage() {
    const [status, setStatus] = useState([]);
    const [formulario, setFormulario] = useState(formularioInicial);
    const [editando, setEditando] = useState(null);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function carregarStatus() {
        try {
            setErro("");

            const dados = await listarStatus();

            setStatus(
                Array.isArray(dados)
                    ? dados
                    : dados.recordset || []
            );
        } catch (erro) {
            setErro(erro.message);
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

    function editar(item) {
        setEditando(item.id_status_reserva);

        setFormulario({
            nome: item.nome || "",
            descricao: item.descricao || "",
            permite_reserva: Boolean(item.permite_reserva),
            ativo: Boolean(item.ativo)
        });
    }

    function cancelar() {
        setEditando(null);
        setFormulario(formularioInicial);
    }

    async function salvar(event) {
        event.preventDefault();

        try {
            setErro("");
            setMensagem("");

            if (editando) {
                await atualizarStatus(editando, formulario);
                setMensagem("Status atualizado com sucesso!");
            } else {
                await cadastrarStatus(formulario);
                setMensagem("Status cadastrado com sucesso!");
            }

            cancelar();
            await carregarStatus();
        } catch (erro) {
            setErro(erro.message);
        }
    }

    async function excluir(id) {
        if (!window.confirm("Deseja excluir este status?")) {
            return;
        }

        try {
            await excluirStatus(id);
            setMensagem("Status excluído com sucesso!");
            await carregarStatus();
        } catch (erro) {
            setErro(erro.message);
        }
    }

    return (
        <main className="min-h-screen bg-slate-100 p-6 md:p-10">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold text-slate-900">
                    Status de reserva
                </h1>

                {erro && (
                    <div className="mt-5 rounded bg-red-100 p-4 text-red-700">
                        {erro}
                    </div>
                )}

                {mensagem && (
                    <div className="mt-5 rounded bg-green-100 p-4 text-green-700">
                        {mensagem}
                    </div>
                )}

                <div className="mt-8 grid gap-6 lg:grid-cols-[350px_1fr]">
                    <form
                        onSubmit={salvar}
                        className="rounded bg-white p-6 shadow"
                    >
                        <h2 className="text-xl font-bold">
                            {editando ? "Atualizar status" : "Cadastrar status"}
                        </h2>

                        <input
                            name="nome"
                            value={formulario.nome}
                            onChange={alterarCampo}
                            placeholder="Nome"
                            required
                            className="mt-5 w-full rounded border p-3"
                        />

                        <textarea
                            name="descricao"
                            value={formulario.descricao}
                            onChange={alterarCampo}
                            placeholder="Descrição"
                            className="mt-4 w-full rounded border p-3"
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
                            Ativo
                        </label>

                        <button className="mt-5 w-full rounded bg-blue-600 p-3 font-bold text-white">
                            {editando ? "Salvar alterações" : "Cadastrar"}
                        </button>

                        {editando && (
                            <button
                                type="button"
                                onClick={cancelar}
                                className="mt-3 w-full rounded border p-3"
                            >
                                Cancelar
                            </button>
                        )}
                    </form>

                    <section className="rounded bg-white p-6 shadow">
                        <h2 className="text-xl font-bold">
                            Status cadastrados
                        </h2>

                        <div className="mt-5 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b">
                                        <th className="p-3">ID</th>
                                        <th className="p-3">Nome</th>
                                        <th className="p-3">Descrição</th>
                                        <th className="p-3">Ações</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {status.map((item) => (
                                        <tr
                                            key={item.id_status_reserva}
                                            className="border-b"
                                        >
                                            <td className="p-3">
                                                {item.id_status_reserva}
                                            </td>

                                            <td className="p-3">
                                                {item.nome}
                                            </td>

                                            <td className="p-3">
                                                {item.descricao}
                                            </td>

                                            <td className="flex gap-2 p-3">
                                                <button
                                                    onClick={() => editar(item)}
                                                    className="rounded bg-blue-100 px-3 py-2 text-blue-700"
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        excluir(
                                                            item.id_status_reserva
                                                        )
                                                    }
                                                    className="rounded bg-red-100 px-3 py-2 text-red-700"
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

