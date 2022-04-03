import React from 'react'
import './Footer.scss'
import { Link, useNavigate } from 'react-router-dom';
import { AiFillInstagram } from "react-icons/ai";
import { HiMail } from "react-icons/hi";
import Terminos from '../ModalTerminos/Terminos';
import ModalGuia from '../ModalGuia/ModalGuia';

export default function Footer() {

  const navigate = useNavigate();

  const handleRedirect = () => {
    window.open('https://instagram.com/etanabaires?utm_medium=copy_link', '_blank')
  }

  return (
    <>
      <section className='footer'>
        <div className='container'>
          <div className='navegacion'>
            <h3>NAVEGACIÓN</h3>
            <button type='button' className='btn-guia' data-bs-toggle='modal' data-bs-target='#modalGuia'>
              Guía de Talles
            </button>
            <button className='btn-dev' onClick={ () => navigate(`/devolucion`) }>
              Políticas de devolución
            </button>
            <button type='button' className='btn-term' data-bs-toggle='modal' data-bs-target='#modalTerm'>
              Términos y condiciones
            </button>
          </div>
          <div className='contacto'>
            <h3>CONTACTANOS</h3>
            <div>
              <h5><HiMail /><span>etanabaires@gmail.com</span></h5>
            </div>
            <div>
              <h5 onClick={handleRedirect} className='instagram'><AiFillInstagram /><span>@etanabaires</span></h5>
            </div>
          </div>
        </div>
      </section>
      <Terminos/>
      <ModalGuia />
    </>
  )
}