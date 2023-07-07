import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";

import './HomeAdmin.css';

export function HomeAdmin() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [status, setStatus] = useState("produtos");
    const [meusProdutos, setMeusProdutos] = useState([]);
    const [minhasCategorias, setMinhasCategorias] = useState([]);
    const [editProdutoForm, setEditProdutoForm] = useState({
        id : 0,
        descricao: '',
        preco: 0,
        quantidade: 0,
        categoriaId: 0,
        foto:""
      });
      const [addProdutoForm, setAddProdutoForm] = useState({
        descricao: '',
        preco: 0,
        quantidade: 0,
        categoriaId: 0,
        foto: ""
      });
      const [editCategoriaForm, setEditCategoriaForm] = useState({
        id : 0,
        descricao: '',
      });
      
      const [addCategoriaForm, setAddCategoriaForm] = useState({
        descricao: '',
      });
    const [meusPedidos, setMeusPedidos] = useState([]);

    const handleSetProdutos = () => setStatus("produtos");
    const handleSetCategorias = () => setStatus("categorias");
    const handleSetPedidos = () => setStatus("pedidos");

    const handleSetAddProduto = () => setStatus("addProduto");
    const handleSetAddCategoria = () => setStatus("addCategoria");

    const handleSetEditProduto = (index) => {
        setEditProdutoForm(meusProdutos[index])
        setStatus("editProduto");
    }

    const handleDeleteProduto = async (index) => {
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
            handleMessage(response.data,"Produto excluído com sucesso!","Erro ao excluir produto")
        
          } catch (error) {
            console.error('Erro ao editar o produto:', error);
          }
    }

    const handleDeletePedidoCliente = async (index) => {
        let pedido = meusPedidos[index]
        try {

            const response = await api.delete(`/api/v1/user/deleteUserSale`, {
                data: {
                 vendaId: pedido.id
                },
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            handleMessage(response.data,"Pedido do cliente excluído com sucesso!","Erro ao excluir pedido do cliente")
 
        
          } catch (error) {
            setErrorMessage("Erro ao excluir pedido do cliente");  
            setTimeout(() => {
                setErrorMessage("");
                }, 2000);
            console.error('Erro ao editar o produto:', error);
          }
    }

    const handleDeleteCategoria = async (index) => {
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
              handleMessage(response.data,"Categoria excluída com sucesso!","Erro ao excluir categoria")
        
          } catch (error) {
            console.error('Erro ao editar o produto:', error);
          }
    }


    const handleSetEditCategoria = (index) => {
        setEditCategoriaForm(minhasCategorias[index]);
        setStatus("editCategoria");
    }
    const getMeusProdutos = () => {

        async function getProducts() {
            const response = await api.get(`/api/v1/product/get`);
            setMeusProdutos(response.data)
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

      const handleEditProdutoFormFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const { name, value } = e.target;
        reader.onloadend = () => {
            setEditProdutoForm(prevState => ({
                ...prevState,
                [name]: reader.result
              }));
        };
        reader.readAsDataURL(file);
      };

      const handleAddProdutoFormFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setAddProdutoForm((prevState) => ({
            ...prevState,
            foto: reader.result // Armazena a imagem convertida em base64
          }));
        };
        reader.readAsDataURL(file);
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
          const response = await api.post(`/api/v1/product/update`, editProdutoForm);
          handleMessage(response.data,"Produto atualizado com sucesso!","Erro ao atualizar produto")

      
        } catch (error) {
          console.error('Erro ao editar o produto:', error);
        }
      };

      const handleAddProdutoSubmit = async () => {
        try {
          const response = await api.post(`/api/v1/product/create`, addProdutoForm);
          handleMessage(response.data,"Produto adicionado com sucesso!","Erro ao adicionar produto")
      
        } catch (error) {
          console.error('Erro ao adicionar o produto:', error);
        }
      };

      const handleMessage = (response,messageSucesso, messageError) => {
        if(response === true){
            setSuccessMessage(messageSucesso);
            setTimeout(() => {
                setSuccessMessage("");
                navigate('/dashboard')
                window.location.reload();
                }, 2000);  
            }
            else{
            setErrorMessage(messageError);  
            setTimeout(() => {
                setErrorMessage("");
                }, 2000);
            }
      }

      const handleAddCategoriaSubmit = async () => {
        try {
          const response = await api.post(`/api/v1/categoria/create`, addCategoriaForm);
          handleMessage(response.data,"Categoria adicionada com sucesso!","Erro ao adicionar categoria")
      
        } catch (error) {
          console.error('Erro ao adicionar uma categoria:', error);
        }
      };

   
      
      
      const handleEditCategoriaSubmit = async () => {
        try {
          const response = await api.post(`/api/v1/categoria/update`, editCategoriaForm);
          handleMessage(response.data,"Categoria atualizada com sucesso!","Erro ao atualizar categoria")
      
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


    const getPedidosClientes = () => {
        async function getPedidosClientes() {
            const response = await api.get(`/api/v1/user/getAllUserSales`);
            setMeusPedidos(response.data)
        }
        getPedidosClientes();
    }
   

    useEffect(() => {
        getMeusProdutos();
        getMinhasCategorias();
        getPedidosClientes();
    }, []);

    return (
        <section className="section-admin div-column">
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

                    <button 
                        className="item-menu"
                        id={status === "pedidos" ? "selected" : null}
                        onClick={handleSetPedidos}
                    >
                        Pedidos dos clientes
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
                                    type="file"
                                    name="foto"
                                    label="Foto"
                                    accept="image/*"
                                    onChange={handleEditProdutoFormFileChange}
                                />
             
                             <select
                                id="categorias"
                                className="selectCategoria"
                                name="categoriaId"
                                value={editProdutoForm.categoriaId}
                                onChange={handleEditProdutoFormChange}
                                >
                            <option value="">Selecione a categoria</option>
                            {minhasCategorias.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>
                                {categoria.descricao}
                                </option>
                            ))}
                            </select>   
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
                                    type="file"
                                    name="foto"
                                    label="Foto"
                                    accept="image/*"
                                    required
                                    onChange={handleAddProdutoFormFileChange}
                                />
                            <select
                                id="categorias"
                                className="selectCategoria"
                                name="categoriaId"
                                value={addProdutoForm.categoriaId}
                                onChange={handleAddProdutoFormChange}
                                >
                            <option value="">Selecione a categoria</option>
                            {minhasCategorias.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>
                                {categoria.descricao}
                                </option>
                            ))}
                            </select>              
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

                {status === "pedidos" &&
                    <div className="lista-produto div-column">
                        {meusPedidos.map((produto,index) => (
                            <div className="item-pedido"> 
                                <div className="infos-pedido">
                                    <span className="num">PEDIDO Nº {produto.id}</span>
                                </div>

                                <div className="item-produto pedido">
                                    <div className="infos-produto">
                                        <img src={produto.foto} alt="Imagem produto"/>

                                        <div className="dados">
                                            <label>{produto.descricao}</label>
                                            <div>
                                                <span className="estoque">{produto.quantidade} unidade</span>
                                                <span className="preco"> | Total = R${produto.preco} | Pedido feito por {produto.usuario} </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="acoes">
                                        <button 
                                            className="secondary"
                                            id="cta"
                                            onClick={() => {handleDeletePedidoCliente(index)}}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </section>
        </section>
    );
}