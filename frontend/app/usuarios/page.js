"use client";

import { useEffect, useState } from "react";

import {
    listarUsuarios,
    cadastrarUsuario,
    atualizarUsuario,
    excluirUsuario
} from "../../lib/api";

const formularioInicial = {
    cpf: "",
    nome_completo: "",
    data_nascimento: "",
    celular: "",
    email: ""
};

export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [formulario, setFormulario] = useState(formularioInicial);
    const [editando, setEditando] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function carregarUsuarios() {
        try {
            setErro("");

            const dados = await listarUsuarios();

            if (Array.isArray(dados)) {
                setUsuarios(dados);
            } else if (Array.isArray(dados.recordset)) {
                setUsuarios(dados.recordset);
            } else {
                setUsuarios([]);
            }
        } catch (erro) {
            setErro(erro.message);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    function alterarCampo(event) {
        const { name, value } = event.target;

        setFormulario((formularioAtual) => ({
            ...formularioAtual,
            [name]: value
        }));
    }

    function editarUsuario(usuario) {
        setEditando(true);
        setMensagem("");
        setErro("");

        setFormulario({
            cpf: usuario.cpf || "",
            nome_completo: usuario.nome_completo || "",
            data_nascimento: usuario.data_nascimento
                ? String(usuario.data_nascimento).substring(0, 10)
                : "",
            celular: usuario.celular || "",
            email: usuario.email || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function cancelarEdicao() {
        setEditando(false);
        setFormulario(formularioInicial);
        setErro("");
        setMensagem("");
    }

    async function salvarUsuario(event) {
        event.preventDefault();

        try {
            setSalvando(true);
            setErro("");
            setMensagem("");

            if (editando) {
                await atualizarUsuario(formulario.cpf, {
                    nome_completo: formulario.nome_completo,
                    data_nascimento: formulario.data_nascimento,
                    celular: formulario.celular,
                    email: formulario.email
                });

                setMensagem("Usuário atualizado com sucesso!");
            } else {
                await cadastrarUsuario(formulario);

                setMensagem("Usuário cadastrado com sucesso!");
            }

            setFormulario(formularioInicial);
            setEditando(false);

            await carregarUsuarios();
        } catch (erro) {
            setErro(erro.message);
        } finally {
            setSalvando(false);
        }
    }

    async function removerUsuario(id) {
        const confirmou = window.confirm(
            "Deseja realmente excluir este usuário?"
        );

        if (!confirmou) {
            return;
        }

        try {
            setErro("");
            setMensagem("");

            await excluirUsuario(id);

            setMensagem("Usuário excluído com sucesso!");

            await carregarUsuarios();
        } catch (erro) {
            setErro(erro.message);
        }
    }

    return (
        <main className="min-h-screen bg-slate-100 p-6 md:p-10">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8">
                    <p className="font-semibold text-blue-600">
                        ReservaFácil
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-slate-900">
                        Usuários
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Cadastre, atualize e exclua usuários do sistema.
                    </p>
                </header>

                {erro && (
                    <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
                        {erro}
                    </div>
                )}

                {mensagem && (
                    <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-700">
                        {mensagem}
                    </div>
                )}

                <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
                    <section className="rounded-lg bg-white p-6 shadow">
                        <h2 className="text-xl font-bold text-slate-900">
                            {editando
                                ? "Atualizar usuário"
                                : "Cadastrar usuário"}
                        </h2>

                        <form
                            onSubmit={salvarUsuario}
                            className="mt-5 space-y-4"
                        >
                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-700">
                                    CPF
                                </label>

                                <input
                                    name="cpf"
                                    value={formulario.cpf}
                                    onChange={alterarCampo}
                                    placeholder="Digite o CPF"
                                    required
                                    disabled={editando}
                                    className="w-full rounded border border-slate-300 p-3 disabled:bg-slate-100"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-700">
                                    Nome completo
                                </label>

                                <input
                                    name="nome_completo"
                                    value={formulario.nome_completo}
                                    onChange={alterarCampo}
                                    placeholder="Digite o nome completo"
                                    required
                                    className="w-full rounded border border-slate-300 p-3"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-700">
                                    Data de nascimento
                                </label>

                                <input
                                    name="data_nascimento"
                                    type="date"
                                    value={formulario.data_nascimento}
                                    onChange={alterarCampo}
                                    required
                                    className="w-full rounded border border-slate-300 p-3"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-700">
                                    Celular
                                </label>

                                <input
                                    name="celular"
                                    value={formulario.celular}
                                    onChange={alterarCampo}
                                    placeholder="Digite o celular"
                                    required
                                    className="w-full rounded border border-slate-300 p-3"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold text-slate-700">
                                    E-mail
                                </label>

                                <input
                                    name="email"
                                    type="email"
                                    value={formulario.email}
                                    onChange={alterarCampo}
                                    placeholder="Digite o e-mail"
                                    required
                                    className="w-full rounded border border-slate-300 p-3"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={salvando}
                                className="w-full rounded bg-blue-600 p-3 font-bold text-white hover:bg-blue-700 disabled:bg-blue-300"
                            >
                                {salvando
                                    ? "Salvando..."
                                    : editando
                                      ? "Salvar alterações"
                                      : "Cadastrar usuário"}
                            </button>

                            {editando && (
                                <button
                                    type="button"
                                    onClick={cancelarEdicao}
                                    className="w-full rounded border border-slate-300 p-3 font-semibold text-slate-700 hover:bg-slate-100"
                                >
                                    Cancelar edição
                                </button>
                            )}
                        </form>
                    </section>

                    <section className="rounded-lg bg-white p-6 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Usuários cadastrados
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Lista carregada pela API.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={carregarUsuarios}
                                className="rounded border border-blue-600 px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                            >
                                Atualizar lista
                            </button>
                        </div>

                        {carregando ? (
                            <p className="mt-6 text-slate-500">
                                Carregando usuários...
                            </p>
                        ) : usuarios.length === 0 ? (
                            <p className="mt-6 text-slate-500">
                                Nenhum usuário encontrado.
                            </p>
                        ) : (
                            <div className="mt-6 overflow-x-auto">
                                <table className="w-full min-w-[900px] text-left">
                                    <thead>
                                        <tr className="border-b text-sm text-slate-500">
                                            <th className="p-3">ID</th>
                                            <th className="p-3">Nome</th>
                                            <th className="p-3">CPF</th>
                                            <th className="p-3">E-mail</th>
                                            <th className="p-3">Celular</th>
                                            <th className="p-3">Ações</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {usuarios.map((usuario) => (
                                            <tr
                                                key={usuario.id_usuario}
                                                className="border-b"
                                            >
                                                <td className="p-3">
                                                    {usuario.id_usuario}
                                                </td>

                                                <td className="p-3 font-semibold">
                                                    {usuario.nome_completo}
                                                </td>

                                                <td className="p-3">
                                                    {usuario.cpf}
                                                </td>

                                                <td className="p-3">
                                                    {usuario.email}
                                                </td>

                                                <td className="p-3">
                                                    {usuario.celular}
                                                </td>

                                                <td className="p-3">
                                                    <div className="flex gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                editarUsuario(
                                                                    usuario
                                                                )
                                                            }
                                                            className="rounded bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-200"
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removerUsuario(
                                                                    usuario.id_usuario
                                                                )
                                                            }
                                                            className="rounded bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-200"
                                                        >
                                                            Excluir
                                                        </button>
                                                    </div>
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


