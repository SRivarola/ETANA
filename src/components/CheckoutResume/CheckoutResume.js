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
                        <li><span>Costo de envio: </span><span>aca iria costo de envio</span></li>
                    </ul>
                    <hr/>
                    <footer>
                        <ul>
                            <li><span>Total: </span><span>aca iria el monto total con el envio</span></li>
                        </ul>
                    </footer>
                </article>
            </section>
            <section className='resume__feature'>
                <FiTruck/>
                <article>
                    <header>Envio por correo</header>
                    <footer>El envio es seguro y rapido.</footer>
                </article>
            </section>
            <section className='resume__feature'>
                <FiCreditCard/>
                <article>
                    <header>Metodo de pago</header>
                    <footer>MERCADOPAGO en todo el pais o EFECTIVO solo en CABA.</footer>
                </article>
            </section>
        </section>
    )
}
