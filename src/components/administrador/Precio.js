import React, { useState, useEffect } from 'react';
import './Precio.scss';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import OptionList from '../../components/Administrador/OptionList';
import Loader from '../../components/Loader/Loader';
import { FiUpload } from 'react-icons/fi'

export default function AdminPrecio() {
    
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [values, setValues] = useState({id: null, precio: ''});
    const [precioPrevio, setPrecioPrevio] = useState()
    const [imgProduct, setImgProduct] = useState(null)

    useEffect(() => {
        setLoading(true)
        //1.= armar la referencia a mi coleccion
        const productosRef = collection(db, 'productos');
        //2.- peticion a esa referencia
        getDocs(productosRef)  
            .then((resp) => {
                const prods = resp.docs.map((doc) => ({id: doc.id, ...doc.data()}))
                setProduct(prods)
            })
            .finally( () => {
                setLoading(false)
            } )
    }, [])

    const handleChangeProd = (e) => {
        if(e.target.value === 'undefined'){
            setImgProduct(null);
            setValues({id: '', precio: ''}) 
        } else {
            setValues({
                ...values,
                id: e.target.value
            })
        }
    }

    const handleInputChange = (e) => {
        setValues({
            ...values,
            precio: e.target.value})
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if((values.id !== '') && (values.precio !== '')) {
            //1.= armar la referencia a mi coleccion
            const docRef = doc(db, 'productos', values.id);
            //2.- peticion a esa referencia
            setLoading(true)
            getDoc(docRef)
                .then((doc) => {
                    updateDoc(docRef, {
                        price: Number(values.precio)
                    })
                    setImgProduct(null);
                    setValues({id: '', precio: ''})
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            alert('faltan completar campos')
        }
    }

    useEffect(() => {
        if(values.id){   
            const docRef = doc(db, 'productos', values.id);
            getDoc(docRef)
            .then((doc) => {
                if(doc.data().img) {
                    setImgProduct(doc.data().img)
                } else {
                    setImgProduct(doc.data().imgSlide[0])
                }
                setPrecioPrevio(doc.data().price)
            })
        }
    }, [values.id])

    return (
        <>
        {
            loading ? 
            <Loader /> :
            <>
                <div className='adminPrecio'>
                    <div className='titulo'>
                        <h1>Modificar precio</h1>
                    </div>
                    <div className='subTitulo'>
                        <h4>Colocar solo números, sin puntos ni comas.</h4>
                    </div>
                    <div className='container container__precio'>
                        <div className='formPrecio'>
                            <form className='form' onSubmit={handleSubmit}>
                                <select onChange={handleChangeProd}>
                                    <option value='undefined'>Seleccionar producto</option>
                                    <OptionList items={product} />
                                </select>
                                <input 
                                    className='form-control my-2 '
                                    onChange={handleInputChange}
                                    value={values.precio}
                                    type='number'
                                    placeholder='nuevo precio'
                                    name='precio'
                                />
                                <button type='submit'>Cargar <FiUpload/></button>                   
                            </form>
                            
                        </div>
                        {
                            imgProduct &&
                            <div className='imgStock'>
                                <img src={ imgProduct } className='imgStock__img' alt='foto del producto'/>
                                <div className='texto'>
                                    <h3>Precio actual: <span>$</span><span>{Number(precioPrevio).toLocaleString()}</span></h3>
                                </div>
                            </div>
                        }
                    </div>
                </div>
           
            </>
        }
        </>
    )
}