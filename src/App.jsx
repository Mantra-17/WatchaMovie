import './css/App.css'
import Favourites from './Pages/Favourites';
import Home from "./Pages/Home"
import {Routes,Route} from "react-router-dom"
import NavBar from './Components/NavBar';
import { MovieProvider } from './contexts/MovieContext';

function App() {

  return (
    <MovieProvider>
      <div>
        <NavBar/>
        <main className='main-content'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/favourites" element={<Favourites/>}/>
          </Routes>
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;
