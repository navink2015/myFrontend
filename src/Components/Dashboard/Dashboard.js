import React,{useState} from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import SignIn from "../Authentication/SignIn";
import SignOut from "../Authentication/SignOut";
import SignUp from "../Authentication/SignUp";
import Profile from "./Profile";
// import '.././index.css'

export default function Dashboard() {
 
  return (
    <div className="text-center">
      <h1>IOT</h1>

    

      <Router>
        <Link to="/signIn">
          {" "}
          <button>Sign in</button>{" "}
        </Link>

        <Link to="/signUp">
          {" "}
          <button>Sign Up</button>{" "}
        </Link>
        <SignOut/>


        <Switch>
          <Route exact path="/">
            <h1>Something</h1>
          </Route>

          <Route path="/signIn">
            <SignIn  />
          </Route>

          <Route path="/signUp">
            <SignUp />
          </Route>
          
          <Route pate="/dash">
            <Profile />
          </Route>
         
        </Switch>
      </Router>
    </div>
  );
}
