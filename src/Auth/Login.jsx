import React from 'react'
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth}  from  '../firebaseAuth'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
  

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const handleOnChange=()=>{
        const {name, value} = event.target
        setUser((values)=> ({...values, [name]:value }))
    }
        console.log(user);
        const handleSignIn=(event)=>{
            event.preventDefault()
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential)
        // const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
    const handleSignOut=()=>{
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            // Sign-out successful.
          })
          .catch((error) => {
            // An error happened.
          });
    }
  return (
    <div>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleOnChange}
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleOnChange}
        />
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default Login