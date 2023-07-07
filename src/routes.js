import { createBrowserRouter } from 'react-router-dom';
import { Default } from './pages/Default';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';
import { HomeAdmin } from './pages/HomeAdmin';
import { HomeCliente } from './pages/HomeCliente';
import { Carrinho } from './pages/Carrinho';
import { FinalizarCompra } from './pages/FinalizarCompra';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Default />,
        children: [
            {
                path: '/login',
                element: <Login /> 
            },
            {
                path: '/cadastro',
                element: <SignUp />
            },
            {
                path: '/carrinho',
                element: <Carrinho />
            },
            {
                path: '/finalizarCompra',
                element: <FinalizarCompra />
            },
            {
                path: '/profile/',
                element: <Profile />
            },
            {
                path: '/dashboard',
                element: <HomeAdmin /> 
            },
            {
                path: '/paginaInicial',
                element: <HomeCliente /> 
            }
        ],
    }
])