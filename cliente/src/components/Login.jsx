
import React from 'react'
import usacLogo from '../img/fiusac_negro.png'
import '../stylesheets/Login.css'
import {useState} from 'react'
import axios from 'axios'
function Login(){

    const [body, setBody] = useState({username: '', password: ''})

    //aplicar cambios en el input
    const inputChange = ({target}) =>{
        const {name, value} = target
        setBody({
            
            ...body,
            [name]:value
        })
    }

    //enviar credenciales 
    const onSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:4000/iniciar-sesion', body)
        .then(({data})=>{
            console.log(data)
        })
        .catch(({response})=>{
            console.log(response)
        })
    }
    return(
        
    <div className="contenedor">
            <h1> FACULTAD DE INGENIERIA </h1>

            <div className="login">    
                
                    <div className="contenedor-imagen">
                        <img className="inicio_sesion"src={usacLogo} alt ="logo facultad" />
                    </div>
                    <h2>Ingresa a tu cuenta</h2>
                    <form> 
                        <label htmlFor = {"Usuario"}> Usuario</label>
                        <input 
                            type="text" 
                            placeholder="Carne"
                            value={body.username}
                            onChange = {inputChange}
                            name = 'username'
                        />

                        <label htmlFor = {"Contraseña"}> Contraseña</label>
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            value={body.password}
                            onChange = {inputChange}
                            name = 'password'    
                        />

                        <input 
                            type="submit" 
                            value="Iniciar sesión" 
                            onClick={onSubmit}
                        />


                        <a href="https://google.com">¿Has olvidado tu contraseña?</a>
                    </form>
            </div>
    </div>
    )
}

export default Login