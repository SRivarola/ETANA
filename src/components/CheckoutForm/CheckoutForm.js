import React, { useContext, useState } from 'react';
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

    const { cart, totalCompra, vaciarCarrito } = useContext(CartContext);
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
        productos: cart,
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
                envio: false
            })
        } else if (e.target.value === 'true') {
            setValues({
                ...values,
                envio: true
            })
        }
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
                unit_price: prod.price
            }
        })

        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
            method: 'POST',
            headers: {
                Authorization: "Bearer TEST-2540897097355074-122201-79b9ba9d9b1d537f15966a98174f44ef-67353566"
            },
            body: JSON.stringify({
                items: itemsToMP,
                back_urls: {
                    success: ("http://localhost:3000/ordercomplete"),
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
        setError({
            ...error,
            provincia: 'true'
        })
    }

    console.log(values, error)

    const handleSubmit = (e) => {
        e.preventDefault()
        
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
                        if(values.envio === true){
                            emailjs.send('service_azx9s5j', 'template_twzekie', values, 'v0lNPVS6GlqJPqBF8')
                                .then(function(response) {
                                    console.log('SUCCESS!', response.status, response.text);
                                }, function(error) {
                                    console.log('FAILED...', error);
                                });
                        } else if (values.envio === false) {
                            emailjs.send('service_azx9s5j', 'template_twzekie', values, 'v0lNPVS6GlqJPqBF8')
                                .then(function(response) {
                                    console.log('SUCCESS!', response.status, response.text);
                                }, function(error) {
                                    console.log('FAILED...', error);
                                });
                        }
                    } else {
                            outOfStock.push(itemInCart)
                        }
                    })
                    if(outOfStock.length === 0) {
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
                                <h4>Complete el formulario</h4>
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
                                  
                                    <Select selectOnChange={handleSelectChange}/>

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
