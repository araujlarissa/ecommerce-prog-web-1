import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import api from "../services/api";
import { ShoppingCart, User } from 'phosphor-react';
import logo from '../assets/logo.svg';

import './Sidebar.css';


export function Sidebar() {
    const [admin, setAdmin] = useState(false);
    const [isLogged, setisLogged] = useState(false);

    let email = sessionStorage.getItem("email");
    
    if(email !== "" && email != null && email !== undefined){
        async function getProfile() {
            const response = await api.get(`/api/v1/user/getProfile/${email}`);
            response != null ? setisLogged(true) : setisLogged(false);
            setAdmin(response.data.admin);
        }
        getProfile();
    }

    return(
        <nav className="sidebar"> 
        <NavLink to={admin ? "/dashboard" : "/paginaInicial"}>
            <img className="logo" src={logo} alt="logo" />
        </NavLink>

        {isLogged ?
            <div className="actions-nav">
                {!admin ?
                    <NavLink to="/carrinho">
                        <ShoppingCart 
                            color="#FFF"
                            size={28}
                        />
                    </NavLink>
                : <></>
                }

                <NavLink to="/profile">
                    <User
                        color="#FFF"
                        size={28}
                        className="Islogged"
                    />
                </NavLink>
            </div>
        :
            <div className="actions-nav">
                <NavLink to="/login" className="button-nav secondary">
                    <span>Entrar</span>
                </NavLink>

                <NavLink to="/cadastro" className="button-nav primary">
                    <span>Criar conta</span>
                </NavLink>

                <NavLink to="/carrinho">
                    <ShoppingCart 
                        color="#FFF"
                        size={28}
                    />
                </NavLink>
            </div>  
        }
    </nav>
    );
}