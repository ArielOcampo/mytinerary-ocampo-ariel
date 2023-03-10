import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/commons/Navbar";
import Footer from "./components/commons/Footer";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import Error from "./components/commons/Error";
import "./App.css";
import Details from "./pages/Details";
import ScrollToTop from "react-scroll-to-top";
import { ReactComponent as MySVG } from "../src/images/up-icon.svg";
import ScrollTop from "./components/commons/ScrollTop";
import citiesActions from "./redux/actions/citiesActions";
import SignUp from "./components/commons/SignUp";
import LogIn from "./components/commons/LogIn";
import { ToastContainer } from "react-toastify";
import userActions from "./redux/actions/userActions";
import { Comments } from "./components/commons";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(citiesActions.getCities());
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      dispatch(userActions.verifyToken(token));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="page-container">
        <div className="content-wrap">
          <ToastContainer
            position="bottom-left"
            theme="dark"
            autoClose={5000}
            hideProgressBar={false}
            limit={3}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <ScrollTop />
          <Navbar />
          <ScrollToTop
            smooth
            style={{ width: "48px", height: "48px", borderRadius: "50%" }}
            component={<MySVG />}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/*" element={<Error />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/citie/:id" element={<Details />} />
            {/* <Route path='/signup' element={<SignUp />} /> */}
            {localStorage.getItem("token") ? (
              <Route path="/login" element={<Error />} />
            ) : (
              <Route path="/login" element={<LogIn />} />
            )}
            {localStorage.getItem("token") ? (
              <Route path="/signup" element={<Error />} />
            ) : (
              <Route path="/signup" element={<SignUp />} />
            )}
            <Route path="/itineraries/:id" element={<Comments />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default App;
