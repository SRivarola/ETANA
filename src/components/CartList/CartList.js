import './CartList.scss'
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext'
import CartItem from '../CartItem/CartItem';
import { FiTrash2 } from 'react-icons/fi';


export default function CartList() {

    const { cart, vaciarCarrito } = useContext(CartContext);

    return (
        <section>
            <table className='Cart__products-list'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Precio por Unidad</th>
                        <th>Información</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((producto) => <CartItem key={ producto.id + producto.talle} {...producto}/>)
                    }
                </tbody>
            </table>
            <button onClick={ vaciarCarrito } className='btn btn--outline btn--danger'>
                VACIAR CARRITO <FiTrash2 />
            </button>
        </section>
    )
}
