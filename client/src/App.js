import { Route, Routes } from 'react-router-dom';
import './App.css';

/*COMPONENTES*/
import Navbar from './components/Navbar';
import News from './components/News';
import Home from './components/Home';
import Services from './components/Services';
import Innovation from './components/Innovation';
import AboutUs from './components/AboutUs';
import Customers from './components/Customers';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='' element={<Home/>}/>
        <Route path='News' element={<News/>}/>
        <Route path='Services' element={<Services/>}/>
        <Route path='Innovation' element={<Innovation/>}/>
        <Route path='AboutUs' element={<AboutUs/>}/>
        <Route path='Customers' element={<Customers/>}/>
      </Routes>
    </div>
  );
}

export default App;
