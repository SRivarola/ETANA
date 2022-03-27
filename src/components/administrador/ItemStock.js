import './ItemStock.scss'
import React from 'react'

export default function ItemStock({name, img, stock}) {
  return (
    <div className='itemStock container'>
        <div className='gridStock'>
            <div className='titulo'>
                <h1>{name}</h1>
            </div>
            <div className='fotoBota'>
                <img src={img} alt='foto producto'/>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>TALLES</th>
                            <th>36</th>
                            <th>37</th>
                            <th>38</th>
                            <th>39</th>
                            <th>40</th>
                            <th>41</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>STOCK</th>
                            <th>{stock[36]}</th>
                            <th>{stock[37]}</th>
                            <th>{stock[38]}</th>
                            <th>{stock[39]}</th>
                            <th>{stock[40]}</th>
                            <th>{stock[41]}</th>
                            <th>{stock[36] + stock[37] + stock[38] + stock[39] + stock[40] + stock[41]}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
