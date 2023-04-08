import { Route, Routes } from 'react-router-dom';
import './App.css';

/*COMPONENTES*/
import Navbar from './components/Navegacion/Navbar';
import Home from './components/Navegacion/Home';
import ContactUs from './components/Navegacion/ContactUs';
import News from './components/Navegacion/News';
import Services from './components/Navegacion/Services';
import Inovation from './components/Navegacion/Inovation'
import About from './components/Navegacion/About';
import Customers from './components/Navegacion/Customers'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/ContactUs' element={<ContactUs/>}/>
          <Route path='/Services' element={<Services/>}/>
          <Route path='/News' element={<News/>}/>
          <Route path='/Innovation' element={<Inovation/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/Customers' element={<Customers/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
