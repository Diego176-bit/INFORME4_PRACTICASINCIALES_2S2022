
import './App.css';
import Login from './components/Login.jsx'
import { useState, useEffect } from 'react'



function App() {
  const [user, setUser] = useState('')
  const api = ()=>{
    fetch('http://localhost:4000/api')
    .then((response) => response.json())
    .then((usuariosData)=>{
      console.log(usuariosData)
      setUser(usuariosData)
      
    })
  }
  
  useEffect(()=>{
    api()
  }, [])
  return (
    <div className="App">
      {user !== ''
        ?<h1>{user[0].nombres}</h1>: api()
      }
      <Login />
    </div>
  );
}

export default App;
