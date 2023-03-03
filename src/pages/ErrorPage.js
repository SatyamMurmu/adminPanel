import React from "react";
import { Link,  } from "react-router-dom";
// import Navbar from "../component/Navbar";
function ErrorPage() {
  return (
    <>
    
      <div className="container mt-5 ">
        <button>
          <Link to="/home">Home</Link>
        </button>
      </div>
    </>
  );
}

export default ErrorPage;
