import React from 'react';
import './ItemList.scss'
import Item from '../Item/Item';


export default function ItemList({ items }) {

    return (
        <div className='ItemList'>
            {
               items.map((product) => <Item key={product.id} { ...product }/>)   
            }
        </div>
    )
}
