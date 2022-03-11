import React from 'react';

const DatosItems = ({ name, talle, img, cantidad }) => {
    return (
        <div className='item'>
            <div className='datos'>
                <h3>Nombre: {name}</h3>
                <h3>{`Talle: ${talle} - Cantidad: ${cantidad}`}</h3>
            </div>
            <div className='imagen'>
                <img src={img} alt='foto del producto'/>
            </div> 
        </div>
    );
}

export default DatosItems;
