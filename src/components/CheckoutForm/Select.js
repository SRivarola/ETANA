import React from 'react'
import { InputGroup, SelectStyled } from './Formulario'

export default function Select({selectOnChange, valido}) {

  return (
    <InputGroup>
      <SelectStyled onChange={selectOnChange} valido={valido}>
          <option value={'undefined'} >Seleccionar provincia</option>
          <option value={[0, 'CABA']}>CABA</option>
          <option value={[560, 'Gran Bs As']}>Gran Buenos Aires</option>
          <option value={[560, 'Provincia de Bs As']}>Provincia de Bs As</option>
          <option value={[560, 'Catamarca']}>Catamarca</option>
          <option value={[560, 'Chaco']}>Chaco</option>
          <option value={[560, 'Chubut']}>Chubut</option>
          <option value={[560, 'Córdoba']}>Córdoba</option>
          <option value={[560, 'Corrientes']}>Corrientes</option>
          <option value={[560, 'Entre Ríos']}>Entre Ríos</option>
          <option value={[560, 'Formosa']}>Formosa</option>
          <option value={[560, 'Jujuy']}>Jujuy</option>
          <option value={[560, 'La Pampa']}>La Pampa</option>
          <option value={[560, 'La Rioja']}>La Rioja</option>
          <option value={[560, 'Mendoza']}>Mendoza</option>
          <option value={[560, 'Misiones']}>Misiones</option>
          <option value={[560, 'Neuquén']}>Neuquén</option>
          <option value={[560, 'Río Negro']}>Río Negro</option>
          <option value={[560, 'Salta']}>Salta</option>
          <option value={[560, 'San Juan']}>San Juan</option>
          <option value={[560, 'San Luis']}>San Luis</option>
          <option value={[560, 'Santa Cruz']}>Santa Cruz</option>
          <option value={[560, 'Santa Fé']}>Santa Fé</option>
          <option value={[560, 'Santiago del Estero']}>Santiago del Estero</option>
          <option value={[560, 'Tierra del Fuego']}>Tierra del Fuego</option>
          <option value={[560, 'Tucumán']}>Tucumán</option>
      </SelectStyled>
    </InputGroup>
  )
}
