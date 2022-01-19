import './EmptyCart.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

export default function EmptyCart() {
    return (
        <section className='Cart'>
            <div className='container Cart__empty'>
                <h1 className='titulo'>Aún no hay productos en tu carrito...</h1>
                <Link to='/'>
                    <button type='button' className='btn btn--large'>
                        VER PRODUCTOS <FiArrowLeft />
                    </button>
                </Link>
            </div>
            
        </section>
    )
}
