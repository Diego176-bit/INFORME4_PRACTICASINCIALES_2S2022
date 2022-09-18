
import './App.css';
import Login from './components/Login.jsx'
import {  useEffect } from 'react'



function App() {
  
  const api = ()=>{
    fetch('http://localhost:4000/api')
    .then((response) => response.json())
    .then((usuariosData)=>{
      console.log(usuariosData)
      
      
    })
  }
  
  useEffect(()=>{
    api()
  }, [])
  return (
    <div className="App">
      
      <Login />
    </div>
  );
}

export default App;
