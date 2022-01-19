import React from 'react';
import './Loader.scss';

export default function Loader() {
    return (
        <div className='loader'>
            <h1 className='loader-txt'>Cargando...</h1>
            <div className="spinner-border text-primary spiner" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
