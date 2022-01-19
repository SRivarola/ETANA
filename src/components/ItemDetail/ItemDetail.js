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

export default function ItemDetail({ product }) {
    
    const [quantity, setQuantity] = useState();
    const [talle, setTalle] = useState()
    const [hayStock, setHayStock] = useState(false);
    const [inStock, setInStock] = useState();
    const [ imagesSlider, setImagesSlider ] = useState([])
    const [adding, setAdding] = useState(false)
    const navigate = useNavigate();

    const {addItem} = useContext(CartContext);
    const imagenes = product.imgSlide;

    const handlerSetStock = (e) => {
        var opcion = e.target.value;
        if (product.stock[opcion] > 0){
            setHayStock(true);
            setTalle(opcion);
            setInStock(product.stock[opcion]);
        } else {
            setHayStock(false);
            setInStock(product.stock[opcion]);
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
			return <button type="btn" className="btn btn--loadedToCart">Loaded to cart <FiCheck/></button>
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
					<h2>$ {product.price.toLocaleString()}</h2>
					<div>
						<h3>Descripción</h3>
						<p>{product.description}</p>
					</div>
                    {
                        !quantity &&
                        <div className="ItemDetail__info__talle">
                            <select onClick={ handlerSetStock } id='selTalles' className="form-select" name='talles' aria-label="Default select example">
                                <option value='selected'>Elige un talle</option>
                                <option value="36">36</option>
                                <option value="37">37</option>
                                <option value="38">38</option>
                                <option value="39">39</option>
                                <option value="40">40</option>
                                <option value="41">41</option>
                            </select>
                            {
                                (inStock) && (inStock !== 0) && (quantity === undefined)? 
                                <p className='enStock'>Stock:{inStock}</p>
                                :null
                            }
                            {
                                inStock === 0
                                ? <p className='enStock'><span><FiAlertOctagon /></span>No hay Stock!</p>
                                : null
                            }
                        </div>
                    }
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
		</section>
                  
    )
}
