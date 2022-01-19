import './CartItem.scss'
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { FiTrash2 } from 'react-icons/fi';

export default function CartItem({id, name, price, img, imgSlide, cantidad, talle}) {

    const { removerDelCarrito } = useContext(CartContext);

    return (
        <tr className='Cart__product'>
            <td className='trash' onClick={ () => removerDelCarrito(id, talle, cantidad) }><FiTrash2/></td>
            <td className='price'>${price.toLocaleString()}</td>
            <td className='info'>
                <div className='info__grid'>
                    {
                        img 
                        ? <img src={img} alt='foto del producto'/>
                        : <img src={imgSlide[0]} alt='foto del producto'/>
                    }
                    <div>
                        <h4>{name}</h4>
                        <h3>Talle: {talle}</h3>
                    </div>
                </div>
            </td>
            <td className='quantity'>
                {cantidad}
            </td>
            <td className='subtotal'>$ {(price * cantidad).toLocaleString()}</td>
        </tr>

        // <div className='product'>
        //     <div className='img-container'>
        //         <img src={ img } alt='foto del producto'/>
        //     </div>
        //     <div className='txt-container'>
        //         <h2 className='name'>{name}</h2>
        //         <div className='mod-talle'>
        //             <p className='modelo'>{stringModel()}</p>
        //             <p className='talle'>Talle: ({talle})</p>
        //         </div>
        //         <div className='pre-cant'>
        //             <p className='precio'>Precio: ${price.toLocaleString()}</p>
        //             <p className='cantidad'>Cantidad: {cantidad}</p>
        //         </div>
        //         <p className='precioTotal'>Total: ${(price * cantidad).toLocaleString()}</p>
        //         <button onClick={ () => { removerDelCarrito(id, talle, cantidad) } }>
        //             ELIMINAR PRODUCTO
        //         </button>
        //     </div>
        // </div>
    )
}
