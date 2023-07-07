import React, { useEffect, useState } from "react";
import './HomeCliente.css';
import api from "../services/api";
import minus from '../assets/minus.svg';
import plus from '../assets/plus.svg';

export function HomeCliente() {
    const [successMessage, setSuccessMessage] = useState("");
    const [meusProdutos, setMeusProdutos] = useState([]);
    const [quantidades, setQuantidades] = useState({});

    const getMeusProdutos = () => {
        setMeusProdutos([]);
        async function getProducts() {
            const response = await api.get(`/api/v1/product/get`);
            response.data.forEach(produto => {
                setMeusProdutos(prevProdutos => [...prevProdutos, produto]);
                setQuantidades(prevQuantidades => ({ ...prevQuantidades, [produto.id]: 0 }));
            });
        }
        getProducts();
    }

    useEffect(() => {
        getMeusProdutos();
    }, []);

    const adicionarQuantidade = (produto) => {
        setQuantidades(prevQuantidades => ({
            ...prevQuantidades,
            [produto.id]: prevQuantidades[produto.id] + 1
        }));
    };

    const retirarQuantidade = (produto) => {
        setQuantidades(prevQuantidades => ({
            ...prevQuantidades,
            [produto.id]: Math.max(prevQuantidades[produto.id] - 1, 0)
        }));
    };


const adicionarAoCarrinho = (produto) => {
    const quantidade = quantidades[produto.id];

    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || {};

    if (carrinhoAtual.hasOwnProperty(produto.id)) {
        carrinhoAtual[produto.id].quantidade += quantidade;
    } else {
        carrinhoAtual[produto.id] = {
            quantidade: quantidade,
            foto: produto.foto,
            preco: produto.preco,
            descricao: produto.descricao
        };
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
    setSuccessMessage("Produto adicionado ao carrinho com sucesso!");
            setTimeout(() => {
                setSuccessMessage("");
                }, 2000);  

};

    return (
        <section className="section-admin div-column">
              {successMessage && (
          <div className="alert alert-success mt-3 text-center fixed-top" role="alert">
          {successMessage}
          </div>
        )}
            <div className="div-row">
                <h1 style={{
                    color: '#6283FA',
                    fontSize: '24px',
                    fontWeight: 'bold'
                }}>Produtos mais pedidos</h1>
            </div>

            <section className="section-content">
                <div className="cliente-produto div-row">
                    {meusProdutos.map(produto => (
                        produto.quantidade > 0 && (
                            <div className="item-produto" key={produto.id}>
                                <div className="infos-produto">
                                    <img src={produto.foto} alt="Imagem produto" />

                                    <div className="dados">
                                        <label className="label-with-ellipsis" title={produto.descricao}>{produto.descricao}</label>
                                        <div>
                                            <span className="preco"> R${produto.preco}</span>
                                        </div>
                                        <div className="acoes">
                                            <div className="qtd">
                                                <button
                                                    className="icon-button"
                                                    onClick={() => retirarQuantidade(produto)}
                                                >
                                                    <img className="icon" src={minus} alt="diminuir quantidade" />
                                                </button>
                                                <span>{quantidades[produto.id]}</span>
                                                <button
                                                    className="icon-button"
                                                    onClick={() => adicionarQuantidade(produto)}
                                                >
                                                    <img className="icon" src={plus} alt="aumentar quantidade" />
                                                </button>
                                            </div>

                                            <button
                                                className="carrinhoAdd"
                                                type="submit"
                                                onClick={() => adicionarAoCarrinho(produto)}  
                                            >
                                            Adicionar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </section>
        </section>
    );
}
