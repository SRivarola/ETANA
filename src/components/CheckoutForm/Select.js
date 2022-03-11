import React from 'react'
import { InputGroup, SelectStyled } from './Formulario'

export default function Select({selectOnChange}) {
  return (
    <InputGroup>
      <SelectStyled onChange={selectOnChange}>
          <option value={'undefined'} >Seleccionar provincia</option>
          <option value={[500, 'CABA']}>CABA</option>
          <option value={[500, 'Gran Bs As Norte']}>Gran Bs As Norte</option>
          <option value={[500, 'Gran Bs As Sur']}>Gran Bs As Sur</option>
          <option value={[500, 'Gran Bs As Oeste']}>Gran Bs As Oeste</option>
          <option value={[1000, 'Provincia de Bs As']}>Provincia de Bs As</option>
          <option value={[1000, 'Catamarca']}>Catamarca</option>
          <option value={[1000, 'Chaco']}>Chaco</option>
          <option value={[1000, 'Chubut']}>Chubut</option>
          <option value={[1000, 'Córdoba']}>Córdoba</option>
          <option value={[1000, 'Corrientes']}>Corrientes</option>
          <option value={[1000, 'Entre Ríos']}>Entre Ríos</option>
          <option value={[1000, 'Formosa']}>Formosa</option>
          <option value={[1000, 'Jujuy']}>Jujuy</option>
          <option value={[1000, 'La Pampa']}>La Pampa</option>
          <option value={[1000, 'La Rioja']}>La Rioja</option>
          <option value={[1000, 'Mendoza']}>Mendoza</option>
          <option value={[1000, 'Misiones']}>Misiones</option>
          <option value={[1000, 'Neuquén']}>Neuquén</option>
          <option value={[1000, 'Río Negro']}>Río Negro</option>
          <option value={[1000, 'Salta']}>Salta</option>
          <option value={[1000, 'San Juan']}>San Juan</option>
          <option value={[1000, 'San Luis']}>San Luis</option>
          <option value={[1000, 'Santa Cruz']}>Santa Cruz</option>
          <option value={[1000, 'Santa Fé']}>Santa Fé</option>
          <option value={[1000, 'Santiago del Estero']}>Santiago del Estero</option>
          <option value={[1000, 'Tierra del Fuego']}>Tierra del Fuego</option>
          <option value={[1000, 'Tucumán']}>Tucumán</option>
      </SelectStyled>
    </InputGroup>
  )
}
