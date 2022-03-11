import React from 'react'
import { InputGroup, LabelTerminos } from './Formulario'

export default function Checkbox({chequeado, onChangeTerminos}) {
  return (
    <InputGroup>
        <input
            type='checkbox'
            id='cbox'
            value='checkbox'
            checked={chequeado}
            onChange={onChangeTerminos}
        />
        <LabelTerminos htmlFor='cbox'>Aceptar
            <button type='button' className='btn-term' data-bs-toggle='modal' data-bs-target='#modalTerm'>
                términos y condiciones.
            </button>
        </LabelTerminos>
    </InputGroup>
  )
}
