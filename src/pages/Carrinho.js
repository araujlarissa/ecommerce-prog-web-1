import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import trash from '../assets/lixo.svg';
import minus from '../assets/minus.svg';
import plus from '../assets/plus.svg';

import './Carrinho.css';

export function Carrinho() {
  const navigate = useNavigate();
  const [meusProdutos, setMeusProdutos] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);
  const isAutenticated =  sessionStorage.getItem('jwt') !== null;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");




  const getMeusProdutos = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || {};
    const produtos = Object.keys(carrinho).map((produtoId) => ({
      id: produtoId,
      quantidade: carrinho[produtoId].quantidade,
      foto: carrinho[produtoId].foto,
      preco: carrinho[produtoId].preco,
      descricao: carrinho[produtoId].descricao
    }));
    setTotalPedido(produtos.reduce((total, produto) => {
      return total + produto.quantidade * produto.preco;
    }, 0));
    setMeusProdutos(produtos);
  };

  const updateLocalStorage = (produtos) => {
    const carrinho = {};
    produtos.forEach((produto) => {
      carrinho[produto.id] = {
        quantidade: produto.quantidade,
        foto: produto.foto,
        preco: produto.preco,
        descricao: produto.descricao
      };
    });
    setTotalPedido(produtos.reduce((total, produto) => {
        return total + produto.quantidade * produto.preco;
      }, 0));
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  };

  const handleDecrement = (produtoId) => {
    setMeusProdutos((prevProdutos) => {
      const updatedProdutos = prevProdutos.map((produto) => {
        if (produto.id === produtoId && produto.quantidade > 1) {
          return { ...produto, quantidade: produto.quantidade - 1 };
        }
        return produto;
      });
      updateLocalStorage(updatedProdutos);
      return updatedProdutos;
    });
  };

  const handleIncrement = (produtoId) => {
    setMeusProdutos((prevProdutos) => {
      const updatedProdutos = prevProdutos.map((produto) => {
        if (produto.id === produtoId) {
          return { ...produto, quantidade: produto.quantidade + 1 };
        }
        return produto;
      });
      updateLocalStorage(updatedProdutos);
      return updatedProdutos;
    });
  };

  const handleRemoveProduto = (produtoId) => {
    setMeusProdutos((prevProdutos) => {
      const updatedProdutos = prevProdutos.filter((produto) => produto.id !== produtoId);
      updateLocalStorage(updatedProdutos);
      return updatedProdutos;
    });
  };

  const handleSubmitCompra = async() => {
    if(!isAutenticated) {
      setErrorMessage("Faça login para finalizar a compra");
            setTimeout(() => {
                setErrorMessage("");
                navigate('/login');
                }, 2000);  

    }
    let produtos = meusProdutos.map((produto) => {
      return {
        "idProduto": produto.id,
        "quantidade": produto.quantidade
      }
    })
    const response = await api.post(`/api/v1/user/insertUserSales`, {
      produtos: produtos,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(response.data){
      setSuccessMessage("Compra feita com sucesso!");
      setTimeout(() => {
          localStorage.clear();
          navigate('/paginaInicial');
          window.location.reload();
          setSuccessMessage("");
          }, 2000);  
    }else{
      setErrorMessage("Ocorreu um erro ao finalizar a compra");
            setTimeout(() => {
                setErrorMessage("");
                }, 2000);  
    }
    
  }


  useEffect(() => {
    getMeusProdutos();
  }, []);

  const isCarrinhoVazio = meusProdutos.length === 0;

  return (
    
    <section className="section-carrinho div-column">
      <div className="div-row">
        <h1>Carrinho de compras</h1>
      </div>
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

      <div className="section-content">
        <div className="info-pedido div-column">
          <div className="item-content">
            <div className="title">
              <span>Meus produtos</span>
              <button
                className="yellow"
                onClick={() => {
                  setMeusProdutos([]);
                  updateLocalStorage([]);
                }}
              >
                Limpar carrinho
              </button>
            </div>
            <div className="group-item-pedido">
              <div className="lista-produto div-column">
                {meusProdutos.map((produto) => (
                  <div className="item-produto carrinho">
                    <div className="infos-produto">
                      <img src={produto.foto} alt="Imagem produto" />

                      <div className="dados">
                        <label>{produto.descricao}</label>
                      </div>
                    </div>

                    <div className="acoes">
                      <div className="qtd">
                        <button
                          className="icon-button"
                          onClick={() => handleDecrement(produto.id)}
                        >
                          <img className="icon" src={minus} alt="diminuir quantidade" />
                        </button>

                        <span>{produto.quantidade}</span>

                        <button
                          className="icon-button"
                          onClick={() => handleIncrement(produto.id)}
                        >
                          <img className="icon" src={plus} alt="aumentar quantidade" />
                        </button>
                      </div>

                      <button
                        className="icon-button"
                        onClick={() => handleRemoveProduto(produto.id)}
                      >
                        <img className="icon trash" src={trash} alt="remover produto" />
                      </button>

                      <span className="preco-produto">R${produto.preco}</span>
                    </div>
                  </div>
                ))}
                {isCarrinhoVazio && (
            <p>O carrinho está vazio.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="resumo-pedido item-content">
          <h3>Resumo do pedido</h3>

          {meusProdutos.map((produto) => (
            <label>{produto.quantidade}x - {produto.descricao}</label>
          ))}

          {isCarrinhoVazio && (
            <p>O carrinho está vazio.</p>
          )}

          <hr />
          <div className="total">
            <label>Total</label>
            <label className="total-price">{totalPedido}</label>
          </div>

          <button
            className="btn-finalizar"
            to="/finalizarCompra"
            disabled={isCarrinhoVazio || !isAutenticated}
            onClick={() => handleSubmitCompra()}
            title={
                isCarrinhoVazio
                  ? 'Seu carrinho está vazio'
                  : isAutenticated ? 'Finalizar compra' : 'Faça login para finalizar a compra'
              }
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </section>
  );
}
