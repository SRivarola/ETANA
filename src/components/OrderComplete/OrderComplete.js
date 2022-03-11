import './OrderComplete.scss'
import React from 'react';
import { Link } from 'react-router-dom';

const Ordercomplete = () => {

    if(!JSON.parse(sessionStorage.getItem('orderId'))){
        sessionStorage.setItem('orderId', JSON.stringify('No Hay orden de compra'))
    }
    const orderIdInit = JSON.parse(sessionStorage.getItem('orderId'));
    const orderId = orderIdInit;

    return (
        <div className='container'>
            <div className='compraRegistrada'>
                <h2>Tu compra fue registrada</h2>
                <h3>Tu número orden es: <span className='ordenId'>{orderId}</span></h3>
                <div className='volver'>
                    <Link to='/' className='btn-volver'>Volver</Link>
                </div>
            </div>
        </div>
    );
}

export default Ordercomplete;