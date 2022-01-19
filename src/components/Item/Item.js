import React from 'react';
import './Item.scss'
import { Link, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';

export default function Item({ id, name, price, img, model, video}) {

    const navigate = useNavigate();

    return (
        <div className='Item'>
            <h3 className='nombre'><Link className='nombre' to={`/prod/${id}`}>{name}</Link></h3>
            <Link to={`/prod/${id}`}>
                {
                    img 
                    ? <img src={ img } alt='foto del producto' />
                    : <ReactPlayer 
                        url={ video } 
                        className='video' 
                        playing
                        loop
                    />
                }
            </Link>
            <header>
                <h3 className='price'>Precio: ${ price.toLocaleString() }</h3>
                <div className='verDetalle'>
                    <button className='btn-verDetalle' onClick={ () => navigate(`/prod/${id}`) }>VER DETALLE</button>
                </div>
            </header>
            {/* <button onClick={ () => navigate(`/prod/${id}`) }>VER DETALLE</button> */}
        </div>
        // <div className="Item" >
		// 	{
		// 	!isInCart(id)
		// 		?
		// 			stock >= 1
		// 			? <button>Add to cart <FiShoppingCart/></button>
		// 			: <button>No stock <FiAlertOctagon/></button>
		// 	}
		// 	<Link to={`/product/${id}`}><img src={main_image} alt={name} loading="lazy" /></Link>
		// 	<header>
		// 		<h3>$ {price}</h3>
		// 		<div>
		// 			<h4>{category.name}</h4>
		// 			<h3><Link to={`/product/${id}`}>{name}</Link></h3>
		// 		</div>
		// 	</header>
		// </div>
    )
}
