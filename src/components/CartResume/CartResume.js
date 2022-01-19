import React from 'react'
import { Link } from 'react-router-dom'
import { FiSend } from 'react-icons/fi'

export default function CartResume({ totalCompra }) {

    const total = Number(totalCompra())

    return (
        <section className='Cart__resume'>
            <div className='info'>
                <div className='resume'>
                    <h3>INFORMACION DEL CARRITO</h3>
                    <h4>TOTAL:<span>${total.toLocaleString()}</span></h4>
                </div>
            </div>
            <div className='check-out'>
                <Link to='/checkout'>
                    <button type='button' className='btn'>
                        FINALIZAR COMPRA <FiSend />
                    </button>
                </Link>
            </div>
        </section>
    )
}
