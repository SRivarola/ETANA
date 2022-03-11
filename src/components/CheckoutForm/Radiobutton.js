import React from 'react'
import { InputGroup, Label, InputRadio } from './Formulario'

export default function Radiobutton({estado, onChangeEnvio}) {
  return (
    <InputGroup>
        <InputRadio type="radio" name="envio" value={true} onChange={ onChangeEnvio } checked={ estado.envio === true ? true : false}/>
        <Label>Envio a domicilio</Label>
        <InputRadio type="radio" name="envio" value={false} onChange={ onChangeEnvio } checked={ estado.envio === false ? true : false}/>
        <Label>Retiro por el local</Label>
    </InputGroup>
  )
}
