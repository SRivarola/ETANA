import React, { useState, useEffect } from 'react';
import './AdminStock.scss';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { FiUpload } from 'react-icons/fi'
import OptionList from '../../components/administrador/OptionList';
import Loader from '../../components/Loader/Loader';

export default function AdminStock() {
    
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [imgProduct, setImgProduct] = useState(null)
    const [stockPrevio, setStockPrevio] = useState()
    const [values, setValues] = useState({
        id: '', talle: '', cantidad: ''
    });

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
            setValues({id: '', talle: '', cantidad: ''})
        } else {
            setValues({
                ...values,
                id: e.target.value
            })
        }
    }
    const handleChangeTalle = (e) => {
        if(e.target.value === 'undefined'){
            setValues({
                ...values,
                talle: ''})
        } else {
            setValues({
                ...values,
                talle: e.target.value
            })
        }
    }
    const handleInputChange = (e) => {
        setValues({
            ...values,
            cantidad: e.target.value})
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if((values.id !== '') &&( values.talle !== '') && (values.cantidad !== '')) {
            //1.= armar la referencia a mi coleccion
            const docRef = doc(db, 'productos', values.id);
            //2.- peticion a esa referencia
            setLoading(true)
            getDoc(docRef)
                .then((doc) => {
                    const refStock = doc.data().stock
                    updateDoc(docRef, {
                        stock: {
                            ...refStock,
                            [values.talle]: refStock[values.talle] + Number(values.cantidad)
                        }
                    });
                    setImgProduct(null);
                    setValues({
                        ...values,
                        cantidad: ''});
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
            })
        }
        if(values.talle){   
            const docRef = doc(db, 'productos', values.id);
            getDoc(docRef)
            .then((doc) => {
                setStockPrevio(doc.data().stock[values.talle])
            })
        }
    }, [values.id, values.talle])
   

    
    return (
        <>
        {
            loading ? 
            <Loader /> :
            <>
                <div className='adminStock'>
                    <div className='titulo'>
                        <h1>Cargar stock</h1>
                    </div>
                    <div className='container container__stock'>
                        <div className='formStock'>
                            <form className='form' onSubmit={handleSubmit}>
                                <select onChange={handleChangeProd}>
                                    <option value='undefined'>Seleccionar producto</option>
                                    <OptionList items={product} />
                                </select>
                                <select onChange={handleChangeTalle}>
                                    <option value='undefined'>Seleccionar talle</option>
                                    <option value='36'>36</option>
                                    <option value='37'>37</option>
                                    <option value='38'>38</option>
                                    <option value='39'>39</option>
                                    <option value='40'>40</option>
                                    <option value='41'>41</option>
                                </select>
                                <input 
                                    className='form-control my-2 cantidadStock'
                                    onChange={handleInputChange}
                                    value={values.cantidad}
                                    type='number'
                                    placeholder='cantidad'
                                    name='cantidad'
                                />
                                <button type='submit'>Cargar <FiUpload/></button>                   
                            </form>
                            
                        </div>
                        {
                            imgProduct &&
                            <div className='imgStock'>
                                <img src={ imgProduct } className='imgStock__img' alt='foto del producto'/>
                                <div className='texto'>
                                    <h3>Stock actual de este producto: 
                                        {
                                            values.talle !== '' &&
                                            <span>{stockPrevio}</span>
                                        }
                                    </h3>
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