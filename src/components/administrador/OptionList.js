import React from 'react';
import Option from './Option'


export default function OptionList({ items }) {

    return (
        <>
            {
               items.map((product) => <Option key={product.id} { ...product }/>)   
            }
        </>
    )
}