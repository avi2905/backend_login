import React, { Component, useState } from "react";
import './css/login.css';
import logo from './asset/logo2.png';
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(username, password,remember);
    fetch("http://localhost:3001/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data,"consoled data");
        
        if (data.status == 'ok') {
          alert("login successful");
          console.log(data);
          window.localStorage.setItem("token", data.data);
          if(remember==true){
          window.localStorage.setItem("loggedIn", true);
          }
          window.location.href = "/profile";
        }
        if (data.status == 'notok') {
          alert("Invalid credentials");
          
        }
      });
  }

  return (
    <body>
      
     <ul class="-dark h-100 w-100 bg-dark ">
     <div class="container">
    <header class=" bi me-2  py-3 mb-4 ">
    <img src={logo} alt="logo" width="280" height="70"/ >
        
        

      
    </header>
  </div>
    <div class="px-4 py-5  ">
  <div class="row align-items-center g-lg-5 py-5 mx-5">
    <div class="col-lg-7 text-center text-lg-start">
      <li class="align top center">
      <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3 text-white">Welcome,<br/> Log in to <br/><img src={logo} alt="logo" width="400" height="100"/ ></h1>
      </li>
    </div>
    
    
    <div class="col-md-10 mx-auto col-lg-5">
      <li class="align middle center">
      <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="checkbox mb-3">
          <label class="text-white">
            <input  type="checkbox" value="remember-me" onChange={(e) => setRemember(e.target.checked)} /> Remember me
          </label>
        </div>
        <button class="w-100 btn btn-lg btn-primary text-white" type="submit">Sign up</button>
        <hr class="my-4"/>
        <small class="text-body-secondary text-white">By clicking Sign up, you agree to the terms of use.</small>
      </form>
      </li>
    </div>
    </div>
</div>
</ul>
</body>

  );
}
