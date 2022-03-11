import './EmptyCart.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import CopyRight from '../../components/CopyRight/CopyRight'
import Footer from '../../components/Footer/Footer'

export default function EmptyCart() {
    return (
        <div className='all'>
            <section className='emptyCart'>
                <div className='container Cart__empty'>
                    <div className='container-titulo'>
                        <h1 className='titulo'>Aún no hay productos en tu carrito...</h1>
                    </div>
                    <Link to='/'>
                        <button type='button' className='btn btn--large'>
                            VER PRODUCTOS <FiArrowLeft />
                        </button>
                    </Link>
                </div> 
            </section>
            <section>
                <Footer />
                <CopyRight />
            </section>
        </div>
    )
}
