// import logo from './logo.svg';
import "./App.css";
import Navbar from "./component/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateComponent from "./component/PrivateComponent";
// pages
import Home from "./pages/Home";
import Admission from "./pages/Admission";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Invoice from "./pages/Invoice";
import ErrorPage from "./pages/ErrorPage";
import { useAuthContext } from "./Context/AuthContext";
function App() {
  const { auth } = useAuthContext();
  console.log(auth);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateComponent auth={auth} />}>
            <Route path=""></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/admission" element={<Admission />}></Route>
            <Route path="/payment/:name/:id" element={<Payment />}></Route>
            <Route path="/invoice/:id" element={<Invoice />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
          <Route path="/*/*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
