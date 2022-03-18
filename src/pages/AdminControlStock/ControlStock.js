import './ControlStock.scss'
import React, { useState, useEffect } from 'react'
import Loader from '../../components/Loader/Loader';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore/lite';
import StockList from '../../components/Administrador/StockList';

export default function ControlStock() {

  const [loading, setLoading] = useState(false);
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
      {
        loading ? 
        <Loader /> :
        <>
            <div className='adminControl'>
                <div className='titulo'>
                    <h1>Control de stock</h1>
                </div>
            </div>
            <div className='stockList'>
              <StockList items={product} />
            </div>
        </>
      }
    </>
  )
}
