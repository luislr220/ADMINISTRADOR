import { Route, Routes } from 'react-router-dom';
import './App.css';

/*COMPONENTES*/
import Navbar from './components/Navbar'
import News from './components/News'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route path='/' element={<News/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
