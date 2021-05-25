import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  let History=useHistory()
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordToogle,setPasswordToggle]=useState(true)
  function changeHandler(e) {
    var inputName = e.target.name;
    var inputValue = e.target.value;
    if (inputName === "name") {
      // console.log(name)
      if (inputValue === "") {
        setNameError("The name is empty");
      } else {
        setName(inputValue);
        setNameError("");
      }
    }
    console.log(inputValue);
    if (inputName === "phone") {
      console.log(inputValue.length);
      if (inputValue === "" || !Number(inputValue)) {
        setPhoneError("Mobile Number is not valid");
      } else {
        setPhone(inputValue);
        setPhoneError("");
      }
    }
  }
  var HandleSubmit = (e) => {
    e.preventDefault()
    console.log("Submit hitted");
    console.log(name)
    console.log(phone.length)
    if(name===""){
      console.log("data is empty")
      setNameError("Name is required")
    }else if(phone===""){
      setNameError("Phone number is required")
    }
    else if(email===""){
      setNameError("Email is required")
    }else if(password===""){
      setNameError("password is Required")
    }else if(phone.length<5){
      setNameError("Number length should be length greater than 5")
    }
    else{
    axios
      .post("http://localhost:4000/signUp", {
        Name: name,
        Phone: phone,
        Email: email,
        Password: password,
      })
      .then(function (response) {
        console.log(response);
        if(response.data.message==="User is created"){
          // console.log("hello")
          History.push('/signIn')
        }
        else {
          setNameError(response.data.message)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
   
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <h3  className="text-danger"> {nameError}</h3>
      <p className="text-danger">{phoneError}</p>
      <form onSubmit={HandleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={changeHandler}
        ></input>
        <input
          type="text"
          placeholder="Mobie Number"
          name="phone"
          onChange={changeHandler}
        ></input>
        <input
          type="text"
          placeholder="Email id"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <div className="d-flex align-items-center">
        <input className="col-11"
          type={passwordToogle?"password":"text"}
          placeholder="Password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <input className="col-1" 
        onClick={()=>{
          setPasswordToggle(!passwordToogle)
        }} 
        type="checkbox"></input>
        </div>
        <input type="submit"></input>
      </form>
    </div>
  );
}
