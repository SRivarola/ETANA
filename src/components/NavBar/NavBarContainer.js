import React, { useContext } from "react";
import './NavBarContainer.scss';
import logo from '../../assets/img/logob.png';
import loginlogo from '../../assets/img/login1.png';
import logoutlogo from '../../assets/img/logout1.png';
import CartWidget from '../CartWidget/CartWidget'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import ModalLogin from '../ModalLogin/ModalLogin';

export default function NavBarContainer() {

    const navigate = useNavigate();
    const { logged, logout } = useContext(UserContext);

    return (
        <>
        <header className="header">
            <div className='banner'>
                <p className="b1">ENVÍO GRATUITO - CABA</p>
                <p className="b2">ENVÍO GRATUITO - CABA</p>
                <p className="b3">ENVÍO GRATUITO - CABA</p>
            </div>
            <nav className="barraNav">
                <div className="primeraparte">
                </div>
                <div className="marca">
                    <Link className="link-marca" to='/'>
                        <img className="img-marca" src={logo} alt='foto de marca' />
                    </Link>
                </div>
                <div className="nav-icons" >
                    <div className="cart-container">
                        <CartWidget handlePush={ () => navigate('/cart') } />
                    </div>
                    {
                        logged ?
                        <div className="settings-container">
                            <button className='btn-logout' onClick={ logout } >
                                <img className="img-logout" src={ logoutlogo } alt='icono de logout'/>
                            </button>
                        </div>
                        :
                        <div className="settings-container">
                            <button className='btn-login' data-bs-toggle='modal' data-bs-target='#modalLogin'>
                                <img className="img-login" src={ loginlogo } alt='icono de login' />
                            </button>
                        </div>
                    }
                </div>
            </nav>
           {
               logged &&
                <div className='barra-admin'>
                    <div className='container'>
                        <button className='btn-stock' onClick={ () => navigate('/admin/stock') }>CARGAR STOCK</button>
                        <button className='btn-control' onClick={ () => navigate('/admin/control') }>CONTROL</button>
                        <button className='btn-precio' onClick={ () => navigate('/admin/precio') }>MODIFICAR PRECIO / %OFF</button>
                        <button className='btn-producto' onClick={ () => navigate('/admin/producto') }>AGREGAR PRODUCTO</button>
                        <button className='btn-eliminar' onClick={ () => navigate('/admin/eliminar') }>ELIMINAR PRODUCTO</button>
                        <button className='btn-entregas' onClick={ () => navigate('/admin/entregas') }>ENTREGAS</button>
                    </div>
                </div>
            }
        </header>
        <ModalLogin />
        </>
    )
}
