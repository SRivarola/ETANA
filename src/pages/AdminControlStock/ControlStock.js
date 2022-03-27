import './ControlStock.scss'
import React, { useState, useEffect } from 'react'
import Loader from '../../components/Loader/Loader';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore/lite';
import StockList from '../../components/Administrador/StockList';

export default function ControlStock() {

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [stockTotal, setStockTotal] = useState()

  useEffect(() => {
    setLoading(true)
    //1.= armar la referencia a mi coleccion
    const productosRef = collection(db, 'productos');
    //2.- peticion a esa referencia
    getDocs(productosRef)  
        .then((resp) => {
            const prods = resp.docs.map((doc) => ({id: doc.id, ...doc.data()}))
            setProduct(prods)
            setStockTotal(prods[0].stock[36] + prods[0].stock[37] + prods[0].stock[38] + prods[0].stock[39] + prods[0].stock[40] + prods[0].stock[41] + prods[1].stock[36] + prods[1].stock[37] + prods[1].stock[38] + prods[1].stock[39] + prods[1].stock[40] + prods[1].stock[41] + prods[2].stock[36] + prods[2].stock[37] + prods[2].stock[38] + prods[2].stock[39] + prods[2].stock[40] + prods[2].stock[41] + prods[3].stock[36] + prods[3].stock[37] + prods[3].stock[38] + prods[3].stock[39] + prods[3].stock[40] + prods[3].stock[41] + prods[4].stock[36] + prods[4].stock[37] + prods[4].stock[38] + prods[4].stock[39] + prods[4].stock[40] + prods[4].stock[41])
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
              <div className='totalStock'>
                <h3>Total:
                  <span>
                  {
                    stockTotal &&
                    stockTotal
                  }
                  </span>
                </h3>
              </div>
        </>
      }
    </>
  )
}
