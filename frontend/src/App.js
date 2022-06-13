import Navbar from './components/Navbar'
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Details from "./pages/Details";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cities' element={<Cities />} />
        <Route path='/citie/:id' element={<Details />} />
      </Routes>
      <Footer />

    </>
  );
}

export default App;
