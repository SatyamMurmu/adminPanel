import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {REACT_APP_ADMIN_API} from '../config'
import html2pdf from "html2pdf.js";
export default function Invoice() {
  const current = new Date();
  const { id } = useParams();
  const token = localStorage.getItem("auth");
  const [data, setData] = useState(null);
  const [bill, setBill] = useState([]);
  let total=0;
  const printInvoice = () => {
    console.log("print");
    let invoice = document.getElementById("dashboard");
    var opt = {
      margin: [0, 0.5, 0, 0],
      filename: `${data.name}-invoice.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
    };

    // New Promise-based usage:
    html2pdf().from(invoice).set(opt).save();
  };
  useEffect(() => {
    fetch(`${REACT_APP_ADMIN_API}/api/single_lsit/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      res.json().then((item) => {
        setData(item);
      });
    });
    fetch(`${REACT_APP_ADMIN_API}/api/payment-details/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        setBill(data);
      });
    });
  }, []);
  

  return (
    <>
      {data == null ? (
        <>
          <h1>Please Wait..</h1>
        </>
      ) : (
        <>
          <section class="section dashboard mt-5" id="dashboard">
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <div class="container mb-5 mt-3">
                          <div class="row d-flex align-items-baseline">
                            <div class="col-xl-9">
                              <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                                Paymnet Invoice ||<strong>{data.studentID}</strong>
                              </p>
                            </div>

                            <hr />
                          </div>
                          <div class="container">
                            <div class="row justify-content-around ">
                              <div class="col-lg-7 col-md-5 col-5">
                                <ul class="list-unstyled">
                                  <li
                                    style={{
                                      fontSize: "30px",
                                      color: "rgb(243, 81, 81)",
                                      fontWweight: "600",
                                    }}
                                  >
                                    Layoad School of Development
                                  </li>

                                  <li>Khaprapada chowk</li>
                                  <li>Azimabad, Balasore</li>
                                  <li>Odisha, 756001</li>
                                  <li>91781 19251</li>
                                  <li>Email: info@lsd.education</li>
                                </ul>
                              </div>
                              <div class="col-lg-3 col-md-3 col-3 lsd-logo">
                                <img src="/assets/image/lsd.png" alt="Logo" />
                              </div>
                            </div>
                          </div>

                          <div class="container">
                            <h2 class="text-center">Payment Invoice</h2>

                            <div class="row">
                              <div class="col-xl-8">
                                <ul class="list-unstyled">
                                  <strong>To</strong>
                                  <li class="text-muted">
                                    <strong>Name:</strong>
                                    <span style={{ color: "#c5725d" }}>
                                      {data.name}
                                    </span>
                                  </li>
                                  <li class="text-muted">
                                    <strong>Batch:</strong>
                                    {data.batch}
                                  </li>
                                  <li class="text-muted">
                                    <strong>Course:</strong> {data.courseName}
                                  </li>
                                  <li class="text-muted">
                                    <strong>Phone:</strong>+91-{data.mobile}
                                  </li>
                                  <li class="text-muted">
                                    <strong>Email:</strong>{data.email}
                                  </li>
                                </ul>
                              </div>
                              <div class="col-xl-4">
                                <ul class="list-unstyled">
                                  <li class="text-muted">
                                    <i
                                      class="fas fa-circle"
                                      style={{ color: " #84b0ca" }}
                                    ></i>
                                    <span class="fw-bold">ID: </span>
                                    {data.studentID}
                                  </li>
                                  <li class="text-muted">
                                    <i
                                      class="fas fa-circle"
                                      style={{ color: "#84b0ca" }}
                                    ></i>
                                    <span class="fw-bold">Course Type: </span>
                                    {data.couresType}
                                  </li>
                                  <li class="text-muted">
                                    <i
                                      class="fas fa-circle"
                                      style={{ color: "#84b0ca" }}
                                    ></i>
                                    <span class="fw-bold">Fee: </span> ₹10,000/-
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div class="row my-2 mx-1 justify-content-center">
                              <table class="table table-striped table-borderless">
                                <thead
                                  style={{ backgroundColor: "#dd6260" }}
                                  class="text-white"
                                >
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Payement Description</th>
                                    <th scope="col">
                                      <table>
                                        Payment Method
                                        <tr>
                                          <td>Cash/UPI</td>
                                        </tr>
                                      </table>
                                    </th>
                                    <th scope="col">Paid On</th>

                                    <th scope="col">Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {bill.map((currentElm, i) => {
                                    total=total+parseInt(currentElm.amount)
                                    return (
                                      <>
                                        <tr key={i}>
                                          <th scope="row">{i + 1}</th>
                                          <td>{currentElm.description}</td>
                                          <td>
                                            {currentElm.paymentMethods}(
                                            {currentElm.trancID})
                                          </td>
                                          <td>{currentElm.paidOn}</td>
                                          <td>₹{currentElm.amount}/-</td>
                                        </tr>
                                      </>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                            <div class="row justify-content-end">
                              <div class="col-xl-5">
                                <ul class="list-unstyled">
                                  <li class="text-muted ms-3">
                                    <span class="text-black me-4">
                                     Total
                                    </span>
                                    <strong>{total}</strong>
                                  </li>
                                </ul>
                                {/* <p class="text-black float-start">
                                  <span class="text-black me-3">
                                    Remaining Amount
                                  </span>
                                  <span style={{ fontSize: "25px" }}>
                                    ₹3,000.00
                                  </span>
                                </p> */}
                              </div>
                            </div>
                            <hr />
                            <div class="row ">
                              <div class="col-xl-10">
                                <p>
                                  Date:{" "}
                                  <span>{current.getMonth()+1}</span>
                                </p>
                              </div>
                              <div class="col-xl-2" id="remove-element">
                                <button
                                  type="button"
                                  className="btn btn-success btn-sm mx-2"
                                
                                  onClick={() => printInvoice()}
                                >
                                  Print Invoice
                                </button>
                                <Link to="/home" >
                                  <button className="btn btn-primary btn-sm">
                                    Back
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
