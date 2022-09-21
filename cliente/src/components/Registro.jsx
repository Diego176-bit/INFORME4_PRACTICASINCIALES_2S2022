import React from 'react'
import '../stylesheets/Registro.css'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'


function Registro(){

    const [body, setBody] = useState({registro: '', nombres: '', apellidos: '', correo_electronico: '', password: ''})

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
        axios.post('http://localhost:4000/api/registro', body)
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
            
                
                <h2>Registrate</h2>
                <form> 
                    
                    <input 
                        type="text" 
                        placeholder="Registro Académico"
                        value={body.registro}
                        onChange = {inputChange}
                        name = 'registro'
                    />
                    
                    <input 
                        type="text" 
                        placeholder="Nombres" 
                        value={body.nombres}
                        onChange = {inputChange}
                        name = 'nombres'    
                    />

                    
                    <input 
                        type="text" 
                        placeholder="Apellidos" 
                        value={body.apellidos}
                        onChange = {inputChange}
                        name = 'apellidos'    
                    />
                    
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={body.email}
                        onChange = {inputChange}
                        name = 'correo_electronico'    
                    />

                    
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        value={body.password}
                        onChange = {inputChange}
                        name = 'password'    
                    />
                    
                    

                    <input 
                        type="submit" 
                        value="Registrarse" 
                        onClick={onSubmit}
                    />

                    <div className='contenedor-links'>
                        <Link to = '/'>¿Ya tienes cuenta? Inicia Sesión</Link>
                        
                    </div>
                </form>
        </div>
</div>
    )
}

export default Registro