import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export const UserContext = React.createContext();

export const UserContextProvider = ({children}) => {

    const [user, setUser] = useState();
    const [logged, setLogged] = useState(false);

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
            })
            .catch((err) => {
                const errMessage = err.message;
                alert(errMessage)
            })
    }

    const logout = () => {
        signOut(auth)
            .then(()=> {
                alert("Goodbye...");
            })
            .catch ((err)=>{
                alert(err.message);
          })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLogged(true);
            } else {
                setLogged(false);
            }
        })
    },[])

    return (
        <UserContext.Provider value={{
            user, logged, login, logout
        }}>
            {children}
        </UserContext.Provider>
    )
}
