import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jwt-simple";
import { useHistory } from "react-router-dom";

export default function Profile() {

  let History = useHistory()
  var encodedAuth = localStorage.getItem('token');
  let decodeAuth = jwt.decode(encodedAuth, "ss")
  let data = decodeAuth.profileDetails

  //  const [data, setData] = useState({})
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")
  const [linkedIn, setLinkedIn] = useState("")
  const [githuab, setGitHub] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {

    axios({
      method: "POST",
      url: "http://localhost:4000/profile",
      headers: { authentication: encodedAuth },
      // data:{message:responsetoken}
    }).then(response => {
      // console.log(response)
      let responseData = response.data.updateUserData
      console.log(responseData)
      setFirstName(responseData.name)
      setLastName(responseData.lastName)
      setAge(responseData.age)
      setAddress(responseData.address)
      setLinkedIn(responseData.linkedInId)
      setGitHub(responseData.gitHubId)
      console.log(responseData)
      console.log("use Effect response")
    })

    //  return () => {
    //    cleanup
    //  }
  }, [])


  // console.log(encodedAuth)
  var handleProfile = () => {
    console.log("profile button clicked");
    // console.log(localStorage.getItem('token'))

    console.log(encodedAuth)
    // console.log(props.auth);
    if (encodedAuth == null) {
      History.push('/signIn')
    } else {
      //   console.log("is something ");
      //   var token = jwt.encode(decode, "ss");
      axios({
        method: "POST",
        url: "http://localhost:4000/profile",
        headers: { authentication: encodedAuth },
      })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err.message);
          if (err.message === "Request failed with status code 401") {
            //   console.log("error")
            History.push('/signIn')
          }
        });
    }
  };

  let objects = { firstName, lastName, age, linkedIn, address, githuab }
  var handleInput = (e) => {
    let input = e.target.name
    let inputValue = e.target.value
    console.log(inputValue)
    console.log(input)
    console.log(objects)
    objects[input] = inputValue
    console.log(objects)

    // (input==="firstName"?responseObject.input=inputValue=:firstName)

    // (input==="firstName"?objects.firstName=inputValue:objects.firstName="")
    // (input==="lastName"?objects.lastName=inputValue:objects.lastName="")
    // (input==="age"?objects.age=inputValue:objects.age="")
    // (input==="address"?objects.address=inputValue:"")
    // (input==="linkedInId"?objects.linkedInId=inputValue:"")
    // (input==="gitHubId"?objects.gitHubId=inputValue:"")

    console.log(objects)

    setFirstName(input === "firstName" ? inputValue : firstName)
    setLastName(input === "lastName" ? inputValue : lastName)
    setAge(input === "age" ? inputValue : age)
    setLinkedIn(input === "linkedInId" ? inputValue : linkedIn)
    setAddress(input === "address" ? inputValue : address)
    setGitHub(input === "gitHubId" ? inputValue : githuab)


    // console.log(firstName,lastName,age,address,linkedIn,githuab)
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    let responeObject = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      address: address,
      linkedIn: linkedIn,
      githuab: githuab
    }

    const userDetails = jwt.decode(encodedAuth, "ss")

    // console.log(userDetails)
    responeObject.expireAt = userDetails.expireAt
    delete userDetails.expireAt
    responeObject.userDetails = userDetails

    console.log(responeObject)
    let responsetoken = jwt.encode(responeObject, "ss")
    console.log(responsetoken)

    axios({
      method: "POST",
      url: "http://localhost:4000/profileData",
      headers: { authentication: responsetoken },
      // data:{message:responsetoken}
    }).then(response => {
      console.log(response.data)

      // let responseDecode=jwt.decode(response.data,"ss");
      // console.log(responseDecode)
      // let data=decodeAuth.profileDetails
      console.log("submit response")
    }).catch(error => console.log(error))

  }


  return (
    <div className="border border-secondary p-2 m-4 bg-secondary">
      <h1 className="text-light">profile dashboard</h1>
      {/* <button className="btn btn-info" onClick={handleProfile}>Profile</button> */}
      <form className="m-3" onSubmit={handleSubmit} >
        <div className='d-flex  align-items-center m-2'>
          <h1 className="col-2 text-primary ">NAME</h1>
          <h1 className="col-8 text-primary">UPDATE DATA</h1>
          <h1 className="col-2 text-primary">CURRENT DATA</h1>
        </div>
        <div className='d-flex  align-items-center'>
          <lable className="col-2"><h3>First Name </h3></lable>
          <input className="col-8" type="text" onChange={handleInput} name="firstName"
            placeholder=
            //  {firstName?firstName:
            'first Name'
          //  }
          ></input>
          <h3 className="p-2 col-2">{firstName}</h3>
        </div>
        <div className='d-flex  align-items-center'>
          <lable className="col-2"><h3>last Name </h3></lable>
          <input className="col-8" type="text" onChange={handleInput} name="lastName" placeholder="Last Name"></input>
          <h3 className="p-3 col-2">{lastName}</h3>
        </div>
        <div className='d-flex  align-items-center'>
          <lable className="col-2"><h3>Age </h3></lable>
          <input className="col-8" type="text" onChange={handleInput} name="age" placeholder="Age"></input>
          <h3 className="p-3 col-2">{age}</h3>
        </div>
        <div className='d-flex  align-items-center'>
          <lable className="col-2"><h3>Address</h3></lable>
          <input className="col-8" type="text" onChange={handleInput} name="address" placeholder="Address"></input>
          <h3 className="p-3 col-2">{address}</h3>
        </div>
        {/* <div className='d-flex  align-items-center'>
        <lable className="col-2"><h3>First Name </h3></lable>
        <input className="col-10" type="text" onChange={handleInput} placeholder="first Name"></input>
      </div> */}
        <div className='d-flex  align-items-center'>
          <lable className="col-2"><h3>linkedInId</h3></lable>
          <input className="col-8" type="text" onChange={handleInput} name="linkedInId" placeholder="Linked In Id"></input>
          <h3 className="p-3 col-2"> {linkedIn}</h3>
        </div>
        <div className='d-flex  align-items-center'>
          <lable className="col-2"><h3>Git Hub Id</h3></lable>
          <input className="col-8" type="text" onChange={handleInput} name="gitHubId" placeholder="git hub ID"></input>
          <h3 className="p-3 col-2"> {githuab}</h3>
        </div>
        <div className='d-flex  align-items-center'>

          <input className="col-12 m-2 btn btn-primary p-3" type="submit" ></input>

        </div>
      </form>
    </div>
  );
}
