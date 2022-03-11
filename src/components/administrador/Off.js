import React, { useState, useEffect } from 'react';
import './Off.scss';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import OptionList from '../../components/Administrador/OptionList';
import { FiUpload } from 'react-icons/fi'

export default function Off() {
    
    const [product, setProduct] = useState([]);
    const [values, setValues] = useState({id: null, disc: ''});
    const [descPrevio, setDescPrevio] = useState()
    const [imgProduct, setImgProduct] = useState(null)

    useEffect(() => {
        //1.= armar la referencia a mi coleccion
        const productosRef = collection(db, 'productos');
        //2.- peticion a esa referencia
        getDocs(productosRef)  
            .then((resp) => {
                const prods = resp.docs.map((doc) => ({id: doc.id, ...doc.data()}))
                setProduct(prods)
            })
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
        if(e.target.value === 'null') {
            setValues({
                ...values,
                disc: null})
        } else {
            setValues({
                ...values,
                disc: Number(e.target.value)})
        }
        console.log(values)
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if((values.id !== '') && (values.precio !== '')) {
            //1.= armar la referencia a mi coleccion
            const docRef = doc(db, 'productos', values.id);
            //2.- peticion a esa referencia
            getDoc(docRef)
                .then((doc) => {
                    updateDoc(docRef, {
                        disc: values.disc
                    })
                    setImgProduct(null);
                    setValues({id: '', precio: ''})
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
                setDescPrevio(doc.data().disc)
            })
        }
    }, [values.id])

    return (
            <>
                <div className='adminOff'>
                    <div className='titulo'>
                        <h1>% OFF</h1>
                    </div>
                    <div className='subTitulo'>
                        <h4>
                            <p>Si no hay descuento escribir: null.</p>
                            <p>Si hay descuento escribir solo números.</p>
                        </h4>
                    </div>
                    <div className='container container__off'>
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
                                    type='text'
                                    placeholder='Descuento'
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
                                    <h3>Descuento: <span>%</span>
                                    {
                                        descPrevio ===  null ?
                                        <span>0</span>
                                        :
                                        <span>{descPrevio}</span>
                                    }
                                    </h3>
                                </div>
                            </div>
                        }
                    </div>
                </div>
           
            </>
    )
}