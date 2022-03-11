import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { CartContext } from '../../context/CartContext';
import { db } from '../../firebase/config';
import { collection, addDoc, Timestamp, writeBatch, getDocs, query, where, documentId } from 'firebase/firestore/lite';
import Loader from '../Loader/Loader';
import Terminos from '../ModalTerminos/Terminos';
import { Formik } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser'
import Input from './Input';

const initialValues = ({
    nombre: '',
    apellido: '',
    email: '',
    emailConfirm: '',
    tel: '',
    direccion: '',
    cp: '',
    provincia: '',
});

const schema = Yup.object().shape({
    nombre: Yup
            .string()
            .required('Se debe ingresar un nombre')
            .min(2, 'El nombre es demasiado corto')
            .max(20, 'El nombre es demasiado largo'),
    apellido: Yup
            .string()
            .required('Se debe ingresar un apellido')
            .min(2, 'El apellido es demasiado corto')
            .max(20, 'El apellido es demasiado largo'),
    email: Yup
            .string()
            .required('Se debe ingresar un email')
            .email('Email inválido'),
    emailConfirm: Yup
            .string()
            .required('Se debe confirmar email')
            .email('Invalid email')
            .when("email", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("email")],
                    "Se debe cargar mismo email!"
                )
            }),
    tel: Yup
            .string()
            .required('Se debe ingresar un numero celular')
            .min(10, 'El número es demasiado corto')
            .max(10, 'El número es demasiado largo'),
    direccion: Yup
            .string()
            .required('Se debe ingresar una dirección')
            .min(6, 'La dirección es demasiado corta')
            .max(30, 'La dirección es demasiado larga'),
    cp: Yup
            .string()
            .required('Se debe ingresar un codigo postal')
            .min(2, 'El código postal es demasiado corto')
            .max(6, 'El código postal es demasiado largo'),
});

export default function CheckoutForm() {

    const { cart, totalCompra, vaciarCarrito } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const [datosEmail, setDatosEmail] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        cp: '',
        provincia: '',
        telefono: '',
        productos: cart,
    })
    const [productos, setProductos] = useState({})
    const navigate = useNavigate();

    console.log(totalCompra)

    // useEffect(() => {
    //     for (let index = 0; index < cart.length; index++) {
    //         const element = cart[index];
    //         const nombre = 'producto' + index
    //         console.log(nombre)
    //         console.log(element.name)
    //         setProductos({
    //             ...productos,
    //             [nombre]: element.name,
    //         })
    //     }
    // }, [])

    console.log(productos)

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
    
    const handleSubmit = (values) => {
       
        console.log(values)
        setDatosEmail({
            nombre: values.nombre,
            apellido: values.apellido,
            direccion: values.direccion,
            cp: values.cp,
            provincia: values.provincia,
            telefono: values.tel,
            productos: cart,
        })
        console.log(datosEmail)

        
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
                    emailjs.send('service_ajbh50b', 'template_twzekie', values, 'v0lNPVS6GlqJPqBF8')
                        .then(function(response) {
                            console.log('SUCCESS!', response.status, response.text);
                        }, function(error) {
                            console.log('FAILED...', error);
                        });
                } else {
                        outOfStock.push(itemInCart)
                    }
                })
                if(outOfStock.length === 0) {
                    addDoc(ordersRef, order)
                        .then((res) => {
                            sessionStorage.setItem('orderId', JSON.stringify(res.id))
                            batch.commit()
                            // llamadaMercadoPago();
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
                        <Formik
                            initialValues={initialValues}
                            validationSchema={schema}
                            onSubmit={handleSubmit}
                        >
                            {(formik) => (
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='form-group'>
                                        <input 
                                            className='form-control my-2'
                                            onChange={formik.handleChange}
                                            value={formik.values.nombre}
                                            type='text'
                                            placeholder='Nombre'
                                            name='nombre'
                                        />
                                        {
                                            (formik.errors.nombre) && (formik.touched.nombre) &&
                                            <div className="alert alert-danger d-flex align-items-center" role="alert" >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                </svg>
                                                <div>
                                                    {formik.errors.nombre}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className='form-group'>
                                        <input 
                                            className='form-control my-2'
                                            onChange={formik.handleChange}
                                            value={formik.values.apellido}
                                            type='text'
                                            placeholder='Apellido'
                                            name='apellido'
                                        />
                                            {
                                                (formik.errors.apellido) && (formik.touched.apellido) &&
                                                <div className="alert alert-danger d-flex align-items-center" role="alert" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                    </svg>
                                                    <div>
                                                        {formik.errors.apellido}
                                                    </div>
                                                </div>
                                            }
                                    </div>
                                    <div className='form-group'>
                                        <input 
                                            className='form-control my-2'
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                            type='text'
                                            placeholder='Email'
                                            name='email'
                                        />
                                        {
                                            (formik.errors.email) && (formik.touched.email) &&
                                            <div className="alert alert-danger d-flex align-items-center" role="alert" >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                </svg>
                                                <div>
                                                    {formik.errors.email}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className='form-group'>
                                        <input 
                                            className='form-control my-2'
                                            onChange={formik.handleChange}
                                            value={formik.values.emailConfirm}
                                            type='text'
                                            placeholder='Confirmar email'
                                            name='emailConfirm'
                                        />
                                        {
                                            (formik.errors.emailConfirm) && (formik.touched.emailConfirm) &&
                                            <div className="alert alert-danger d-flex align-items-center" role="alert" >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                </svg>
                                                <div>
                                                    {formik.errors.emailConfirm}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className='form-group'>
                                        <input 
                                            className='form-control my-2'
                                            onChange={formik.handleChange}
                                            value={formik.values.tel}
                                            type='number'
                                            placeholder='Celular ej:(1150001111)'
                                            name='tel'
                                        />
                                            {
                                                (formik.errors.tel) && (formik.touched.tel) &&
                                                <div className="alert alert-danger d-flex align-items-center" role="alert" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                    </svg>
                                                    <div>
                                                        {formik.errors.tel}
                                                    </div>
                                                </div>
                                            }
                                    </div>
                                    <div className='form-group'>
                                        <input 
                                            className='form-control my-2'
                                            onChange={formik.handleChange}
                                            value={formik.values.direccion}
                                            type='text'
                                            placeholder='Domicilio'
                                            name='direccion'
                                        />
                                        {
                                            (formik.errors.direccion) && (formik.touched.direccion) &&
                                            <div className="alert alert-danger d-flex align-items-center" role="alert" >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                </svg>
                                                <div>
                                                    {formik.errors.direccion}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className='form-group'>
                                        <input 
                                            className='form-control my-2'
                                            onChange={formik.handleChange}
                                            value={formik.values.cp}
                                            type='text'
                                            placeholder='Código Postal'
                                            name='cp'
                                        />
                                            {
                                                (formik.errors.cp) && (formik.touched.cp) &&
                                                <div className="alert alert-danger d-flex align-items-center" role="alert" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                    </svg>
                                                    <div>
                                                        {formik.errors.cp}
                                                    </div>
                                                </div>
                                            }
                                    </div>
                                    <div className='form-group'>
                                        <select className='form-control my-2 ' onChange={formik.handleChange}>
                                            <option value={500} name='undefined'>Seleccionar provincia</option>
                                            <option value={500} name='caba'>CABA</option>
                                            <option value={500}>Gran Bs As Norte</option>
                                            <option value={500}>Gran Bs As Sur</option>
                                            <option value={500}>Gran Bs As Oeste</option>
                                            <option value={1000}>Provincia de Bs As</option>
                                            <option value={1000}>Catamarca</option>
                                            <option value={1000}>Chaco</option>
                                            <option value={1000}>Chubut</option>
                                            <option value={1000}>Córdoba</option>
                                            <option value={1000}>Corrientes</option>
                                            <option value={1000}>Entre Ríos</option>
                                            <option value={1000}>Formosa</option>
                                            <option value={1000}>Jujuy</option>
                                            <option value={1000}>La Pampa</option>
                                            <option value={1000}>La Rioja</option>
                                            <option value={1000}>Mendoza</option>
                                            <option value={1000}>Misiones</option>
                                            <option value={1000}>Neuquén</option>
                                            <option value={1000}>Río Negro</option>
                                            <option value={1000}>Salta</option>
                                            <option value={1000}>San Juan</option>
                                            <option value={1000}>San Luis</option>
                                            <option value={1000}>Santa Cruz</option>
                                            <option value={1000}>Santa Fé</option>
                                            <option value={1000}>Santiago del Estero</option>
                                            <option value={1000}>Tierra del Fuego</option>
                                            <option value={1000}>Tucumán</option>
                                        </select>
                                            {
                                                (formik.errors.cp) && (formik.touched.cp) &&
                                                <div className="alert alert-danger d-flex align-items-center" role="alert" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                    </svg>
                                                    <div>
                                                        {formik.errors.cp}
                                                    </div>
                                                </div>
                                            }
                                    </div>
                                    <div className='form-group termycond'>
                                        <input
                                            type='checkbox'
                                            id='cbox'
                                            value='checkbox'
                                        />
                                        <label for='cbox'>Aceptar  
                                            <button type='button' className='btn-term' data-bs-toggle='modal' data-bs-target='#modalTerm'>
                                                términos y condiciones.
                                            </button>
                                        </label>
                                    </div>
                                    <button type='submit' className='btn-enviar'>Enviar <FiSend/></button>
                                </form>
                            )}
                        </Formik>
                        </section>
                    </>
                }
            </div>
            <Terminos/>
        </>
    )
}