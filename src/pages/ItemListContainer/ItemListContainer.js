import React, { useState, useEffect } from 'react';
import './ItemListContainer.scss';
import ItemList from '../../components/ItemList/ItemList';
import Loader from '../../components/Loader/Loader';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase/config';

export default function ItemListContainer() {

    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState([]);

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

    return (
        <>
            <div className='container'>
                <div className='container-titulo'>
                    <h1 className='titulo'>NUESTRA SELECCION DE PRODUCTOS</h1>
                </div>
                {
                    loading
                    ? <Loader />
                    : <section className='itemListContainer'>
                        <ItemList items={product} />
                    </section>
                }
            </div>
        </>
    )
}
