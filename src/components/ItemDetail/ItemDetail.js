import React, { useState, useContext, useEffect } from 'react';
import './ItemDetail.scss'
import ItemCount from '../ItemCount/ItemCount';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { FiArrowLeft, FiAlertOctagon, FiCheck } from 'react-icons/fi'
import { Navigation, Virtual } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import 'swiper/swiper.scss'
import 'swiper/modules/navigation/navigation.scss'
import 'swiper/modules/virtual/virtual.scss'
import ReactPlayer from 'react-player';
import ModalGuia from '../ModalGuia/ModalGuia';

export default function ItemDetail({ product }) {
    
    const [quantity, setQuantity] = useState();
    const [talle, setTalle] = useState()
    const [hayStock, setHayStock] = useState(false);
    const [inStock, setInStock] = useState();
    const [imagesSlider, setImagesSlider] = useState([])
    const [desc, setDesc] = useState([])
    const [adding, setAdding] = useState(false)
    const navigate = useNavigate();

    const {addItem} = useContext(CartContext);
    const imagenes = product.imgSlide;
    const descripcion = product.description

    const handlerSetStock = (e) => {
        if (product.stock[e.target.value] > 0){
            setHayStock(true);
            setTalle(e.target.value);
            setInStock(product.stock[e.target.value]);
        } else {
            setHayStock(false);
            setInStock(product.stock[e.target.value]);
        }
    }

    const onAdd = (count, product, talle) => {
        setQuantity(count)
        setAdding(true)
        setTimeout(
            () => addItem(product, count, talle), 2000
        );
        setTimeout(
            () => setAdding(false), 2000
        );
        
    }

    const isAddingToCart = (adding) => {
		if (adding) {
			return <button type="btn" className="btn btn--loadedToCart">CARGANDO <FiCheck/></button>
		} else {
			return <ItemCount key={ 'agregarAlCarrito' } initial={1} stock={ inStock } onAdd={ onAdd } product={ product } quantity={ quantity } talle={ talle }/>
		}
	}

    useEffect(() => {
		try {
            setImagesSlider(Object.values(imagenes))
		} catch (error){
			console.log(error)
		}
	}, [imagenes])

    useEffect(() => {
		try {
            setDesc(Object.values(descripcion))
		} catch (error){
			console.log(error)
		}
	}, [descripcion])

    return (
        <section className="ItemDetail" >
            <div className='btn-volver'>
                <button onClick={() => navigate(-1)} className="btn btn--back btn--outline"><FiArrowLeft/>VOLVER</button>
            </div>
			<div className="container">
				<div className="ItemDetail__slider">
					<Swiper
						modules={[Virtual, Navigation]}
						navigation
						spaceBetween={50}
						slidesPerView={1}
						virtual
					>
                        {
                            product.img
                            ?   <SwiperSlide>{<img src={product.img} alt='foto del producto'/>}</SwiperSlide>
                            :   <SwiperSlide>{<ReactPlayer 
                                                url={product.video} 
                                                className='video'
                                                playing
                                                loop
                                            />}
                                </SwiperSlide>
                        }
						
						{imagesSlider.map((img, index) => (
							<SwiperSlide
								key={index}
								virtualIndex={index}
							>
								{<img src={img} alt='foto del producto'/>}
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div className="info">
                    <div className='nombre'>
                        <h1>{product.name}</h1>
                    </div>
                    {
                        product.disc 
                        ?
                        <h2>$ {((product.price) - (product.price * product.disc / 100)).toLocaleString() }</h2>
                        :
                        <h2>$ {product.price.toLocaleString()}</h2>
                    }
					<div>
						<h3>Descripción</h3>
                            <ul>
                                {
                                    desc &&
                                    desc.map((e, i) => (
                                        <li key={i}>{e}</li>
                                    ))
                                }
                            </ul>
					</div>
                    {
                        !quantity &&
                        <div className="ItemDetail__info__talle">
                                <p>Elige un talle:</p>
                                <fieldset onClick={ handlerSetStock }>
                                    <label>
                                        36<input type="radio" name="color" value="36"/>
                                    </label>
                                    <label>
                                        37<input type="radio" name="color" value="37"/>
                                    </label>
                                    <label>
                                        38<input type="radio" name="color" value="38"/>
                                    </label>
                                    <label>
                                        39<input type="radio" name="color" value="39"/>
                                    </label>
                                    <label>
                                        40<input type="radio" name="color" value="40"/>
                                    </label>
                                    <label>
                                        41<input type="radio" name="color" value="41"/>
                                    </label>
                                </fieldset>
                        
                            {
                                (inStock) && (inStock !== 0) && (quantity === undefined)? 
                                <p className='enStock'>Stock:{inStock}</p>
                                :null
                            }
                            {
                                inStock === 0
                                ? <p className='enStock'><span><FiAlertOctagon /></span>Sin stock!</p>
                                : null
                            }
                        </div>
                    }
                    <button type='button' className='btn-guia' data-bs-toggle='modal' data-bs-target='#modalGuia'>
                        Guía de Talles
                    </button>
                    {
                        hayStock && quantity === undefined && 
                        <div className='ItemDetail__info__itemcount'>
                            {
                                isAddingToCart(adding) 
                            }
                        </div>
                    }
                    {
                        adding &&  isAddingToCart(adding)
                    }
                    {
                        !adding && quantity >= 1 && <button className='btnGoCart' onClick={ () => navigate('/cart') } >IR AL CARRITO</button>
                    }
				</div>
			</div>
            <ModalGuia/>
		</section>
                  
    )
}
