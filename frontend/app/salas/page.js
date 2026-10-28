"use client";

import { useEffect, useState } from "react";

import {
    listarSalas,
    cadastrarSala,
    atualizarSala,
    excluirSala
} from "../../lib/api";

const formularioInicial = {
    codigo: "",
    nome: "",
    capacidade: "",
    localizacao: "",
    observacao: "",
    tipo_sala: "",
    possui_projetor: false,
    possui_ar_condicionado: false,
    observacao_sala: "",
    ativo: true
};

export default function SalasPage() {
    const [salas, setSalas] = useState([]);
    const [formulario, setFormulario] = useState(formularioInicial);
    const [editando, setEditando] = useState(null);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function carregarSalas() {
        try {
            setErro("");

            const dados = await listarSalas();

            setSalas(
                Array.isArray(dados)
                    ? dados
                    : dados.recordset || []
            );
        } catch (erro) {
            setErro(erro.message);
        }
    }

    useEffect(() => {
        carregarSalas();
    }, []);

    function alterarCampo(event) {
        const { name, value, type, checked } = event.target;

        setFormulario({
            ...formulario,
            [name]: type === "checkbox" ? checked : value
        });
    }

    function editar(sala) {
        setEditando(sala.id_recurso);

        setFormulario({
            codigo: sala.codigo || "",
            nome: sala.nome || "",
            capacidade: sala.capacidade || "",
            localizacao: sala.localizacao || "",
            observacao: sala.observacao || "",
            tipo_sala: sala.tipo_sala || "",
            possui_projetor: Boolean(sala.possui_projetor),
            possui_ar_condicionado: Boolean(
                sala.possui_ar_condicionado
            ),
            observacao_sala: sala.observacao_sala || "",
            ativo: Boolean(sala.ativo)
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
                await atualizarSala(editando, formulario);
                setMensagem("Sala atualizada com sucesso!");
            } else {
                await cadastrarSala(formulario);
                setMensagem("Sala cadastrada com sucesso!");
            }

            cancelar();
            await carregarSalas();
        } catch (erro) {
            setErro(erro.message);
        }
    }

    async function excluir(id) {
        if (!window.confirm("Deseja excluir esta sala?")) {
            return;
        }

        try {
            await excluirSala(id);
            setMensagem("Sala excluída com sucesso!");
            await carregarSalas();
        } catch (erro) {
            setErro(erro.message);
        }
    }

    return (
        <main className="min-h-screen bg-slate-100 p-6 md:p-10">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-bold text-slate-900">
                    Salas
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

                <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr]">
                    <form
                        onSubmit={salvar}
                        className="rounded bg-white p-6 shadow"
                    >
                        <h2 className="text-xl font-bold">
                            {editando ? "Atualizar sala" : "Cadastrar sala"}
                        </h2>

                        {[
                            ["codigo", "Código"],
                            ["nome", "Nome"],
                            ["capacidade", "Capacidade"],
                            ["localizacao", "Localização"],
                            ["tipo_sala", "Tipo da sala"]
                        ].map(([name, placeholder]) => (
                            <input
                                key={name}
                                name={name}
                                value={formulario[name]}
                                onChange={alterarCampo}
                                placeholder={placeholder}
                                type={
                                    name === "capacidade"
                                        ? "number"
                                        : "text"
                                }
                                required
                                className="mt-4 w-full rounded border p-3"
                            />
                        ))}

                        <textarea
                            name="observacao"
                            value={formulario.observacao}
                            onChange={alterarCampo}
                            placeholder="Observação"
                            className="mt-4 w-full rounded border p-3"
                        />

                        <textarea
                            name="observacao_sala"
                            value={formulario.observacao_sala}
                            onChange={alterarCampo}
                            placeholder="Observação da sala"
                            className="mt-4 w-full rounded border p-3"
                        />

                        <label className="mt-4 flex gap-2">
                            <input
                                type="checkbox"
                                name="possui_projetor"
                                checked={formulario.possui_projetor}
                                onChange={alterarCampo}
                            />
                            Possui projetor
                        </label>

                        <label className="mt-3 flex gap-2">
                            <input
                                type="checkbox"
                                name="possui_ar_condicionado"
                                checked={
                                    formulario.possui_ar_condicionado
                                }
                                onChange={alterarCampo}
                            />
                            Possui ar-condicionado
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
                            Salas cadastradas
                        </h2>

                        <div className="mt-5 overflow-x-auto">
                            <table className="w-full min-w-[900px] text-left">
                                <thead>
                                    <tr className="border-b">
                                        <th className="p-3">Código</th>
                                        <th className="p-3">Nome</th>
                                        <th className="p-3">Capacidade</th>
                                        <th className="p-3">Localização</th>
                                        <th className="p-3">Ações</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {salas.map((item) => (
                                        <tr
                                            key={item.id_recurso}
                                            className="border-b"
                                        >
                                            <td className="p-3">
                                                {item.codigo}
                                            </td>

                                            <td className="p-3">
                                                {item.nome}
                                            </td>

                                            <td className="p-3">
                                                {item.capacidade}
                                            </td>

                                            <td className="p-3">
                                                {item.localizacao}
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
                                                        excluir(item.id_recurso)
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

