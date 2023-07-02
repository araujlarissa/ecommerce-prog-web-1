import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link,  useNavigate } from "react-router-dom";
import { Input } from "../components/Input";

import './HomeAdmin.css';

export function HomeAdmin() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("produtos");
    const [meusProdutos, setMeusProdutos] = useState([]);
    const [minhasCategorias, setMinhasCategorias] = useState([]);
    const [editProdutoForm, setEditProdutoForm] = useState({
        id : 0,
        descricao: '',
        preco: 0,
        quantidade: 0,
        categoriaId: 0
      });
      const [addProdutoForm, setAddProdutoForm] = useState({
        descricao: '',
        preco: 0,
        quantidade: 0,
        categoriaId: 0
      });
      const [editCategoriaForm, setEditCategoriaForm] = useState({
        id : 0,
        descricao: '',
      });
      
      const [addCategoriaForm, setAddCategoriaForm] = useState({
        descricao: '',
      });

    const handleSetProdutos = () => setStatus("produtos");
    const handleSetCategorias = () => setStatus("categorias");


    const handleSetAddProduto = () => setStatus("addProduto");
    const handleSetAddCategoria = () => setStatus("addCategoria");

    const handleSetEditProduto = (index) => {
        // quero pegar o id do elemento clicado 
        // passar as informações para "editar Produto" de acordo com o id
        // só depois atualizar o status
        setEditProdutoForm(meusProdutos[index])
        setStatus("editProduto");
    }

    const handleDeleteProduto = async (index) => {
        // quero pegar o id do elemento clicado 
        // passar as informações para "editar Produto" de acordo com o id
        // só depois atualizar o status
        let prod = meusProdutos[index]
        try {

            const response = await api.delete(`/api/v1/product/delete`, {
                data: {
                  id: prod.id
                },
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            if(response.data === true)
              navigate('/dashboard')
              window.location.reload();
 
        
          } catch (error) {
            console.error('Erro ao editar o produto:', error);
          }
    }

    const handleDeleteCategoria = async (index) => {
        // quero pegar o id do elemento clicado 
        // passar as informações para "editar Produto" de acordo com o id
        // só depois atualizar o status
        let cat = minhasCategorias[index]
        try {

            const response = await api.delete(`/api/v1/categoria/delete`, {
                data: {
                  id: cat.id
                },
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            if(response.data === true)
              navigate('/dashboard')
              window.location.reload();
        
          } catch (error) {
            console.error('Erro ao editar o produto:', error);
          }
    }


    const handleSetEditCategoria = (index) => {
        // quero pegar o id do elemento clicado 
        // passar as informações para "editar Categoria" de acordo com o id
        // só depois atualizar o status
        setEditCategoriaForm(minhasCategorias[index]);
        setStatus("editCategoria");
    }
    const getMeusProdutos = () => {

        async function getProducts() {
            const response = await api.get(`/api/v1/product/get`);
         //   response.data.forEach(produto => { setMeusProdutos(prevProdutos => [...prevProdutos, produto])})
         setMeusProdutos(response.data)
            console.log(meusProdutos)
        }
        getProducts();
    }

    const handleEditProdutoFormChange = (e) => {
        const { name, value } = e.target;
        setEditProdutoForm(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const handleAddProdutoFormChange = (e) => {
        const { name, value } = e.target;
        setAddProdutoForm(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const handleAddCategoriaFormChange = (e) => {
        const { name, value } = e.target;
        setAddCategoriaForm(prevState => ({
          ...prevState,
          [name]: value
        }));
      };


      const handleEditCategoriaFormChange = (e) => {
        const { name, value } = e.target;
        setEditCategoriaForm(prevState => ({
          ...prevState,
          [name]: value
        }));
      };


      

      const handleEditProdutoSubmit = async () => {
        try {
          // Simulação de chamada à API
          const response = await api.post(`/api/v1/product/update`, editProdutoForm);
          if(response.data === true)
            navigate('/dashboard')
            window.location.reload();
          // Lógica adicional aqui (redirecionamento, atualização de estado, etc.)
      
        } catch (error) {
          console.error('Erro ao editar o produto:', error);
        }
      };

      const handleAddProdutoSubmit = async () => {
        try {
          // Simulação de chamada à API
          const response = await api.post(`/api/v1/product/create`, addProdutoForm);
          if(response.data === true)
            navigate('/dashboard')
            window.location.reload();
          // Lógica adicional aqui (redirecionamento, atualização de estado, etc.)
      
        } catch (error) {
          console.error('Erro ao adicionar o produto:', error);
        }
      };

      const handleAddCategoriaSubmit = async () => {
        try {
          // Simulação de chamada à API
          const response = await api.post(`/api/v1/categoria/create`, addCategoriaForm);
          if(response.data === true)
            navigate('/dashboard')
            window.location.reload();
          // Lógica adicional aqui (redirecionamento, atualização de estado, etc.)
      
        } catch (error) {
          console.error('Erro ao adicionar o produto:', error);
        }
      };
      
      
      const handleEditCategoriaSubmit = async () => {
        try {
          // Simulação de chamada à API
          const response = await api.post(`/api/v1/categoria/update`, editCategoriaForm);
          if(response.data === true)
            navigate('/dashboard')
            window.location.reload();
          // Lógica adicional aqui (redirecionamento, atualização de estado, etc.)
      
        } catch (error) {
          console.error('Erro ao editar a categoria:', error);
        }
      };
      

    const getMinhasCategorias = () => {
        async function getCategorias() {
            const response = await api.get(`/api/v1/categoria/get`);
         setMinhasCategorias(response.data)
        }
        getCategorias();
    }


    useEffect(() => {
        getMeusProdutos();
        getMinhasCategorias();
    }, []);

    return (
        <section className="section-admin div-column">
            <div className="div-row">
                <h1>Base de Produtos</h1>
                <span className="admin">admin</span>
            </div>

            <div className="div-menu">
                <div className="group-btn">
                    <button 
                        className="item-menu"
                        id={status === "produtos" | status === "addProduto" | status === "editProduto" ? "selected" : null}
                        onClick={handleSetProdutos}
                    >
                        Produtos
                    </button>

                    <button 
                        className="item-menu"
                        id={status === "categorias" || status === "addCategoria" | status === "editCategoria" ? "selected" : null}
                        onClick={handleSetCategorias}
                    >
                        Categorias
                    </button>


                </div>

                {status === "produtos" && 
                    <button
                        className="btn-secondary"
                        onClick={handleSetAddProduto}
                    >
                        Adicionar produto
                    </button>
                }   

                {status === "categorias" && 
                    <button 
                        className="btn-secondary"
                        onClick={handleSetAddCategoria}
                    >
                        Adicionar categoria
                    </button>
                }          
            </div>

            <section className="section-content">
                {status === "produtos" && meusProdutos.length > 0 &&
                    <div className="lista-produto div-column">
                        {meusProdutos.map((produto, index) => (
                            <div className="item-produto" key={index}>
                                <div className="infos-produto">
                                    <img src={produto.foto} alt="Imagem produto"/>

                                    <div className="dados">
                                        <div className="categorias">
                                            {/* {produto.categorias.map((categoria) => 
                                                <span className="tag">{categoria}</span>
                                            )} */}
                                        </div>
                                        
                                        <label>{produto.descricao}</label>

                                        <div>
                                            <span className="estoque">{produto.quantidade} unidades em estoque</span>
                                            <span className="preco"> | R${produto.preco}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="acoes">
                                    <button 
                                        className="secondary"
                                        id="cta"
                                        onClick={ () => handleSetEditProduto(index)}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="tertiary"
                                        id="cta"
                                        onClick={() => {handleDeleteProduto(index)}}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                }

                {status === "categorias" &&
                    <div className="lista-categoria div-column">
                        {minhasCategorias.map((categoria,index) => (
                            <div className="item-categoria">
                                <div className="infos-categoria div-column">
                                    <span className="tag">{categoria.descricao}</span>
                                </div>
                                
                                <div className="acoes">
                                    <button 
                                        className="secondary"
                                        id="cta"
                                        onClick={() => handleSetEditCategoria(index)}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className="tertiary"
                                        id="cta"
                                        onClick={() => {handleDeleteCategoria(index)}}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                }

                {status === "editProduto" && 
                    <div className="add">
                        <h3>Editar produto</h3>

                        <div>
                            
                            <div className="div-inputs div-column">
                                <div className="label-form">
                                    <label for="descricao">Descrição</label>
                                    <label className="required">*</label>
                                </div>

                                <textarea 
                                    id="descricao"
                                    name="descricao"
                                    placeholder="Digite a descrição"
                                    rows={5}
                                    value={editProdutoForm.descricao}
                                    onChange={handleEditProdutoFormChange}
                                /> 
                            </div>
                            
                            <div className="numbers">
                                <Input 
                                    id="preco"
                                    type="number"
                                    label="Preço"
                                    placeholder="Digite o preco"
                                    name="preco"
                                    step="0.01"
                                    value={editProdutoForm.preco}
                                    onChange={handleEditProdutoFormChange}
                                />
                                <Input 
                                    id="estoque"
                                    type="number"
                                    name="quantidade"
                                    label="Estoque"
                                    placeholder="Digite a quantidade do estoque"
                                    value={editProdutoForm.quantidade}
                                    onChange={handleEditProdutoFormChange}
                                />                  
                            </div>

                            <Input 
                                id="categorias"
                                type="text"
                                name="categoriaId"
                                label="Categoria"
                                placeholder="Digite apenas uma categoria"
                                max-length="1"
                                value={editProdutoForm.categoriaId}
                                onChange={handleEditProdutoFormChange}
                            />               
                        </div>

                        <button
                            className="btn-secondary"
                            type="submit"
                            onClick={() => {handleEditProdutoSubmit()}}
                        >
                            Editar produto
                        </button>
                    </div> 
                }

                {status === "editCategoria" &&
                    <div className="add">
                        <h3>Editar categoria</h3>

                        <div>
                            <Input 
                                id="descricao"
                                name="descricao"
                                type="text"
                                label="Descrição"
                                placeholder="Digite o nome da categoria"
                                value={editCategoriaForm.descricao}
                                onChange={handleEditCategoriaFormChange}
                            />  
           
                        </div>

                        <button
                            className="btn-secondary"
                            type="submit"
                            onClick={() => {handleEditCategoriaSubmit()}}
                        >
                            Editar categoria
                        </button>
                    </div>
                }

                {status === "addProduto" && 
                    <div className="add">
                        <h3>Adicionar produto</h3>

                        <div>
 
                            
                            <div className="div-inputs div-column">
                                <div className="label-form">
                                    <label for="descricao">Descrição</label>
                                    <label className="required">*</label>
                                </div>

                                <textarea 
                                    id="descricao"
                                    name="descricao"
                                    placeholder="Digite a descrição"
                                    rows={5}
                                    value={addProdutoForm.descricao}
                                    onChange={handleAddProdutoFormChange}
                                /> 
                            </div>
                            
                            <div className="numbers">
                                <Input 
                                    id="preco"
                                    type="number"
                                    name="preco"
                                    label="Preço"
                                    placeholder="Digite o preco"
                                    step="0.01"
                                    value={addProdutoForm.preco}
                                    onChange={handleAddProdutoFormChange}
                                    
                                />
                                <Input 
                                    id="estoque"
                                    type="number"
                                    name="quantidade"
                                    label="Estoque"
                                    placeholder="Digite a quantidade do estoque"
                                    value={addProdutoForm.quantidade}
                                    onChange={handleAddProdutoFormChange}
                                />                  
                            </div>

                            <Input 
                                id="categorias"
                                type="text"
                                max-length="1"
                                name="categoriaId"
                                label="Categorias"
                                placeholder="Digite o Id da categoria"
                                value={addProdutoForm.categoriaId}
                                    onChange={handleAddProdutoFormChange}
                            />               
                        </div>

                        <button
                            className="btn-secondary"
                            type="submit"
                            onClick={() => {handleAddProdutoSubmit()}}
                        >
                            Adicionar produto
                        </button>
                    </div>
                }

                {status === "addCategoria" && 
                    <div className="add">
                        <h3>Adicionar categoria</h3>

                        <div>
                            <Input 
                                id="nome"
                                type="text"
                                label="Nome"
                                name="descricao"
                                placeholder="Digite o nome da categoria"
                                value={addCategoriaForm.descricao}
                                onChange={handleAddCategoriaFormChange}
                            />  
            
                        </div>

                        <button
                            className="btn-secondary"
                            type="submit"
                            onClick={() => {handleAddCategoriaSubmit()}}
                        >
                            Adicionar categoria
                        </button>
                    </div>
                } 
            </section>
        </section>
    );
}