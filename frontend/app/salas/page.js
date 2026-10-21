"use client";

import { useEffect, useState } from "react";
import {
    listarSalas,
    cadastrarSala
} from "../../lib/api";

export default function SalasPage() {
    const [salas, setSalas] = useState([]);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    const [formulario, setFormulario] = useState({
        codigo: "",
        nome: "",
        capacidade: "",
        localizacao: "",
        observacao: "",
        tipo_sala: "",
        possui_projetor: true,
        possui_ar_condicionado: true,
        observacao_sala: ""
    });

    async function carregarSalas() {
        try {
            const dados = await listarSalas();
            setSalas(Array.isArray(dados) ? dados : []);
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

    async function cadastrar(event) {
        event.preventDefault();

        try {
            setErro("");
            setMensagem("");

            await cadastrarSala({
                ...formulario,
                capacidade: Number(formulario.capacidade)
            });

            setMensagem("Sala cadastrada com sucesso!");

            setFormulario({
                codigo: "",
                nome: "",
                capacidade: "",
                localizacao: "",
                observacao: "",
                tipo_sala: "",
                possui_projetor: true,
                possui_ar_condicionado: true,
                observacao_sala: ""
            });

            await carregarSalas();
        } catch (erro) {
            setErro(erro.message);
        }
    }

    return (
        <main className="min-h-screen bg-slate-100 p-6 md:p-10">
            <div className="mx-auto max-w-7xl">
                <p className="font-semibold text-blue-600">ReservaFácil</p>

                <h1 className="mt-2 text-3xl font-bold">
                    Salas
                </h1>

                <p className="mt-2 text-slate-600">
                    Cadastre e consulte as salas disponíveis.
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

                <div className="mt-8 grid gap-6 lg:grid-cols-[380px_1fr]">
                    <form
                        onSubmit={cadastrar}
                        className="rounded-2xl bg-white p-6 shadow-sm"
                    >
                        <h2 className="text-xl font-bold">
                            Nova sala
                        </h2>

                        {[
                            ["codigo", "Código"],
                            ["nome", "Nome"],
                            ["capacidade", "Capacidade"],
                            ["localizacao", "Localização"],
                            ["tipo_sala", "Tipo da sala"]
                        ].map(([nome, placeholder]) => (
                            <input
                                key={nome}
                                name={nome}
                                value={formulario[nome]}
                                onChange={alterarCampo}
                                placeholder={placeholder}
                                type={
                                    nome === "capacidade"
                                        ? "number"
                                        : "text"
                                }
                                required
                                className="mt-4 w-full rounded-xl border p-3"
                            />
                        ))}

                        <textarea
                            name="observacao"
                            value={formulario.observacao}
                            onChange={alterarCampo}
                            placeholder="Observação"
                            className="mt-4 w-full rounded-xl border p-3"
                        />

                        <textarea
                            name="observacao_sala"
                            value={formulario.observacao_sala}
                            onChange={alterarCampo}
                            placeholder="Observação da sala"
                            className="mt-4 w-full rounded-xl border p-3"
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
                                checked={formulario.possui_ar_condicionado}
                                onChange={alterarCampo}
                            />
                            Possui ar-condicionado
                        </label>

                        <button className="mt-6 w-full rounded-xl bg-emerald-600 p-3 font-bold text-white hover:bg-emerald-700">
                            Cadastrar sala
                        </button>
                    </form>

                    <section className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold">
                            Salas cadastradas
                        </h2>

                        <div className="mt-5 overflow-x-auto">
                            <table className="w-full min-w-[700px] text-left">
                                <thead>
                                    <tr className="border-b text-sm text-slate-500">
                                        <th className="p-3">Código</th>
                                        <th className="p-3">Nome</th>
                                        <th className="p-3">Capacidade</th>
                                        <th className="p-3">Localização</th>
                                        <th className="p-3">Tipo</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {salas.map((sala) => (
                                        <tr
                                            key={sala.id_recurso}
                                            className="border-b"
                                        >
                                            <td className="p-3 font-semibold">
                                                {sala.codigo}
                                            </td>

                                            <td className="p-3">
                                                {sala.nome}
                                            </td>

                                            <td className="p-3">
                                                {sala.capacidade}
                                            </td>

                                            <td className="p-3">
                                                {sala.localizacao}
                                            </td>

                                            <td className="p-3">
                                                {sala.tipo_sala}
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

