import React, { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";

import api from "../services/api";
import { Input } from "../components/Input";

import "./LoginSignUp.css";
import "bootstrap/dist/css/bootstrap.min.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const [loginState, setLoginState] = useState({ loggedIn: false});
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/v1/user/login", {
        email,
        senha: password,
      });

      if (response.data.errorMessage != null) {
        setEmail("");
        setPassword("");
        setErrorMessage("Usuário ou senha inválido.");  
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);  

        return console.error("Error logging in:", response.data.errorMessage);
      }

      console.log("User logged in successfully:", response.data);
      setSuccessMessage("Usuário logado com sucesso!");

      sessionStorage.setItem("jwt", response.data.token);
      sessionStorage.setItem("email", email)
      setAdmin(response.data.role);
      setLoginState({ loggedIn: true});

    } catch (error) {
      setErrorMessage("Usuário ou senha inválido.");  

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);  
      console.error("Error logging in:", error.response.data);
    }
  };

  if (loginState.loggedIn) {
    setTimeout(() => {
      setSuccessMessage("");
      if(admin) return navigate('/dashboard/');
      navigate('/paginaInicial/');
      }, 2000);  
  }

  return (
    
    <section className="section-form div-column">
        {successMessage && (
          <div className="alert alert-success mt-3 text-center fixed-top" role="alert">
          {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger mt-3 text-center fixed-top" role="alert">
          {errorMessage}
          </div>
        )}
      <form onSubmit={handleSubmit}>
        <h1>Faça Login</h1>

        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          id="password"
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="div-buttons div-column">
          <button className="yellow" type="submit">
            Entrar
          </button>
          <Link to="/cadastro">Não tenho conta</Link>
        </div>
      </form>
    </section>
  );
}
