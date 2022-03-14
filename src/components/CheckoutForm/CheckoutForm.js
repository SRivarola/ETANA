import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FiSend } from 'react-icons/fi';
import { CartContext } from '../../context/CartContext';
import { db } from '../../firebase/config';
import { collection, addDoc, Timestamp, writeBatch, getDocs, query, where, documentId } from 'firebase/firestore/lite';
import Loader from '../Loader/Loader';
import Terminos from '../ModalTerminos/Terminos';
import emailjs from '@emailjs/browser'
import Input from './Input';
import Select from './Select';
import Alerts from './Alerts';
import Checkbox from './Checkbox';
import { Formulario, BotonSubmit, ContenedorBoton } from './Formulario';
import Radiobutton from './Radiobutton';

export default function CheckoutForm() {

    const { cart, totalCompra, vaciarCarrito, handleCostoEnvio, handleRetiroEnvio } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        email: '',
        confirmEmail: '',
        cp: '',
        provincia: '',
        tel: '',
        nombreProducto: cart[0].name,
        fotoProducto: cart[0].img,
        talleProducto: cart[0].talle,
        precioProducto: cart[0].price,
        fotoProductoFrente: cart[0].imgSlide[0],
        costoEnvio: '',
        envio: true,
        terminos: false
    })
    const [error, setError] = useState({
        nombre: null,
        apellido: null,
        direccion: null,
        email: null,
        confirmEmail: null,
        cp: null,
        provincia: null,
        tel: null,
    });
    const [alertForm, setAlertForm] = useState(null);
    const navigate = useNavigate();
    const condiciones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{3,20}$/, // Letras y espacios, pueden llevar acentos.
        apellido: /^[a-zA-ZÀ-ÿ\s]{2,20}$/,
        direccion: /^[a-zA-Z0-9]{2,30}$/, // Letras, numeros
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        cp: /^.{3,8}$/, // 3 a 8 digitos.
        tel: /^\d{7,14}$/ // 7 a 14 numeros.
    }

    const validarEmail = () => {
        if (error.email === 'true') {
            if(values.email !== values.confirmEmail) {
                setError({
                    ...error,
                    confirmEmail: 'false'
                })
            } else {
                setError({
                    ...error,
                    confirmEmail: 'true'
                })
            }
        }
    }

    const handleChangeTerminos = (e) => {
        setValues({
            ...values,
            terminos: e.target.checked
        })
    }

    const handleChangeEnvio = (e) => {
        if(e.target.value === 'false'){
            setValues({
                ...values,
                envio: false,
                costoEnvio: 0
            })
        } else if (e.target.value === 'true') {
            setValues({
                ...values,
                envio: true
            })
        }
        handleRetiroEnvio(e)
    }

    const llamadaMercadoPago = async () => {
        
        const itemsToMP = cart.map((prod) => {
            return {
                title: prod.name,
                description: "",
                picture_url: prod.img,
                category_id: "",
                quantity: prod.cantidad,
                currency_id: "ARS",
                unit_price: prod.price + values.costoEnvio
            }
        })

        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                Authorization: process.env.REACT_APP_MERCADOPAGO_ACCESSTOKEN
            },
            body: JSON.stringify({
                items: itemsToMP,
                back_urls: {
                    success: ("http://etanabaires.com"),
                    failure: window.location.href
                }

            })
        })
        const data = await response.json()
        vaciarCarrito();
        window.location.replace(data.init_point)
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSelectChange = (e) => {
        const valor = e.target.value;
        const arrValue = valor.split(',');
        setValues({
            ...values,
            costoEnvio: Number(arrValue[0]),
            provincia: arrValue[1]
        })
        if(valor === 'undefined'){
            setError({
                ...error,
                provincia: 'false'
            })
        } else {
            setError({
                ...error,
                provincia: 'true'
            })
        }
        handleCostoEnvio(e)
    }

    useEffect(() => {
        if(cart.length > 1) {
            setValues({
                ...values,
                nombreProducto2: cart[1].name,
                fotoProducto2: cart[1].img,
                talleProducto2: cart[1].talle,
                precioProducto2: cart[1].price,
                fotoProductoFrente2: cart[1].imgSlide[0],
            })
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if(values.envio === false) {
            setValues({
                ...values,
                costoEnvio: 0
            })
        }

        if(
            error.nombre === 'true' &&
            error.apellido === 'true' &&
            error.direccion === 'true' &&
            error.email === 'true' &&
            error.confirmEmail === 'true' &&
            error.cp === 'true' &&
            error.provincia === 'true' &&
            error.tel === 'true' &&
            values.terminos === true
        ){
            setAlertForm(false)
            const order = {
                buyer: {
                    nombre: values.nombre + ' ' + values.apellido,
                    direccion: values.direccion,
                    cp: values.cp,
                    provincia: values.provincia,
                    tel: values.tel,
                    mail: values.email,
                },
                item: cart,
                total: totalCompra(),
                date: Timestamp.fromDate( new Date() )
            }
            
            
            const batch = writeBatch(db);
            const ordersRef = collection(db, 'ordenes');
            const productosRef = collection(db, 'productos');
            const q = query(productosRef, where(documentId(), 'in', cart.map(el => el.id)))
            const outOfStock = [];
            
            setLoading(true)
            getDocs(q)
            .then((res) => {
                res.docs.forEach((doc) => {
                    const itemInCart = cart.find((prod) => prod.id === doc.id)
                    const refStock = doc.data().stock;
                    
                    if(doc.data().stock[itemInCart.talle] >= itemInCart.cantidad) {
                        batch.update(doc.ref, {
                            stock: { 
                                ...refStock,
                                [itemInCart.talle]: doc.data().stock[itemInCart.talle] - itemInCart.cantidad
                            }
                        })
                    } else {
                        outOfStock.push(itemInCart)
                    }
                })
                if(outOfStock.length === 0) {
                        if(values.envio === true){
                            if(cart.length === 1) {
                                emailjs.send('service_azx9s5j', 'template_ko7348m', values, 'BoA6Av32WkkcAeA9d')
                                    .then(function(response) {
                                        console.log('SUCCESS!', response.status, response.text);
                                    }, function(error) {
                                        console.log('FAILED...', error);
                                    });
                            } else if(cart.length === 2) {
                                emailjs.send('service_4ugs4bt', 'template_2qf5tjm', values, 'YXR48jLbjnfWOEwK_')
                                    .then(function(response) {
                                        console.log('SUCCESS!', response.status, response.text);
                                    }, function(error) {
                                        console.log('FAILED...', error);
                                    });
                            } else if(cart.length > 2) {
                                emailjs.send('service_rk9j69p', 'template_7b5scrd', values, 'cObqNkEMPW5b1JQEz')
                                .then(function(response) {
                                    console.log('SUCCESS!', response.status, response.text);
                                }, function(error) {
                                    console.log('FAILED...', error);
                                });
                            }
                        } else if (values.envio === false) {
                            if(cart.length === 1) {
                                emailjs.send('service_azx9s5j', 'template_tleowf4', values, 'BoA6Av32WkkcAeA9d')
                                    .then(function(response) {
                                        console.log('SUCCESS!', response.status, response.text);
                                    }, function(error) {
                                        console.log('FAILED...', error);
                                    });
                            } else if(cart.length === 2) {
                                emailjs.send('service_4ugs4bt', 'template_f4xsokh', values, 'YXR48jLbjnfWOEwK_')
                                    .then(function(response) {
                                        console.log('SUCCESS!', response.status, response.text);
                                    }, function(error) {
                                        console.log('FAILED...', error);
                                    });
                            } else if(cart.length > 2) {
                                emailjs.send('service_rk9j69p', 'template_z92ieqd', values, 'cObqNkEMPW5b1JQEz')
                                    .then(function(response) {
                                        console.log('SUCCESS!', response.status, response.text);
                                    }, function(error) {
                                        console.log('FAILED...', error);
                                    });
                            }
                        }
                        addDoc(ordersRef, order)
                            .then((res) => {
                                sessionStorage.setItem('orderId', JSON.stringify(res.id))
                                batch.commit()
                                llamadaMercadoPago();
                            })
                            .finally(() => {
                                setLoading(false)
                            })
                    } else {
                        alert('No hay stock de los siguientes productos: ' + outOfStock.map(el => el.name).join(', '))
                        navigate('/cart');
                    }
                })
           
        }
    }
    
    if(loading) {
        return <Loader />
    }
    
    return (
        <>
            <div className='checkout'>
                {
                    <>
                        <section className='Checkout__form'>
                            <header>
                                <h3>Detalles de compra</h3>
                                <h4>Complete el formulario:</h4>
                            </header>
                                <Formulario onSubmit={handleSubmit}>
                                    <Input 
                                        inputOnChange={handleChange} 
                                        valor={values.nombre} 
                                        inputType='text' 
                                        inputPlaceholder='Nombre' 
                                        inputName='nombre' 
                                        textError={'Debe completar el NOMBRE correctamente'}
                                        estado={error}
                                        cambiarEstado={setError}
                                        condiciones={condiciones.nombre}
                                        valido={error.nombre}
                                    /> 

                                    <Input 
                                        inputOnChange={handleChange} 
                                        inputType='text' 
                                        inputPlaceholder='Apellido' 
                                        inputName='apellido' 
                                        textError={'Debe completar el APELLIDO correctamente'}
                                        valor={values.apellido}
                                        estado={error}
                                        cambiarEstado={setError}
                                        condiciones={condiciones.apellido}
                                        valido={error.apellido}
                                    />

                                    <Input 
                                        inputOnChange={handleChange} 
                                        inputType='email' 
                                        inputPlaceholder='Email' 
                                        inputName='email' 
                                        textError={'Debe completar el EMAIL correctamente'}
                                        valor={values.email}
                                        estado={error}
                                        cambiarEstado={setError}
                                        condiciones={condiciones.email}
                                        valido={error.email}
                                    />

                                    <Input 
                                        inputOnChange={handleChange} 
                                        inputType='email' 
                                        inputPlaceholder='Confirmar email' 
                                        inputName='confirmEmail' 
                                        textError={'El correo de confirmación es incorrecto'}
                                        valor={values.confirmEmail}
                                        estado={error}
                                        cambiarEstado={setError}
                                        funcion={validarEmail}
                                        valido={error.confirmEmail}
                                    />
                                   
                                    <Input 
                                        inputOnChange={handleChange} 
                                        inputType='text' 
                                        inputPlaceholder='Celular ej:(1150001122)' 
                                        inputName='tel' 
                                        textError={'Debe completar el NUMERO correctamente'}
                                        valor={values.tel}
                                        estado={error}
                                        cambiarEstado={setError}
                                        condiciones={condiciones.tel}
                                        valido={error.tel}
                                    />
                                  
                                    <Input 
                                        inputOnChange={handleChange} 
                                        inputType='text' 
                                        inputPlaceholder='Domicilio' 
                                        inputName='direccion' 
                                        textError={'Debe completar la DIRECCIÓN correctamente'}
                                        valor={values.domicilio}
                                        estado={error}
                                        cambiarEstado={setError}
                                        condiciones={condiciones.direccion}
                                        valido={error.direccion}
                                    />
                                   
                                    <Input 
                                        inputOnChange={handleChange} 
                                        inputType='text' 
                                        inputPlaceholder='Código Postal' 
                                        inputName='cp' 
                                        textError={'Debe completar el CÓDIGO POSTAL correctamente'}
                                        valor={values.cp}
                                        estado={error}
                                        cambiarEstado={setError}
                                        condiciones={condiciones.cp}
                                        valido={error.cp}
                                    />
                                  
                                    <Select selectOnChange={handleSelectChange} valido={error.provincia}/>

                                    <Radiobutton 
                                        estado={values}
                                        onChangeEnvio={ handleChangeEnvio }
                                    />
                                  
                                    <Checkbox 
                                        chequeado={values.terminos}
                                        onChangeTerminos={ handleChangeTerminos }
                                    />

                                    {
                                        alertForm && <Alerts />
                                    }
                                    
                                    <ContenedorBoton>
                                        <BotonSubmit type='submit' className='btn-enviar'>Enviar <FiSend/></BotonSubmit>
                                    </ContenedorBoton>
                                </Formulario>
                        </section>
                    </>
                }
            </div>
            <Terminos/>
        </>
    )
}
