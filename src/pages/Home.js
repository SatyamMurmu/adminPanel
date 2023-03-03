import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { AiFillDelete } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../component/Footer";
export default function Home() {
  const token = localStorage.getItem("auth");
  const [list, setList] = useState(null);
  const [count, setCount] = useState(0);
  const deleteStudent = (ID) => {
    const yes = window.confirm("Are you sure you want to delete");
    if (yes) {
      fetch(
        `http://localhost:8000/api//all_Student_List/remove?studentID=${ID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => {
        res.json().then((data) => {
          setCount(count + 1);
        });
      });
    }
    return;
  };
  useEffect(() => {
    fetch("http://localhost:8000/api/all_Student_List", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        setList(data);
      });
    });
  }, [count]);

  return (
    <>
      {/* <Header/> */}
      <Navbar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/home">Home</Link>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-6 card mt-4">
              <div className="card-body">
                <h5 className="card-title">
                  Total Student <span>| This Year</span>
                </h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-people"></i>
                  </div>
                  <div className="ps-3">
                    <h6>1244</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mt-2">
                <div className="col-12">
                  <div className="card recent-sales overflow-auto">
                    <div className="filter">
                      <button onClick={() => setCount(count + 1)}>
                        <i class="bi bi-arrow-clockwise"></i>
                      </button>
                      <a className="icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">
                        Student Management <span>| LSD</span>
                      </h5>

                      <table className="table table-borderless datatable">
                        <thead>
                          <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Student Name</th>
                            <th scope="col">Batch</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Course Type</th>
                            <th scope="col">Course Fee</th>
                            <th scope="col">Fee Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list != null ? (
                            list.map((curentStudent) => {
                              return (
                                <>
                                  <tr>
                                    <th scope="row">
                                      <Link
                                        to={`/invoice/${curentStudent.studentID}`}
                                      >
                                        {curentStudent.studentID}
                                      </Link>
                                    </th>

                                    <td>
                                      <Link
                                        to={`/invoice/${curentStudent.studentID}`}
                                      >
                                        {curentStudent.name}
                                      </Link>
                                    </td>
                                    <td>{curentStudent.batch}</td>
                                    <td>{curentStudent.courseName}</td>
                                    <td>{curentStudent.couresType}</td>
                                    <td>{curentStudent.studentID}</td>

                                    <td>
                                      <span className="badge bg-success">
                                        Completed
                                      </span>
                                    </td>
                                    <td>
                                      <Link
                                        to={`/payment/${curentStudent.name}/${curentStudent.studentID}`}
                                      >
                                        Pay Fee
                                      </Link>
                                      <button
                                        onClick={() =>
                                          deleteStudent(curentStudent.studentID)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                </>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={2}>Loading</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
