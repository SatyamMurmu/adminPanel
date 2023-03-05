import React, { useEffect, useState } from "react";
import {  Link,useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { REACT_APP_ADMIN_API } from "../config";
export default function Admission() {
  const navigate=useNavigate();
  const [name, setName] = useState({ data: null, msg: "", error: true });
  const [email, setEmail] = useState({ data: null, msg: "", error: true });
  const [phone, setPhone] = useState({ data: null, msg: "", error: true });
  const [course, setCourse] = useState({ data: null, msg: "", error: true });
  const [batch, setBatch] = useState({ data: null, msg: "", error: true });
  const [address, setAddress] = useState({ data: null, msg: "", error: true });
  const [type, setType] = useState({ data: null, msg: "", error: true });
  const [fee, setFee] = useState({ data: null, msg: "", error: true });
  const [rgsfee, setRgsfee] = useState({ data: null, msg: "", error: true });
  const [warn, setWarn] = useState("");

  const warnMsg = {
    color: "red",
  };

  const nameValidate = (data) => {
    setWarn("");
    if (data == null || data == undefined || data.length == 0) {
      setName({ msg: "Please enter Name" ,error: true});

      return;
    }
    setName({  data, error: false });
  };
  const emailValidate = (data) => {
    setWarn("");
    if (data == null || !data.includes("@gmail.com")) {
      setEmail({ msg: "Please enter a valid email",error: true });

      return;
    }
    setEmail({ data, error: false });
  };
  const phoneValidate = (data) => {
    setWarn("");

    if (data.length != 10) {
      setPhone({ msg: "Number should be 10 Digits",error: true });

      return;
    }
    setPhone({ data, error: false });
  };
  const addresValidate = (data) => {
    setWarn("");
    if (data.includes("  ") && !data.includes(",")) {
      setAddress({ msg: "Please Separate by ' ,'" ,error: true});

      return;
    }
    setAddress({ data, error: false });
  };
  const courseValidate = (data) => {
    setWarn("");

    if (data == "Choose...") {
      setCourse({ msg: "Please select a course",error: true });

      return;
    }
    setCourse({ data, error: false });
  };
  const batchValidate = (data) => {
    setWarn("");
    if (data == "Choose...") {
      setBatch({ msg: "Please select a batch",error: true });

      return;
    }
    setBatch({ data, error: false });
  };
  const typeValidate = (data) => {
    setWarn("");
    if (data == "Choose...") {
      setType({ msg: "Please select ",error: true });

      return;
    }
    setType({ data, error: false });
  };
  const feeValidate1 = (data) => {
    setWarn("");
    if (data < 39999) {
      setFee({ msg: "Minimum 40000" ,error: true});

      return;
    }
    setFee({ data });
  };
  const feeValidate = (data) => {
    setWarn("");
    if (data < 4999) {
      setRgsfee({ msg: "Minimum 5000" ,error: true});

      return;
    }
    setRgsfee({ data, error: false });
  };

  const admission = () => {
    const token=localStorage.getItem('auth');
  
    const check = [
      name,
      email,
      phone,
      course,
      batch,
      address,
      type,
      fee,
      rgsfee,
    ];
    check.map((item,i) => {
        item.error ? setWarn("Provide data in all filed"):<></> ;
    });
    if(name.error||email.error||phone.error||course.error||batch.error||address.error||type.error||fee.error||rgsfee.error){
      return;
    }
    const user={
       name:name.data,
       email:email.data,
       mobile:phone.data,
       courseName:course.data,
       batch:batch.data,
       couresType:type.data,
       address:address.data,
       amount:rgsfee.data,
      
    } 
        
    fetch(`http://localhost:8000/api/admission`,{
      method: "POST",
      body:JSON.stringify(user),
      headers:{
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      }
    }).then((data)=>{
      data.json().then((result)=>{
      setWarn(result.msg)
       navigate('/home')
      })

  })
   
  };
  const token = localStorage.getItem("auth");
  useEffect(()=>{
  if(!token){
    navigate('/login')
  }

  },[])

  return (
    <>
      <Navbar />
      <main class="main" id="main">
        <div class="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/home">Home</Link>
              </li>
              <li class="breadcrumb-item active">Admission</li>
            </ol>
          </nav>
        </div>
        <section class="section dashboard">
          <div class="row">
            <div class="col-lg-12">
              <div class="row">
                <div class="col-lg-10">
                  <div class="row g-3">
                    <div class="col-md-12">
                      <label for="inputName5" class="form-label">
                        <strong>Student Name</strong>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputName5"
                        onChange={(e) => nameValidate(e.target.value)}
                      />
                      <span style={warnMsg}>
                        {name.msg}
                      </span>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        {" "}
                        <strong>Email</strong>
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmail5"
                        onChange={(e) => emailValidate(e.target.value)}
                      />
                      <span style={warnMsg}>
                     
                        {email.msg}
                      </span>
                    </div>
                    <div class="col-md-6">
                      <label for="inputPassword5" class="form-label">
                        {" "}
                        <strong>Mobile Number</strong>
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        onChange={(e) => phoneValidate(e.target.value)}
                      />
                      <span style={warnMsg}>
                    
                        {phone.msg}
                      </span>
                    </div>
                    <div class="col-12">
                      <label for="inputAddress5" class="form-label">
                        {" "}
                        <strong>Address</strong>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputAddres5s"
                        placeholder="1234 Main St"
                        onChange={(e) => addresValidate(e.target.value)}
                      />
                      <span style={warnMsg}>
                       
                        {address.msg}
                      </span>
                    </div>

                    <div class="col-md-6">
                      <label for="inputCity" class="form-label">
                        <strong>Course Name</strong>
                      </label>
                      <select
                        id="inputState"
                        class="form-select"
                        onClick={(e) => courseValidate(e.target.value)}
                      >
                        <option selected>Choose...</option>
                        <option>Full Stack Web Devlopment</option>
                      </select>
                      <span style={warnMsg}>
                     
                        {course.msg}
                      </span>
                    </div>
                    <div class="col-md-4">
                      <label for="inputState" class="form-label">
                        <strong>Select Batch</strong>
                      </label>
                      <select
                        id="inputState"
                        class="form-select"
                        onClick={(e) => batchValidate(e.target.value)}
                      >
                        <option selected>Choose...</option>
                        <option>4th Batch</option>
                      </select>
                      <span style={warnMsg}>
                     
                        {batch.msg}
                      </span>
                    </div>
                    <div class="col-md-2">
                      <label for="inputZip" class="form-label">
                        {" "}
                        <strong>Course Type</strong>
                      </label>
                      <select
                        id="inputState"
                        class="form-select"
                        onClick={(e) => typeValidate(e.target.value)}
                      >
                        <option selected>Choose...</option>
                        <option>Pay After</option>
                        <option>Paid</option>
                      </select>
                      <span style={warnMsg}>
                       
                        {type.msg}
                      </span>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        {" "}
                        <strong>Course Fee</strong>
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="inputEmail5"
                        onChange={(e) => feeValidate1(e.target.value)}
                      />
                      <span style={warnMsg}>
                      
                        {fee.msg}
                      </span>
                    </div>
                    <div class="col-md-6">
                      <label for="inputPassword5" class="form-label">
                        {" "}
                        <strong>Registration Fee</strong>
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="inputPassword5"
                        onChange={(e) => feeValidate(e.target.value)}
                      />
                      <span style={warnMsg}>
                       
                        {rgsfee.msg}
                      </span>
                    </div>
                    <div class="col-12">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                        />
                        <label class="form-check-label" for="gridCheck">
                          Check me out
                        </label>
                      </div>
                    <h5 style={{textAlign:"center",color:"red"}}>{warn}</h5>
                    </div>
                    <div class="text-center">
                    
                      <button
                        class="btn btn-danger"
                        onClick={() => admission()}
                      >
                        Submit
                      </button>
                      <button type="reset" class="btn btn-secondary">
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
