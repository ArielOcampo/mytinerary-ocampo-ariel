import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Cities, Details, Home } from "./pages";
import {
  Comments,
  NavBar,
  Footer,
  Error,
  ScrollTop,
  SignUp,
  LogIn,
} from "./components/commons";
import "./App.css";
import ScrollToTop from "react-scroll-to-top";
import { ReactComponent as MySVG } from "../src/images/up-icon.svg";
import { CitiesActions, UserActions } from "./redux/actions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CitiesActions.getCities());
    if (localStorage.getItem("token") !== null) {
      const token = localStorage.getItem("token");
      dispatch(UserActions.verifyToken(token));
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
          <NavBar />
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
};
export default App;
