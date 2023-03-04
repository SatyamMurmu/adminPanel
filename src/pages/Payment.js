import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
export default function Payment() {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth");
  const { name, id } = useParams();
  const [amount, setAmount] = useState({ data: null, msg: "", error: true });
  const [description, setDescription] = useState({
    data: null,
    msg: "",
    error: true,
  });
  const [method, setMethod] = useState({ data: "CASH", msg: "", error: false });
  const [trancID, setID] = useState({ data:null, msg: "",error: false });
  const [admin,setAdmin]=useState({msg: "", error: true})
  const amountValidate = (item) => {
    
    if (item == "") {
      setAmount({ msg: "Enter Fee amount", error: true });
      return;
    }
    setAmount({ data: item, error: false });
  };
  const descriptionValidate = (item) => {
    if (item.length < 2) {
      setDescription({ msg: "Enter Fee description", error: true });
      return;
    }
    setDescription({ data: item, error: false });
  };
  const adminValidate=(item)=>{
     if(item!="admin@1234"){
      setAdmin({msg:"Enter Password",error:true})
      return;
     }
     setAdmin({msg:"",error:false})
  }
  const payment = (id) => {
    // console.log(method.error, amount.error, trancID.error, description.error,admin.error);
    if(amount.error){
      setAmount({msg:"Eneter fee",error:true})
    }
    if(description.error){
      setDescription({msg:"Enter description",error:true})
    }
    if(admin.error){
      setAdmin({msg:"Enter password",error:true})
      return;
    }
    const bill = { description:description.data, paymentMethods: method.data, amount:amount.data, trancID:trancID.data };
    
    fetch(`http://localhost:8000/api/create-payment/${id}`, {
      method: "POST",
      body: JSON.stringify(bill),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      res.json().then((data) => {
         
        if (data.statusCode === 200) {
          navigate("/home");
        }
      });
    });
  };
  return (
    <>
      <Navbar />
      <main class="main" id="main">
        <div class="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <Link to="/home" className="breadcrumb-item">
                  Home
                </Link>
              </li>
              <li class="breadcrumb-item active">Fee Payment</li>
            </ol>
          </nav>
        </div>

        <section class="section dashboard">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Course Fee</h5>

                  <div>
                    <div class="row mb-3">
                      <label for="inputEmail3" class="col-sm-2 col-form-label">
                        Student ID
                      </label>
                      <div class="col-sm-10">
                        <input
                          type="text"
                          class="form-control"
                          id="inputText"
                          value={id}
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label for="inputEmail3" class="col-sm-2 col-form-label">
                        Student Name
                      </label>
                      <div class="col-sm-10">
                        <input
                          type="text"
                          class="form-control"
                          id="inputText"
                          value={name}
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label for="inputEmail3" class="col-sm-2 col-form-label">
                        Fee Amout
                      </label>
                      <div class="col-sm-10">
                        <input
                          type="number"
                          class="form-control"
                          id="inputEmail"
                          onChange={(e) => amountValidate(e.target.value)}
                        />
                        <span style={{ color: "red" }}>{amount.msg}</span>
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label for="inputEmail3" class="col-sm-2 col-form-label">
                        Description
                      </label>
                      <div class="col-sm-10">
                        <input
                          type="text"
                          class="form-control"
                          id="inputText"
                          onChange={(e) => descriptionValidate(e.target.value)}
                        />
                        <span style={{ color: "red" }}>{description.msg}</span>
                      </div>
                    </div>
                    <fieldset class="row mb-3">
                      <legend class="col-form-label col-sm-3 pt-0">
                        Payement Method
                      </legend>
                      <div class="col-sm-9">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="gridRadios"
                            id="gridRadios1"
                            value="CASH"
                            checked
                            onClick={(e) => setMethod(e.target.value)}
                          />
                          <label class="form-check-label" for="gridRadios1">
                            Cash
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="gridRadios"
                            id="gridRadios2"
                            value="UPI"
                            onClick={(e) => setMethod(e.target.value)}
                          />
                          <label class="form-check-label" for="gridRadios2">
                            UPI
                          </label>
                        </div>
                      </div>
                    </fieldset>
                    <div class="row mb-3">
                      <label for="inputEmail3" class="col-sm-3 col-form-label">
                        Trasnc ID/UPI Number
                      </label>
                      <div class="col-sm-9">
                        <input
                          type="text"
                          class="form-control"
                          id="inputText"
                          onChange={(e) =>setID({data:e.target.value,error:false})}
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label
                        for="inputPassword3"
                        class="col-sm-3 col-form-label"
                      >
                        Admin Password
                      </label>
                      <div class="col-sm-9">
                        <input
                          type="password"
                          class="form-control"
                          id="inputPassword"
                          onChange={(e)=>adminValidate(e.target.value)}
                        />
                        <span style={{color:"red"}}>{admin.msg}</span>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-sm-10 offset-sm-2">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="gridCheck1"
                          />
                          <label class="form-check-label" for="gridCheck1">
                            Confirm
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="text-center">
                      <button
                        onClick={() => payment(id)}
                        class="btn btn-danger"
                      >
                        Submit
                      </button>
                      <Link to="/home">
                        <button type="reset" class="btn btn-secondary">
                          Back
                        </button>
                      </Link>
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
