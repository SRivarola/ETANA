import React from 'react'

import { InputGroup, InputStyled, AlertError, IconoValidacion, IconoError } from './Formulario';

export default function Input({funcion, valido, estado, cambiarEstado, condiciones, valor, inputOnChange, inputType, inputPlaceholder, inputName, textError}) {
  
  const validacion = () => {
    if(condiciones) {
      if(condiciones.test(valor)) {
        cambiarEstado({
          ...estado,
          [inputName]: 'true'
        })
      } else {
        cambiarEstado({
          ...estado,
          [inputName]: 'false'
        })
      }
    }
    if(funcion){
      funcion();
    }
  }
 
  
  
  return (
    <InputGroup >
      <InputStyled
          onChange={inputOnChange}
          type={inputType}
          placeholder={inputPlaceholder}
          name={inputName}
          value={valor}
          onKeyUp={validacion}
          onBlur={validacion}
          valido={valido}
      />
      <IconoValidacion valido={valido}/>
      <IconoError valido={valido}/>
      {/* <FiXCircle /> */}
      <AlertError valido={valido}>{textError}</AlertError>
    </InputGroup>
  )
}