import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { FiCreditCard, FiTruck } from 'react-icons/fi'

export default function CheckoutResume() {

    const { totalCompra, costoEnvio, cart, envio } = useContext(CartContext)

    const textoCostoEnvio = (costoEnvio, cart) => {
        if(envio) {
            if(costoEnvio === 0) {
                return 'El envio no tiene costo'
            } else if (costoEnvio === 560) {
                let cantidad = cart.reduce((acc, prod) => acc + costoEnvio * prod.cantidad, 0)
                
                return '$' + cantidad
            } else {
                return 'Debe seleccionar un destino.'
            }
        } else {
            return 'Retira en el local'
        }
    }

    const textoTotalCompra = (costoEnvio, cart, totalCompra) => {
        if(envio) {
            if(costoEnvio === 0) {
                return '$' + totalCompra()
            } else if (costoEnvio === 560) {
                let cantidad = cart.reduce((acc, prod) => acc + costoEnvio * prod.cantidad, 0)
                
                return '$' + (cantidad + totalCompra()) 
            } else {
                return '$' + totalCompra()
            }
        } else {
            return '$' + totalCompra()
        }
    }

    return (
        <section className='Checkout__resume'>
            <section className='resume__summary'>
                <article>
                    <header>
                        <h3>Resumen de compra</h3>
                    </header>
                    <ul>
                        <li><span>Orden de compra: </span><span>{`$${totalCompra()}`}</span></li>
                        <li><span>Costo de envío: </span><span>{textoCostoEnvio(costoEnvio, cart)}</span></li>
                    </ul>
                    <hr/>
                    <footer>
                        <ul>
                            <li><span>Total: </span><span><b>{textoTotalCompra(costoEnvio, cart, totalCompra)}</b></span></li>
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
