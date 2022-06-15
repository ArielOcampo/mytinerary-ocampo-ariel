import Navbar from './components/Navbar'
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Details from "./pages/Details";
import ScrollToTop from "react-scroll-to-top";
import { ReactComponent as MySVG } from "../src/images/up-icon.svg";
import ScrollTop from './components/ScrollTop'

function App() {
  return (
    <>
      <ScrollTop />
      <Navbar />
      <ScrollToTop smooth style={{ width: '48px', height: '48px', borderRadius: '50%' }} component={<MySVG />} />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/*' element={<p>ERROR</p>} />
        <Route path='/cities' element={<Cities />} />
        <Route path='/citie/:id' element={<Details />} />
      </Routes>

      <Footer />

    </>
  );
}

export default App;
