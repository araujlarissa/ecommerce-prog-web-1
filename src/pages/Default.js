import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import React, { useState, useEffect } from "react";
import api from "../services/api";
import './Default.css';

export function Default() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (email !== "" && email != null && email !== undefined) {
      async function getProfile() {
        const response = await api.get(`/ap1/v1/user/getProfile/${email}`);
        setAdmin(response.data.admin);
      }
      getProfile();
    }
    if (admin)
    navigate('/dashboard/');
  else
    navigate('/paginaInicial');
  }, [admin]);

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
