/*export default function Pagina() {
  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-blue-600">ReservaFácil</p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Cadastro de usuarios
        </h1>

        <p className="mt-3 text-slate-600">
          Esta tela será conectada à API quando o back-end estiver finalizado.
        </p>
      </div>
    </main>
  );
}
*/ 

"use client";

import { useEffect, useState } from "react";
import {
    listarUsuarios,
    cadastrarUsuario
} from "../../lib/api";

export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    const [formulario, setFormulario] = useState({
        cpf: "",
        nome_completo: "",
        data_nascimento: "",
        celular: "",
        email: ""
    });

    async function carregarUsuarios() {
        try {
            setErro("");

            const dados = await listarUsuarios();

            setUsuarios(dados);
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

    async function enviarFormulario(event) {
        event.preventDefault();

        try {
            setMensagem("");
            setErro("");

            await cadastrarUsuario(formulario);

            setMensagem("Usuário cadastrado com sucesso!");

            setFormulario({
                cpf: "",
                nome_completo: "",
                data_nascimento: "",
                celular: "",
                email: ""
            });

            await carregarUsuarios();
        } catch (erro) {
            setErro(erro.message);
        }
    }

    return (
        <main className="min-h-screen bg-slate-100 p-6 md:p-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <p className="font-semibold text-blue-600">
                        ReservaFácil
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-slate-900">
                        Usuários
                    </h1>

                    <p className="mt-2 text-slate-600">
                        Dados carregados diretamente da API.
                    </p>
                </div>

                {erro && (
                    <div className="mb-5 rounded-xl bg-red-100 p-4 text-red-700">
                        {erro}
                    </div>
                )}

                {mensagem && (
                    <div className="mb-5 rounded-xl bg-green-100 p-4 text-green-700">
                        {mensagem}
                    </div>
                )}

                <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
                    <section className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900">
                            Cadastrar usuário
                        </h2>

                        <form
                            onSubmit={enviarFormulario}
                            className="mt-5 space-y-4"
                        >
                            <input
                                name="cpf"
                                value={formulario.cpf}
                                onChange={alterarCampo}
                                placeholder="CPF"
                                required
                                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                            />

                            <input
                                name="nome_completo"
                                value={formulario.nome_completo}
                                onChange={alterarCampo}
                                placeholder="Nome completo"
                                required
                                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                            />

                            <input
                                name="data_nascimento"
                                type="date"
                                value={formulario.data_nascimento}
                                onChange={alterarCampo}
                                required
                                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                            />

                            <input
                                name="celular"
                                value={formulario.celular}
                                onChange={alterarCampo}
                                placeholder="Celular"
                                required
                                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                            />

                            <input
                                name="email"
                                type="email"
                                value={formulario.email}
                                onChange={alterarCampo}
                                placeholder="E-mail"
                                required
                                className="w-full rounded-xl border border-slate-300 px-4 py-3"
                            />

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700"
                            >
                                Cadastrar
                            </button>
                        </form>
                    </section>

                    <section className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900">
                            Usuários cadastrados
                        </h2>

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
                                <table className="w-full min-w-[700px] text-left">
                                    <thead>
                                        <tr className="border-b text-sm text-slate-500">
                                            <th className="p-3">ID</th>
                                            <th className="p-3">Nome</th>
                                            <th className="p-3">CPF</th>
                                            <th className="p-3">E-mail</th>
                                            <th className="p-3">Celular</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {usuarios.map((usuario) => (
                                            <tr
                                                key={usuario.id_usuario}
                                                className="border-b text-sm"
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

