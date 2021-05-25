import React from 'react'
import { useHistory } from "react-router-dom";


export default function SignOut() {
    let History=useHistory()
    let handleSignOut=()=>{
        console.log("sign out button is clicked ")
        console.log(localStorage.getItem('token'))
        localStorage.removeItem('token')
        console.log(localStorage.getItem('token'))
        History.push('/')
    }
    return (
        <div>
            <button onClick={handleSignOut}>Sign out</button>
        </div>
    )
}
