import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { FiCreditCard, FiTruck } from 'react-icons/fi'

export default function CheckoutResume() {

    const { totalCompra } = useContext(CartContext)

    return (
        <section className='Checkout__resume'>
            <section className='resume__summary'>
                <article>
                    <header>
                        <h3>Resumen de compra</h3>
                    </header>
                    <ul>
                        <li><span>Orden de compra: </span><span>{`$${totalCompra()}`}</span></li>
                        <li><span>Costo de envío: </span><span>acá iría costo de envío</span></li>
                    </ul>
                    <hr/>
                    <footer>
                        <ul>
                            <li><span>Total: </span><span>acá iría el monto total con el envío</span></li>
                        </ul>
                    </footer>
                </article>
            </section>
            <section className='resume__feature'>
                <FiTruck/>
                <article>
                    <header>Envío por correo</header>
                    <footer>El envío es seguro y rápido.</footer>
                </article>
            </section>
            <section className='resume__feature'>
                <FiCreditCard/>
                <article>
                    <header>Método de pago</header>
                    <footer>MERCADOPAGO en todo el país o EFECTIVO solo en CABA.</footer>
                </article>
            </section>
        </section>
    )
}
