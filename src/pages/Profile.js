import React, { useState, useEffect  } from "react";
import { useNavigate  } from "react-router-dom";


import { Input } from "../components/Input";
import { User, ShoppingBag, SignOut} from "phosphor-react";

import api from "../services/api";

import './Profile.css';
import "bootstrap/dist/css/bootstrap.min.css"; 

export function Profile () {
    const [status, setStatus] = useState("minha-conta");
    const [pedidos, setPedidos] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [senha, setSenha] = useState('');
    const [admin, setAdmin] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSetConta = () => setStatus("minha-conta");
    const handleSetPedidos = () => setStatus("meus-pedidos");

    const getMeusPedidos = () => {

        async function getPedidosFinalizados() {
            const response = await api.get(`/api/v1/user/getUserSales`);
            console.log(response.data)
            setPedidos(response.data)
        }
        getPedidosFinalizados();
    }

   

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await api.post(`/api/v1/user/updateUser`,{
                nome: nome,
                endereco: endereco,
                email: email,
                senha: senha
            });

            if(response.data.errorMessage === null){
                setSuccessMessage("Usuário atualizado.");
                setTimeout(() => {
                    setSuccessMessage("");
                    window.location.reload();
                }, 1200);  
      
            } else {
                setErrorMessage("Ocorreu um erro ao atualizar o usuário.");
                setTimeout(() => {
                   setErrorMessage("");
                }, 3000);
            }
        } catch (error) {
          console.error("Error on Update:", error.response.errorMessage);
        }
    };

    const logOff = () => {
        sessionStorage.clear();
        window.location.pathname = '/paginaInicial';
        window.location.reload();
    }

    const deleteAccount = async () => {
        const response = await api.delete(`/api/v1/user/deleteUser`, {
            data: { email: email }
        });

        if(response.data === true){
            setSuccessMessage("Usuário deletado com sucesso!");
            setTimeout(() => {
                setSuccessMessage("");
                sessionStorage.clear();
                navigate('/');
            }, 3000);  
        } else {
            setErrorMessage("Ocorreu um erro ao excluir conta.");  
            setTimeout(() => {
                setErrorMessage("");
            }, 3000)
        }
    }

    useEffect(() => {
        async function getProfile() {
            let email = sessionStorage.getItem("email")
            const response = await api.get(`/api/v1/user/getProfile/${email}`);
            setNome(response.data.nome);
            setEmail(response.data.email);
            setEndereco(response.data.endereco);
            setSenha(response.data.senha);
            setAdmin(response.data.admin);
        }

        getProfile();
        getMeusPedidos();
    }, []); 

    return (
        <section className="section-profile div-column">
            
            <div className="div-row">
                <h1>{nome ?? ''}</h1>
                {admin === true ? <span className="admin">admin</span> : <></>}
            </div>

            <div className="section-content">
                <div className="group-menu">
                    <button 
                        className="item-menu"
                        id={status === "minha-conta" ? "selected" : null}
                        onClick={handleSetConta}
                    >
                        <User color="#404040" size={20}/>
                        <span>Minha conta</span>
                    </button>

                    {admin === false ? 
                        <button 
                            className="item-menu"
                            id={status === "meus-pedidos" ? "selected" : null}
                            onClick={handleSetPedidos}
                        >
                            <ShoppingBag color="#404040" size={20}/>
                            <span>Meus pedidos</span>
                        </button>
                    : 
                        <></>
                    }
                    
                    <button 
                        className="item-menu"
                        id="sair"
                        onClick={() => {logOff()}}
                    >
                        <SignOut color="#404040" size={20}/>
                        <span>Sair</span>
                    </button>
                </div>
            
                <div className="group-options">
                    {status === "minha-conta" ?
                        <div className="minha-conta">
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

                            {/* VER CONTA */}
                            <h3>Minha conta</h3>
                            <hr/>

                            <div className="dados div-column">
                                <label>
                                    <span>Nome:</span>
                                    {nome}
                                </label>
                                <label>
                                    <span>Email:</span>
                                    {email}
                                </label>
                                <label>
                                    <span>Endereço:</span>
                                    {endereco ?? 'Endereço não cadastrado'}
                                </label>
                            </div>

                            {/* EDITAR CONTA */}
                            <h3>Editar conta</h3>
                            <hr/>

                            <form className="group-inputs div-column" onSubmit={handleSubmit}>
                                {/* Se houver uma mensagem de erro, exibir o alerta */}
                                {errorMessage && <div className="error-message">{errorMessage}</div>}
                                
                                <Input 
                                    id="nome"
                                    type="text"
                                    label="Nome"
                                    placeholder="Ex: Alissa Fernandes"
                                    value={nome ?? ''}
                                    onChange={(e) => setNome(e.target.value)}
                                />

                                <Input 
                                    id="email"
                                    type="email"
                                    label="Email"
                                    placeholder="Ex: alifernandes@gmail.com"
                                    value={email ?? ''}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled
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
                                    placeholder="Não escreva 123"
                                    value={senha ?? ''}
                                    onChange={(e) => setSenha(e.target.value)}
                                />

                                <button 
                                    className="yellow"
                                    type="submit"
                                >
                                    Salvar alterações
                                </button>
                            </form>

                            {/* EXCLUIR CONTA */}
                            <h3>Excluir conta</h3>
                            <hr/>

                            <div className="group-excluir div-column">
                                <label>
                                Ao excluir a conta, você não vai ter acesso ao histórico de pedidos
                                mesmo que se cadastre novamente.
                                </label>

                                <button 
                                    className="danger"
                                    onClick={() => {deleteAccount()}}
                                >
                                    Excluir conta
                                </button>
                            </div>
                        </div>
                    :
                        <div className="meus-pedidos">
                            <h3>Meus pedidos</h3>
                            <hr/>

                            {pedidos.map(pedido => (
                                <div className="item-pedido">
                                    <div className="infos-pedido">
                                        <span className="idProduto">PEDIDO Nº {pedido.id}</span>    
                                    </div>

                                    <div className="content-pedido">
                                        <div className="desc">
                                            <img src={pedido.foto} alt="Sem foto." />
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}>
                                            <label>{pedido.descricao}</label>
                                            <p>Quantidade: {pedido.quantidade}</p>
                                            </div>
                                        </div>
                                        
                                        <h3>Total: R$ {pedido.preco}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>    
            </div>
        </section>
    )
}