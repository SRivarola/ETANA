import React, { useState, useEffect } from 'react';
import './AdminEliminar.scss';
import { db } from '../../firebase/config';
import { collection, getDocs, getDoc, doc, deleteDoc } from 'firebase/firestore/lite';
import OptionList from '../../components/administrador/OptionList';
import Loader from '../../components/Loader/Loader';
import { FiCheckCircle } from 'react-icons/fi';

export default function AdminEliminar() {
    
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [values, setValues] = useState('');
    const [imgProduct, setImgProduct] = useState()
    const [alert, setAlert] = useState(false);
    const [eliminado, setEliminado] = useState(false)

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
        setValues(e.target.value)
    }
    
    const handleClick = () => {
        if(values !== ''){
            setAlert(true)
        }
    }

    const handleCancelar = () => {
        setAlert(false)
    }

    const handleAceptar = () => {
        setEliminado(false)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(values !== ''){
            deleteDoc(doc(db, "productos", values))
                .then(() => {
                    setAlert(false)
                    setEliminado(true)
                    setValues('')
                })
        }
    }

    useEffect(() => {
        if(values !== '' && values !== 'undefined'){   
            const docRef = doc(db, 'productos', values);
            getDoc(docRef)
            .then((doc) => {
                if(doc.data().img) {
                    setImgProduct(doc.data().img)
                } else {
                    setImgProduct(doc.data().imgSlide[0])
                }
            })
        } else {
            setImgProduct(null)
        }
    }, [values])

    return (
        <>
        {
            loading ? 
            <Loader /> :
            <>
                <div className='adminEliminar'>
                    <div className='titulo'>
                        <h1>Eliminar Producto</h1>
                    </div>
                    <div className='container__eliminar'>
                        <div className='formulario-eliminar'>
                            <form onSubmit={handleSubmit}>
                                {
                                    !eliminado &&
                                    <div className='info'>
                                        <select onChange={handleChangeProd}>
                                            <option value=''>Seleccionar producto</option>
                                            <OptionList items={product} />
                                        </select>
                                        <button type='button' onClick={ handleClick }>Eliminar</button>  
                                        <div className='imgProduct'>
                                            {
                                                imgProduct && <img src={ imgProduct } alt='foto del producto'/>
                                            }
                                        </div>
                                    </div>
                                }
                                {
                                    alert &&
                                    <div className='alert'>
                                        <h4>¿Está seguro que desea eliminar este producto?</h4>
                                        <button className='btn-eliminar' type='submit'>Eliminar</button>
                                        <button className='btn-cancelar' type='button' onClick={ handleCancelar }>Cancelar</button>
                                    </div>
                                }
                                {
                                    eliminado &&
                                    <div className='eliminado'>
                                        <h3>El Producto fue eliminado correctamente.<FiCheckCircle/></h3>
                                        <div className='texto-boton'>
                                            <h4>¿Desea eliminar otro producto?</h4>
                                            <button onClick={ handleAceptar } type='button' className='btn-aceptar'>Aceptar</button>
                                        </div>
                                         
                                    </div>
                                }             
                            </form>
                            
                        </div>
                    </div>
                </div>
            </>
        }
        </>
    )
}