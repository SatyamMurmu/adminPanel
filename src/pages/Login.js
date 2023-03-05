import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { REACT_APP_ADMIN_API } from "../config";

export default function Login() {
 
  const navigate = useNavigate();
const {msg,authenticate}=useAuthContext();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  
   
 
  const verify=async()=>{
   
    try{

      fetch(`${REACT_APP_ADMIN_API}/api/admin`, {
        method: "POST",
        body: JSON.stringify({  adminPassword: Password,adminUser: Email }),
        headers: { 'Content-Type': 'application/json' }
      }).then((data) => {
        data.json().then((result) =>{
          
           if(result.msg===true){
            authenticate("AUTH",result.msg)
            localStorage.setItem("auth", result.accesToken)
            navigate('/home')
            return;
           }
           authenticate("WRONG_CRRIDENTIAL",result.msg)
  
            
        }).catch((error)=>{
       authenticate("SERVER ERROR","SERVER ERROR")
            
        })
      });
    }catch(error){
      authenticate("WRONG_CRRIDENTIAL","SERVER ERROR")
    }
    
   

   

  }
  return (
    <>
      <main>
        <div class="container">
          <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div class="d-flex justify-content-center py-4">
                    <a
                      href="index.html"
                      class="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/lsd.png" alt="" />
                      <span class="d-none d-lg-block">ADMIN</span>
                    </a>
                  </div>

                  <div class="card mb-3">
                    <div class="card-body">
                      <div class="pt-4 pb-2">
                        <h5 class="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p class="text-center small">
                          Enter your username & password to login
                        </p>
                      </div>

                      <div class="row g-3 needs-validation">
                        <div class="col-12">
                          <label for="yourUsername" class="form-label">
                            Username
                          </label>
                          <div class="input-group has-validation">
                            <span
                              class="input-group-text"
                              id="inputGroupPrepend"
                            >
                              @
                            </span>
                            <input
                              type="text"
                              name="username"
                              class="form-control"
                              id="yourUsername"
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <div class="invalid-feedback">
                              Please enter your username.
                            </div>
                          </div>
                        </div>

                        <div class="col-12">
                          <label for="yourPassword" class="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            class="form-control"
                            id="yourPassword"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <div class="invalid-feedback">
                            Please enter your password!
                          </div>
                        </div>

                        <div class="col-12">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              name="remember"
                              value="true"
                              id="rememberMe"
                            />
                            <label class="form-check-label" for="rememberMe">
                              Remember me
                            </label>
                          </div>
                          <span style={{color:"red"}}>{msg}</span>
                        </div>
                        <div class="col-12">
                          <button
                            class="btn btn-danger w-100"
                            onClick={() =>verify()}
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="credits">
                    Designed by <a href="#">Layroad School of Development</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <a
        href="#"
        class="back-to-top d-flex align-items-center justify-content-center"
      >
        <i class="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
}
