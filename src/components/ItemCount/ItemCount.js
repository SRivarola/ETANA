import React, { useState } from 'react'
import './ItemCount.scss'
import { FiArrowRight, FiShoppingCart} from 'react-icons/fi'

export default function ItemCount({ onAdd, initial, stock, product, quantity, talle }) {
    
    const [count, setCount] = useState(initial);

    function increment() {
        if (stock > count) {
            setCount(count + 1)
        }
    }

    function decrement() {
        if(count > 1) {
            setCount(count - 1)
        }
    }

    return (
        <div className='ItemCount'>
            <h3>Cantidad</h3>
            <div className='ItemCount__buttons'>
                <button 
                    type='button'
                    className='btn_quantity btn_quantity--quit'  
                    onClick={ () => decrement() } 
                    disabled={ count === initial } 
                >
                    <FiArrowRight />
                </button>
                <span>{ count }</span>
                <button 
                    type='button'
                    className='btn_quantity btn_quantity--add'  
                    onClick={ () => increment() } 
                    disabled={ count === stock }
                >
                    <FiArrowRight />
                </button>
            </div>
            <button 
                className='btn' 
                onClick={ () => onAdd(count, product, talle, quantity) } 
            >
                AGREGAR A MI COMPRA<span className='btn-carrito'><FiShoppingCart/></span>
            </button> 
        </div>
    )
}