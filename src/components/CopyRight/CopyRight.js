import './CopyRight.scss'
import React from 'react'
import logo from '../../assets/img/logoSR.png'

export default function CopyRight() {
  return (
    <div className='copyRight'>
        <div className='container'>
            <section className='misDatos'>
              <p className='primer'>CREADO POR</p>
              <img src={ logo } alt='logo'/>
              <p>srivarola@gmail.com</p>
            </section>
        </div>
    </div>
  )
}
