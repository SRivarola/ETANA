// function llamadaMercadoPago() {
    //     const itemsToMP = cart.map((prod) => {
    //         return {
    //             title: prod.name,
    //             description: "",
    //             picture_url: prod.img,
    //             category_id: "",
    //             quantity: prod.cantidad,
    //             currency_id: "ARS",
    //             unit_price: prod.price
    //         }
    //     })


    //     const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
    //         method: 'POST',
    //         headers: {
    //             Authorization: "TEST-2540897097355074-122201-79b9ba9d9b1d537f15966a98174f44ef-67353566"
    //         },
    //         body: JSON.stringify({
    //             items: itemsToMP,
    //             back_urls: {
    //                 success: window.location.href,
    //                 failure: window.location.href
    //             }

    //         })
    //     })
    //     const data = await response.json()
    //     window.location.replace(data.init_point)
    // }