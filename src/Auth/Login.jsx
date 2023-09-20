import React from "react";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

const Login = ({ setLoginModalOpen, setToken, setUsername }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const notify = (text) => toast(text);
  const handleOnChange = () => {
    const { name, value } = event.target;
    setUser((values) => ({ ...values, [name]: value }));
    setError("");
  };
  const handleSignIn = (event) => {
    event.preventDefault();
    setIsPending(true);
    if(!user.email && !user.password){
        notify("Email and password cannot be empty")
    }else if(!user.email || !user.password){
        notify("Please fill all fields")
    } else{
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        if (userCredential.user) {
          sessionStorage.setItem("token", userCredential.user.accessToken);
          setToken(userCredential.user.accessToken);
          sessionStorage.setItem("username", userCredential.user.email);
          setUsername(userCredential.user.email);
          notify("Login successful!");
          setTimeout(() => {
            setLoginModalOpen(false);
          }, 2000);
          setIsPending(false);
        }
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        notify(errorCode);
        setError(errorCode);
        setIsPending(false);
      });
    }
  };

  return (
    <div className="w-full ">
      <ToastContainer />
      <h2 className="text-center font-mono font-semibold text-lg sm:text-xl md:text-2xl">
        {" "}
        Login to Continue
      </h2>
      <form
        onSubmit={handleSignIn}
        className="w-full mt-4 sm:mt-5 md:mt-6 flex flex-col items-center gap-2 sm:gap-3 md:gap-4"
      >
        <input
          type="email"
          name="email"
          placeholder="enter email"
          value={user.email}
          onChange={handleOnChange}
          className={`md:w-64 rounded border px-2 py-[2px] md:text-lg drop-shadow-lg ${
            error && "border-red-600"
          }`}
        />
        <input
          type="password"
          name="password"
          placeholder="enter password"
          value={user.password}
          onChange={handleOnChange}
          className={`md:w-64 rounded border px-2 py-[2px] md:text-lg drop-shadow-lg ${
            error && "border-red-600"
          }`}
        />
        <button
          disabled={isPending}
          className="md: mt-3 rounded border border-slate-500 px-8 md:px-12 py-1 md:py-1 md:text-lg font-medium active:bg-slate-300 hover:bg-slate-500 hover:text-white hover:border-none"
        >
          {isPending ? (
            <div className="flex px-3">
              {" "}
              <ClipLoader size={20} />
            </div>
          ) : (
            <> Sign In</>
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
