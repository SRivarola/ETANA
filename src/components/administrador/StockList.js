import React from 'react'
import ItemStock from './ItemStock'

export default function StockList({items}) {
  return (
    <>
        {
            items.map((product) => <ItemStock key={product.id} {...product}/>)
        }
    </>
  )
}
