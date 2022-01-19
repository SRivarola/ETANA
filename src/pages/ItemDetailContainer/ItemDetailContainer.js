import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import ItemDetail from '../../components/ItemDetail/ItemDetail'
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore/lite';
import Loader from '../../components/Loader/Loader';

export default function ItemDetailContainer() {

    const [loading, setLoading] = useState(false)
    const [detail, setDetail] = useState();
    const { prodId } = useParams()

    useEffect(() => {
        setLoading(true)
        //1.= armar la referencia a mi coleccion
        const docRef = doc(db, 'productos', prodId)
        //2.- peticion a esa referencia
        getDoc(docRef)  
            .then((doc) => {
                const data = {id: doc.id, ...doc.data()}
                setDetail(data)
            })
            .finally( () => {
                setLoading(false)
            } )
    }, [prodId])
    
    return (
        <>
            {
                loading
                ? <Loader/>
                : detail !== undefined && <ItemDetail product={detail}/>
            }
        </>
    )
}