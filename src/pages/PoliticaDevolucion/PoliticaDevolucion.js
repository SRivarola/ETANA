import React from 'react'
import './PoliticaDevolucion.scss'
import Footer from '../../components/Footer/Footer'

export default function PoliticaDevolucion() {
  return (
    <>
        <div className='container politicas'>
            <p>
                <h4>Políticas de Devolución</h4>
                <h5>Politicas de cambios/devoluciones de ETANA Buenos Aires:</h5>
                <span>
                    1- Se realizarán cambios únicamente dentro de los 30 (treinta) días de efectuada la compra.
                </span>
                <span>
                    2- ETANA Buenos Aires realiza un estricto control de calidad al momento de recibir mercadería y enviar/entregar sus productos, por ende sabe reconocer con facilidad posibles fallas de origen.
                </span>
                <span>
                    3- Los gastos implicados en la logística por cambio de productos o talles correrán por cuenta de quien compra.  
                </span>
                <span>
                    4- No se realizarán devoluciones de dinero en ninguno de los casos. 
                </span>
                <span>
                    El equipo de ETANA Buenos Aires se encuentra a disposición por cualquier inquietud.
                </span>
            </p>
        </div>
        <Footer />
    </>
  )
}
