
import React from 'react'
import usacLogo from '../img/fiusac_negro.png'
import '../stylesheets/Login.css'
function Login(){
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
                        <input type="text" placeholder="Carne" />

                        <label htmlFor = {"Contraseña"}> Contraseña</label>
                        <input type="password" placeholder="Contraseña" />

                        <input type="submit" value="Iniciar sesión" />
                        <a href="https://google.com">¿Has olvidado tu contraseña?</a>
                    </form>
            </div>
    </div>
    )
}

export default Login