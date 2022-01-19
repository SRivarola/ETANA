import React, { useState, createContext } from "react";
export const CartContext = createContext();


const CartContextProvider = ({children}) => {

    if(!JSON.parse(localStorage.getItem('cart'))){
        localStorage.setItem('cart', JSON.stringify([]))
    }
    const cartInit = JSON.parse(localStorage.getItem('cart'));
    const [cart, setCart] = useState(cartInit);
    

    const addItem = (product, count, isTalle) => {
        if(cart.length > 0) {
            function finderId(item) {
                return (item.id === product.id)
            }
            let idDuplicado = cart.find(finderId)
            function finderTalle(item) {
                return (item.id === product.id && Number(item.talle) === Number(isTalle))
            }
            let talleDuplicado = cart.find(finderTalle)
            if(idDuplicado === undefined){
                setCart([...cart, {id: product.id, model: product.model, name: product.name, price: product.price, img: product.img, imgSlide: product.imgSlide, cantidad: count, talle: isTalle}])
                localStorage.setItem('cart', JSON.stringify([...cart, {id: product.id, model: product.model, name: product.name, price: product.price, img: product.img, imgSlide: product.imgSlide, cantidad: count, talle: isTalle}]))
            } else if (idDuplicado && talleDuplicado === undefined) {
                const idFiltrados = cart.filter(item => item.id !== product.id)
                const talleFiltrados = cart.filter(item => item.id === product.id && item.talle !== isTalle)
                setCart([...idFiltrados, ...talleFiltrados, {id: product.id, model: product.model, name: product.name, price: product.price, img: product.img, imgSlide: product.imgSlide, cantidad: count, talle: isTalle}])
                localStorage.setItem('cart', JSON.stringify([...idFiltrados, ...talleFiltrados, {id: product.id, model: product.model, name: product.name, price: product.price, img: product.img, imgSlide: product.imgSlide, cantidad: count, talle: isTalle}]))
            } else {
                const filtroId = cart.filter(item => item.id !== product.id)
                const filtroTalle = cart.filter(item => item.id === product.id && item.talle !== isTalle)
                talleDuplicado.cantidad += count
                setCart([...filtroId, ...filtroTalle, talleDuplicado])
                localStorage.setItem('cart', JSON.stringify([...filtroId, ...filtroTalle, talleDuplicado]))
            }
        } else {
            setCart([...cart, {id: product.id, model: product.model, name: product.name, price: product.price, img: product.img,imgSlide: product.imgSlide, cantidad: count, talle: isTalle}]);
            localStorage.setItem('cart', JSON.stringify([...cart, {id: product.id, model: product.model, name: product.name, price: product.price, img: product.img, cantidad: count, talle: isTalle}]))
        }
        
    }

    const removerDelCarrito = (id, talle) => {
        let idFiltrado = cart.filter(producto => producto.id !== id)
        let talleFiltrado = cart.filter(prod => (prod.id === id) && (prod.talle !== talle))
        setCart([...idFiltrado, ...talleFiltrado]);
        localStorage.setItem('cart', JSON.stringify([...idFiltrado, ...talleFiltrado]))
    }
    
    const vaciarCarrito = () => {
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([]))
    }

    const totalCompra = () => {
        return cart.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0)
    }

    const cantidadCarrito = () => {
        return cart.reduce((acc, prod) => acc + prod.cantidad, 0)
    } 

    return(
        <CartContext.Provider value={{ 
            cart, 
            addItem,  
            removerDelCarrito, 
            vaciarCarrito,
            totalCompra,
            cantidadCarrito
        }} >
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;
