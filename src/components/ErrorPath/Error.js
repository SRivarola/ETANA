import React from 'react';
import './Error.scss'
import { FiAlertTriangle } from 'react-icons/fi'

export default function Error() {
    return (
        <div className='error'>
            <h1>
                <FiAlertTriangle/> Error 404!
            </h1>
            <h3>
                Not Found!
            </h3>
        </div>
    )
}
