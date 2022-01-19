import React, { useState } from 'react';
import './AdminProducto.scss';
import { db } from '../../firebase/config'
import { storage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore/lite';
import Loader from '../../components/Loader/Loader';
import { FiUpload } from 'react-icons/fi';

export default function AdminProducto() {
    
    const [loading, setLoading] = useState(false);
    const [imgCero, setImgCero] = useState(null);
    const [imgUno, setImgUno] = useState(null);
    const [imgDos, setImgDos] = useState(null);
    const [values, setValues] = useState({
        nombre: '',
        modelo: '', 
        precio: '', 
        descripcion: '', 
        stock: {36: '', 37: '',38: '', 39: '', 40: '', 41: ''},
        img: ''
    });

    async function handleFileChange(e) {
        const archivo = e.target.files[0];
        const fileRef = ref(storage, `/${archivo.name}`);
        await uploadBytes(fileRef, archivo);
            getDownloadURL(fileRef)
                .then((res) => {
                    setValues({
                        ...values,
                        img: res
                    })
                })
    }

    async function handleFileSlideCeroChange(e) {
        const archivo = e.target.files[0];
        const fileRef = ref(storage, `/${archivo.name}`);
        await uploadBytes(fileRef, archivo);
        getDownloadURL(fileRef)
            .then((res) => {
                setImgCero(res)
                })
    }

    async function handleFileSlideUnoChange(e) {
        const archivo = e.target.files[0];
        const fileRef = ref(storage, `/${archivo.name}`);
        await uploadBytes(fileRef, archivo);
        getDownloadURL(fileRef)
            .then((res) => {
                setImgUno(res)
            })
    }

    async function handleFileSlideDosChange(e) {
        const archivo = e.target.files[0];
        const fileRef = ref(storage, `/${archivo.name}`);
        await uploadBytes(fileRef, archivo);
        getDownloadURL(fileRef)
            .then((res) => {
                setImgDos(res)
            })
    }

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = (e) => {
        setValues({
            ...values,
            modelo: e.target.value
        })
    }

    const handleStockChange = (e) => {
        setValues({
            ...values,
            stock:{
                ...values.stock,
                [e.target.name]: e.target.value
            }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if ((values.nombre !== '')
            && (values.modelo !== '')
            && (values.precio !== '')
            && (values.descripcion !== '')
            && (values.stock[36] !== '')
            && (values.stock[37] !== '')
            && (values.stock[38] !== '')
            && (values.stock[39] !== '')
            && (values.stock[40] !== '')
            && (values.stock[41] !== '')
            && (values.img !== '')
            && (imgCero)
            && (imgUno)
            && (imgDos)) {
            
                const collectionRef = collection(db, 'productos');
                setLoading(true);
                addDoc(collectionRef, {
                    name: values.nombre,
                    price: Number(values.precio),
                    description: values.descripcion,
                    model: values.modelo,
                    img: values.img,
                    imgSlide: {
                        0: imgCero,
                        1: imgUno,
                        2: imgDos
                    },
                    stock: {
                        36: Number(values.stock[36]),
                        37: Number(values.stock[37]),
                        38: Number(values.stock[38]),
                        39: Number(values.stock[39]),
                        40: Number(values.stock[40]),
                        41: Number(values.stock[41]),
                    }
                })
                    .finally(() => {
                        setLoading(false);
                    });
                setValues({
                    nombre: '',
                    modelo: '',
                    precio: '',
                    descripcion: '',
                    stock: { 36: '', 37: '', 38: '', 39: '', 40: '', 41: '' },
                    img: ''
                });
                setImgCero(null);
                setImgUno(null);
                setImgDos(null);
                alert('Producto cargado');

        } else {
            alert('faltan argar DATOS');
        }
    }
            

    return (
        <>
        {
            loading ? 
            <Loader /> :
            <>
                <div className='adminProducto'>
                    <div className='titulo'>
                        <h1>Cargar producto</h1>
                    </div>
                    <div className='container container__producto'>
                        <div className='formulario-producto'>
                            <form className='form' onSubmit={handleSubmit}>
                                <div className='encabezado'>
                                    <h4>Datos:</h4>
                                </div>
                                <div className='datos'>
                                    <input 
                                        className='form-control my-2'
                                        onChange={handleInputChange}
                                        value={values.nombre}
                                        type='text'
                                        placeholder='Nombre del producto'
                                        name='nombre'
                                    />
                                    <select onChange={handleSelectChange}>
                                        <option value='undefined'>Seleccionar modelo</option>
                                        <option value='botineta'>Botineta</option>
                                        <option value='media'>Media Caña</option>
                                        <option value='alta'>Caña Alta</option>
                                    </select>
                                    <input 
                                        className='form-control my-2'
                                        onChange={handleInputChange}
                                        value={values.precio}
                                        type='number'
                                        placeholder='Precio'
                                        name='precio'
                                    />
                                </div>
                                <textarea 
                                    className='form-control my-2'
                                    onChange={handleInputChange}
                                    value={values.descripcion}
                                    type='text'
                                    placeholder='Descripcion'
                                    name='descripcion'
                                />
                                <div className="mb-3 archivo">
                                    <label htmlFor="fotoPrincipal"><h4>Foto principal:</h4></label>
                                    <span className="input-group-text" id="inputGroup-sizing-default">Seleccionar archivo</span>
                                    <input 
                                        onChange={ handleFileChange }
                                        className="form-control" 
                                        type="file" 
                                        id="formFile"
                                        name='fotoPrincipal'
                                    />
                                </div>
                                <div className="mb-3 archivo">
                                    <label htmlFor="slideFotos"><h4>Slide de fotos:</h4></label>
                                    <span className="input-group-text" id="inputGroup-sizing-default">Seleccionar archivo</span>
                                    <input 
                                        onChange={ handleFileSlideCeroChange }
                                        className="form-control" 
                                        type="file" 
                                        id="formFile"
                                        name='slideFotos'
                                    />
                                </div>
                                <div className="mb-3 archivo">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Seleccionar archivo</span>
                                    <input 
                                        onChange={ handleFileSlideUnoChange }
                                        className="form-control" 
                                        type="file" 
                                        id="formFile"
                                        name='slideFotos'
                                    />
                                </div>
                                <div className="mb-3 archivo">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Seleccionar archivo</span>
                                    <input 
                                        onChange={ handleFileSlideDosChange }
                                        className="form-control" 
                                        type="file" 
                                        id="formFile"
                                        name='slideFotos'
                                    />
                                </div>
                                <h4>Stock:</h4>
                                <div className="input-group mb-3 stock">
                                    <span className="input-group-text" id="inputGroup-sizing-default">36</span>
                                    <input 
                                        onChange={ handleStockChange }
                                        name='36'
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Sizing example input" 
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                </div>
                                <div className="input-group mb-3 stock">
                                    <span className="input-group-text" id="inputGroup-sizing-default">37</span>
                                    <input 
                                        onChange={ handleStockChange }
                                        name='37'
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Sizing example input" 
                                        aria-describedby="inputGroup-sizing-default"
                                        />
                                </div>
                                <div className="input-group mb-3 stock">
                                    <span className="input-group-text" id="inputGroup-sizing-default">38</span>
                                    <input
                                        onChange={ handleStockChange }
                                        name='38' 
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Sizing example input" 
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                </div>
                                <div className="input-group mb-3 stock">
                                    <span className="input-group-text" id="inputGroup-sizing-default">39</span>
                                    <input
                                        onChange={ handleStockChange }
                                        name='39' 
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Sizing example input" 
                                        aria-describedby="inputGroup-sizing-default"
                                        />
                                </div>
                                <div className="input-group mb-3 stock">
                                    <span className="input-group-text" id="inputGroup-sizing-default">40</span>
                                    <input
                                        onChange={ handleStockChange }
                                        name='40' 
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Sizing example input" 
                                        aria-describedby="inputGroup-sizing-default"/>
                                </div>
                                <div className="input-group mb-3 stock">
                                    <span className="input-group-text" id="inputGroup-sizing-default">41</span>
                                    <input
                                        onChange={ handleStockChange }
                                        name='41' 
                                        type="text" 
                                        className="form-control" 
                                        aria-label="Sizing example input" 
                                        aria-describedby="inputGroup-sizing-default"
                                    />
                                </div>
                                <button type='submit'>Cargar <FiUpload/></button>                   
                            </form>
                        </div>
                    </div>
                </div>
            </>
        }
        </>
    )
}