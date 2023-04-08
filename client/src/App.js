import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import {useAuth0} from '@auth0/auth0-react'

/*COMPONENTES*/
import Navbar from "./components/Navbar";
import News from "./components/News";
import Home from "./components/Home";
import Services from "./components/Services";
import Innovation from "./components/Innovation";
import AboutUs from "./components/AboutUs";
import Customers from "./components/Customers";
import Perfil from "./components/Perfil";

function App() {

  const {isAuthenticated} = useAuth0();
  return (
    <div>
      {isAuthenticated ? (
        <>
        <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="News" element={<News />} />
        <Route path="Services" element={<Services />} />
        <Route path="Innovation" element={<Innovation />} />
        <Route path="AboutUs" element={<AboutUs />} />
        <Route path="Customers" element={<Customers />} />
        <Route path="Perfil" element={<Perfil />} />
      </Routes>
        </>
      ):(
        <Login/>
      )
    }
    </div>
  );
}

export default App;
