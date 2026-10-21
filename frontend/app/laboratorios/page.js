"use client";

import { useEffect, useState } from "react";
import {
    listarLaboratorios,
    cadastrarLaboratorio
} from "../../lib/api";

export default function LaboratoriosPage() {
    const [laboratorios, setLaboratorios] = useState([]);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    const [formulario, setFormulario] = useState({
        codigo: "",
        nome: "",
        capacidade: "",
        localizacao: "",
        observacao: "",
        quantidade_computadores: "",
        possui_internet: true,
        observacao_tecnica: ""
    });

    async function carregarLaboratorios() {
        try {
            const dados = await listarLaboratorios();
            setLaboratorios(Array.isArray(dados) ? dados : []);
        } catch (erro) {
            setErro(erro.message);
        }
    }

    useEffect(() => {
        carregarLaboratorios();
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

            await cadastrarLaboratorio({
                ...formulario,
                capacidade: Number(formulario.capacidade),
                quantidade_computadores: Number(
                    formulario.quantidade_computadores
                )
            });

            setMensagem("Laboratório cadastrado com sucesso!");

            setFormulario({
                codigo: "",
                nome: "",
                capacidade: "",
                localizacao: "",
                observacao: "",
                quantidade_computadores: "",
                possui_internet: true,
                observacao_tecnica: ""
            });

            await carregarLaboratorios();
        } catch (erro) {
            setErro(erro.message);
        }
    }

    return (
        <main className="min-h-screen bg-slate-100 p-6 md:p-10">
            <div className="mx-auto max-w-7xl">
                <p className="font-semibold text-blue-600">ReservaFácil</p>

                <h1 className="mt-2 text-3xl font-bold">
                    Laboratórios
                </h1>

                <p className="mt-2 text-slate-600">
                    Cadastre e consulte os laboratórios disponíveis.
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
                            Novo laboratório
                        </h2>

                        {[
                            ["codigo", "Código"],
                            ["nome", "Nome"],
                            ["capacidade", "Capacidade"],
                            ["localizacao", "Localização"],
                            [
                                "quantidade_computadores",
                                "Quantidade de computadores"
                            ]
                        ].map(([nome, placeholder]) => (
                            <input
                                key={nome}
                                name={nome}
                                value={formulario[nome]}
                                onChange={alterarCampo}
                                placeholder={placeholder}
                                type={
                                    nome === "capacidade" ||
                                    nome === "quantidade_computadores"
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
                            name="observacao_tecnica"
                            value={formulario.observacao_tecnica}
                            onChange={alterarCampo}
                            placeholder="Observação técnica"
                            className="mt-4 w-full rounded-xl border p-3"
                        />

                        <label className="mt-4 flex gap-2">
                            <input
                                type="checkbox"
                                name="possui_internet"
                                checked={formulario.possui_internet}
                                onChange={alterarCampo}
                            />
                            Possui internet
                        </label>

                        <button className="mt-6 w-full rounded-xl bg-purple-600 p-3 font-bold text-white hover:bg-purple-700">
                            Cadastrar laboratório
                        </button>
                    </form>

                    <section className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold">
                            Laboratórios cadastrados
                        </h2>

                        <div className="mt-5 overflow-x-auto">
                            <table className="w-full min-w-[700px] text-left">
                                <thead>
                                    <tr className="border-b text-sm text-slate-500">
                                        <th className="p-3">Código</th>
                                        <th className="p-3">Nome</th>
                                        <th className="p-3">Capacidade</th>
                                        <th className="p-3">Localização</th>
                                        <th className="p-3">Computadores</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {laboratorios.map((laboratorio) => (
                                        <tr
                                            key={laboratorio.id_recurso}
                                            className="border-b"
                                        >
                                            <td className="p-3 font-semibold">
                                                {laboratorio.codigo}
                                            </td>

                                            <td className="p-3">
                                                {laboratorio.nome}
                                            </td>

                                            <td className="p-3">
                                                {laboratorio.capacidade}
                                            </td>

                                            <td className="p-3">
                                                {laboratorio.localizacao}
                                            </td>

                                            <td className="p-3">
                                                {
                                                    laboratorio.quantidade_computadores
                                                }
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

