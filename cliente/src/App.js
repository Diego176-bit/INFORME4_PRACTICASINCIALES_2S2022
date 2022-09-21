
import './App.css';
import Login from './components/Login'
import Registro from './components/Registro'
import Inicio from './components/Inicio'
import {  useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

function App() {
  
  /* const api = ()=>{
    fetch('http://localhost:4000/api')
    .then((response) => response.json())
    .then((usuariosData)=>{
      console.log(usuariosData)
      
      
    })
  }
  
  useEffect(()=>{
    api()
  }, []) */
  return (
    
    <div className="App">
      <Routes>
        <Route path='/' element ={ <Login /> }/>
        <Route path='/registro' element ={ <Registro /> }/>
        <Route path='/inicio' element ={ <Inicio /> }/>
      </Routes>
    </div>
    
  );
}

export default App;
