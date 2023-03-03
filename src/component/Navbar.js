import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
export default function Navbar() {
const {authenticate}=useAuthContext();
const logOut=()=>{
  let yes=window.confirm("Are sure ");
  if(yes){
    authenticate("LOGOUT",false);
    localStorage.clear();
  }
  return;
}

  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul class="sidebar-nav" id="sidebar-nav">
          <li class="nav-item">
            <Link to="/home" className="nav-link collapsed active">
              <i class="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/admission" className="nav-link collapsed">
              <i class="bi bi-person-lines-fill"></i>
              <span>Student Admission</span>
            </Link>
          </li>
          {/* <li class="nav-item">
            <Link to="/payment" className="nav-link collapsed">
              <i class="bi bi-credit-card"></i>
              <span>Course Fee Payment</span>
            </Link>
          </li> */}

          <li class="nav-item">
            <li className="nav-link collapsed" onClick={()=>logOut()}>
              <i class="bi bi-box-arrow-in-right"></i>
              <span>Logout</span>
            </li>
          </li>
        </ul>
      </aside>
    </>
  );
}
