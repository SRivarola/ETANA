import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './ModalLogin.scss'

const ModalLogin = () => {

    const { login } = useContext(UserContext);
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const handleOnClick = () =>{
        login(email, password);
        setEmail('');
        setPassword('');
    }

    return (
        <div className="modal fade" id="modalLogin" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">LOGIN</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="email" 
                                name = "email"
                                value={email} 
                                onChange={(e)=> setEmail(e.target.value)} />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="password" 
                                name = "password"
                                value={password} 
                                onChange={(e)=> setPassword(e.target.value) }/>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary btn-login" onClick ={ handleOnClick } data-bs-dismiss="modal" aria-label="Close">Login</button>
                </div>
            </div>
        </div>
    )
}

export default ModalLogin