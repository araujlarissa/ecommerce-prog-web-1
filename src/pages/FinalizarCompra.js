import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Input } from "../components/Input";

import './FinalizarCompra.css';

const isLogged = true;

const user = {
    id: '123',
    tipo: 'admin',
    nome: 'Alissa Fernandes',
    email: 'alissa.fernandes@gmail.com',
    senha: "senha",
    endereco: 'Rua das Capivaras, 233, Bairro Lagoinha - Caruaru, PE'
}

export function FinalizarCompra() {
    const [meusProdutos, setMeusProdutos] = useState([]);

    const getMeusProdutos = () => setMeusProdutos([
        {
            img: "https://cobasi.vteximg.com.br/arquivos/ids/939212/racao-golden-formula-caes-adultos-racas-pequenas-frango-arroz-mini-bits-3626279-1kg.jpg?v=638127640641870000",
            nome: "Ração Golden Fórmula Mini Bits para Cães Adultos de Porte Pequeno Sabor Frango e Arroz",
            quantidade: 3,
            preco: "149,90",
        },
        {
            img: "https://cobasi.vteximg.com.br/arquivos/ids/939212/racao-golden-formula-caes-adultos-racas-pequenas-frango-arroz-mini-bits-3626279-1kg.jpg?v=638127640641870000",
            nome: "Ração Golden Fórmula Mini Bits para Cães Adultos de Porte Pequeno Sabor Frango e Arroz",
            quantidade: 1,
            preco: "149,90",
        },
    ]);

    const totalPedido = 'R$599,60';

    useEffect(() => {
        getMeusProdutos();
    }, []);

    return (
        <section className="section-carrinho div-column">
            <div className="div-row">
                <h1>Finalizar compra</h1>
            </div>

            <div className="section-content">
                <div className="info-pedido finalizar div-column">
                    {/* MEUS PRODUTOS */}
                    <div className="item-content">
                        <div className="title">
                            <span>Meus produtos</span>
                        </div>
                        <div className="group-item-pedido">
                            <div className="lista-produto div-column">
                                {meusProdutos.map(produto => (
                                    <div className="item-produto carrinho">
                                        <div className="infos-produto">
                                            <img src={produto.img} alt="Imagem produto"/>

                                            <div className="dados">
                                                <label>{produto.nome}</label>
                                            </div>
                                        </div>
                                        
                                        <div className="acoes finalizar">
                                            <span className="estoque">{produto.quantidade + "x"}</span>
                                            <span className="preco-produto">R${produto.preco}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* MEUS DADOS */}
                    <div className="item-content">
                        <div className="title">
                            <span>Meus dados</span>
                        </div>
                        
                        {isLogged ?
                            <div className="dados-user">
                                <label>{user.nome},</label>
                                <label>{user.email},</label>
                                <label>{user.endereco},</label>
                            </div>
                        :
                        <form className="group-inputs finalizar div-column">
                            <div className="inputs-row">
                                <Input 
                                    id="nome"
                                    type="text"
                                    label="Nome"
                                    placeholder="Ex: Alissa Fernandes"
                                />

                                <Input 
                                    id="email"
                                    type="email"
                                    label="Email"
                                    placeholder="Ex: alifernandes@gmail.com"
                                />
                            </div>
                            <div className="inputs-row">
                                <Input 
                                    id="endereco"
                                    type="text"
                                    label="Endereço"
                                    placeholder="Ex: Rua 2, Diamantina"
                                />

                                <Input 
                                    id="password"
                                    type="password"
                                    label="Senha"
                                    placeholder="Digite sua senha"
                                />
                            </div>

                            <button 
                                className="yellow"
                                onSubmit={() => {}}
                            >
                                Criar minha conta
                            </button>
                        </form>
                        }
                    </div>

                    {/* FORMA DE PAGAMENTO */}
                    {isLogged && 
                        <div className="item-content">
                            <div className="title">
                                <span>Forma de pagamento</span>
                            </div>
                            <div className="forma-pagamento">
                                <label>PIX</label>
                                <button
                                    className="codigo"
                                    onClick={() => {}}
                                >
                                    Copiar código
                                </button>
                            </div>
                        </div>
                    }
                </div>

                <div className="resumo-pedido item-content">
                    <h3>Resumo do pedido</h3>

                    {meusProdutos.map(produto => (
                        <label>{produto.quantidade}x - {produto.nome}</label>
                    ))}
                    
                    <hr />
                    <div className="total">
                        <label>Total</label>
                        <label className="total-price">{totalPedido}</label>
                    </div>

                    <NavLink 
                        className="btn-finalizar"
                        to="/finalizarCompra"
                    >
                        Finalizar compra
                    </NavLink>
                </div>
            </div>
        </section>
    );
}