import React from 'react';
import { auth, provider } from '../config/auth'; // Ensure correct path
import { signInWithPopup } from 'firebase/auth'; // Correct import

function Signin() {
    async function HandleAuth() {
        try {
            let data = await signInWithPopup(auth, provider);
            console.log(data); // Handle the signed-in user's data
        } catch (error) {
            console.error("Error during sign-in:", error); // Handle errors
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <button onClick={HandleAuth} className="bg-slate-400 mt-5 p-5">
                Google Login
            </button>
        </div>
    );
}

export default Signin;
