import React, { useEffect, useState } from "react";
import './HomeCliente.css';
import api from "../services/api";

export function HomeCliente() {
    const [meusProdutos, setMeusProdutos] = useState([]);

    const getMeusProdutos = () => {

        async function getProducts() {
            const response = await api.get(`/api/v1/product/get`);
            response.data.forEach(produto => { setMeusProdutos(prevProdutos => [...prevProdutos, produto])})
        }
        getProducts();
    }
       


    useEffect(() => {
        getMeusProdutos();
    }, []);

    return (
        <section className="section-admin div-column">
            <div className="div-row">
            <h1 style={{
  color: '#6283FA',
  fontSize: '24px',
  fontWeight: 'bold'
}}>Produtos mais pedidos</h1>

            </div>

          

            <section className="section-content">
                    <div className="cliente-produto div-row">
                        {meusProdutos.map(produto => ( produto.quantidade > 0 &&
                            <div className="item-produto">
                                <div className="infos-produto">
                                    <img src={produto.foto} alt="Imagem produto"/>

                                    <div className="dados">

                                        
                                        <label  className="label-with-ellipsis" title={produto.descricao}>{produto.descricao}</label>

                                        <div>

                                            <span className="preco"> R${produto.preco}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
        </section>
        </section>
    );
}