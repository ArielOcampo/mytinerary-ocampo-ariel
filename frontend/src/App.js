import Navbar from './components/Navbar'
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import Error from "./components/Error"
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Details from "./pages/Details";
import ScrollToTop from "react-scroll-to-top";
import { ReactComponent as MySVG } from "../src/images/up-icon.svg";
import ScrollTop from './components/ScrollTop'
import { useEffect } from 'react';
import citiesActions from './redux/actions/citiesActions';
import { useDispatch } from 'react-redux'

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(citiesActions.getCities())

    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className='page-container'>
        <div className='content-wrap'>
          <ScrollTop />
          <Navbar />
          <ScrollToTop smooth style={{ width: '48px', height: '48px', borderRadius: '50%' }} component={<MySVG />} />
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/*' element={<Error />} />
            <Route path='/cities' element={<Cities />} />
            <Route path='/citie/:id' element={<Details />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default App

