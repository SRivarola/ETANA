import './AdminEntregas.scss'
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, getDoc, doc, addDoc, deleteDoc } from 'firebase/firestore/lite';
import { FiUpload } from 'react-icons/fi'
import Loader from '../../components/Loader/Loader';
import DatosItems from '../../components/Administrador/DatosItems';

const AdminEntregas = () => {

    const [loading, setLoading] = useState(false);
    const [hayData, setHayData] = useState(false)
    const [ordenes, setOrdenes] = useState([]);
    const [datos, setDatos] = useState({
        id: '',
        nombre: '',
        email: '',
        tel: '',
        direccion: '',
        cp: ''
    })
    const [datosItems, setDatosItems] = useState([])

    useEffect(() => {
        setLoading(true)
        //1.= armar la referencia a mi coleccion
        const productosRef = collection(db, 'ordenes');
        //2.- peticion a esa referencia
        getDocs(productosRef)  
            .then((resp) => {
                const orders = resp.docs.map((doc) => ({id: doc.id, ...doc.data()}))
                setOrdenes(orders)
            })
            .finally( () => {
                setLoading(false)
            } )
    }, [])

    const handleChangeProd = (e) => {
        if(e.target.value === 'undefined'){
            setDatos({id: '', nombre: '', email: '', tel: '', direccion: '', cp: '', img: '', nombrebota: '', talle: ''});
            setDatosItems([])
            setHayData(false)
        } else {
            //1.= armar la referencia a mi coleccion
            const docRef = doc(db, 'ordenes', e.target.value);
             //2.- peticion a esa referencia
            getDoc(docRef)
                .then((doc) => {
                    setHayData(true)
                    const refData = doc.data()
                    setDatos({
                        id: e.target.value,
                        nombre: refData.buyer.nombre,
                        email: refData.buyer.mail,
                        tel: refData.buyer.tel,
                        direccion: refData.buyer.direccion,
                        cp: refData.buyer.cp
                    })
                    setDatosItems(refData.item)         
                })
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(hayData) {
            const allData = { comprador: datos, items: datosItems}
            
            const entregadosRef = collection(db, 'entregados');
            addDoc(entregadosRef, allData)
            deleteDoc(doc(db, 'ordenes', datos.id))
                .then(() => {
                    setDatos({id: '', nombre: '', email: '', tel: '', direccion: '', cp: '', img: '', nombrebota: '', talle: ''});
                    setDatosItems([])
                    setHayData(false)
                })
        } else {
            alert('No selecciono ninguna orden')
        }
    }

    return (
        <>
        {
            loading ? 
            <Loader /> :
            <>
                <div className='adminEntregas'>
                    <div className='titulo'>
                        <h1>Administrar entregas</h1>
                    </div>
                    <div className='container container__entregas'>
                        <div className='formEntregas'>
                            <form className='form' onSubmit={handleSubmit}>
                                <select onChange={handleChangeProd}>
                                    <option value='undefined'>Seleccionar orden</option>
                                    {
                                        ordenes.map((item) => <option key={item.id} value={item.id}>{item.id}</option>)
                                    }
                                </select>
                                <button type='submit'>Entregado <FiUpload/></button>                   
                            </form>
                        </div>
                        {
                            hayData &&
                            <div className='infoOrden'>
                                <div className='comprador'>
                                    <h1>Datos del comprador</h1>
                                    <h3>Nombre: {datos.nombre}</h3>
                                    <h3>Direccion: {datos.direccion}</h3>
                                    <h3>CP: {datos.cp}</h3>
                                    <h3>Email: {datos.email}</h3>
                                    <h3>Telefono: {datos.tel}</h3>
                                </div>
                                <div className='producto'>
                                    <h1>Datos de la compra</h1>
                                    {
                                        datosItems.map((item) => <DatosItems key={item.id} {...item}/> )
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </>
        }
        </>
    );
}

export default AdminEntregas;
