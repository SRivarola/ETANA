import './Checkout.scss'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm'
import CheckoutResume from '../../components/CheckoutResume/CheckoutResume'


export default function Checkout() {

    const { cart } = useContext(CartContext);
    const navigate = useNavigate()

    if(cart.length === 0) {
        return (
            () => navigate('/')
        )
    }

    return (
        <section className='Checkout'>
            <div className='container'>
                <div className='title'>
                    <h1 className='titulo'>CHECKOUT</h1>
                </div>
            </div>
            <div className='container grid'>
                <CheckoutForm />
                <CheckoutResume />
            </div>
        </section>
    )
}
