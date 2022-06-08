import Navbar from './components/Navbar'
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import './App.css';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
    
    <header style={{position:"fixed",zIndex: 999, width:"100%"}}>
      <Navbar/>
    </header>
    <Routes>
      <Route path='/home' element={<Home/>} />
      <Route path='/cities' element={<Cities/>} />
    </Routes>
      
      
    
    <footer>
      <Footer/>
    </footer>
    </>
  );
}

export default App;
