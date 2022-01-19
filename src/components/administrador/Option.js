import React from 'react'

export default function Option({ id, name }) {
    return (
        <option value={id}>{name}</option>
    )
}
