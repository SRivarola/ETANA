import './Cart.scss'
import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

import CartList from '../../components/CartList/CartList'
import CartResume from '../../components/CartResume/CartResume'
import EmptyCart from '../EmptyCart/EmptyCart'
import Footer from '../../components/Footer/Footer'
import CopyRight from '../../components/CopyRight/CopyRight'

export default function Cart() {

    const { cart, totalCompra } = useContext(CartContext)

    if(!cart.length) {
        return (
            <EmptyCart />
        )
    }
    return (
        <>
            <section className='Cart'>
                <div className='container'>
                    <div className='title'>
                        <h1 className='titulo'>CARRITO DE COMPRAS</h1>
                    </div>
                    <CartList cart={cart}/>
                    <CartResume totalCompra={totalCompra}/>
                </div>
            </section>
            <Footer />
            <CopyRight />
        </>
    )
}
