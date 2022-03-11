import React from 'react';
import './Item.scss'
import { Link, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';

export default function Item({ id, name, price, img, video, disc}) {

    const navigate = useNavigate();

    // function discount() {
    //     price - d
    // }

    return (
        <div className='Item'>
            {
                disc &&
                <div className='descuento'>
                    <h3 className='txtDesc'>
                        <span>{disc}%</span>
                        <span>OFF</span>
                    </h3>
                </div>
            }
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
                {
                    disc 
                    ?
                    <h3 className='price'><span>$ {price.toLocaleString()}</span> $ {((price) - (price * disc / 100)).toLocaleString()}</h3>
                    :
                    <h3 className='price'>$ { price.toLocaleString() }</h3>
                }
                <div className='verDetalle'>
                    <button className='btn-verDetalle' onClick={ () => navigate(`/prod/${id}`) }>VER DETALLE</button>
                </div>
            </header>
        </div>
    )
}
