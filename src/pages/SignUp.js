import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

import { Input } from "../components/Input";

import './LoginSignUp.css';
import "bootstrap/dist/css/bootstrap.min.css"; // Importa o arquivo CSS do Bootstrap

export function SignUp() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [endereco, setEndereco] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(`/api/v1/user/create`,{
                nome: nome,
                endereco: endereco,
                email: email,
                senha: senha
        });
            if(response.data.errorMessage == null) {
                // Define uma mensagem de sucesso
                setSuccessMessage("Conta criada com sucesso!");

                // Aguarda 3 segundos (3000 milissegundos)
                setTimeout(() => {
                // Limpa a mensagem de sucesso
                setSuccessMessage("");

                // Redireciona o usuário para a tela de login
                navigate("/login");
                }, 3000);
            } else {
                setErrorMessage("Ocorreu um erro ao criar a conta.");
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        } catch (error) {
            setErrorMessage("Ocorreu um erro ao criar a conta.");
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            console.error("Error on create:", error.response.errorMessage);
        }
    };

    return (
        <section className="section-form div-column">
            {successMessage && (
                <div className="alert alert-success mt-3 text-center" role="alert">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="alert alert-danger mt-3 text-center" role="alert">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <h1>Crie sua conta</h1>

                <Input 
                    id="name"
                    type="text"
                    label="Nome"
                    placeholder="Ex: Alissa"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                
                <Input 
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="Ex: alifernandes@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input 
                    id="endereco"
                    type="text"
                    label="Endereço"
                    placeholder="Ex: Rua 2, Diamantina"
                    value={endereco ?? ''}
                    onChange={(e) => setEndereco(e.target.value)}
                />

                <Input 
                    id="password"
                    type="password"
                    label="Senha"
                    placeholder="Digite sua senha"
                    onChange={(e) => setSenha(e.target.value)}
                />

                <div className="div-buttons div-column">
                    <button className="yellow" type="submit">Criar minha conta</button>
                    <Link to="/login">Já tenho conta</Link>
                </div>
            </form>
        </section>
    );
}
