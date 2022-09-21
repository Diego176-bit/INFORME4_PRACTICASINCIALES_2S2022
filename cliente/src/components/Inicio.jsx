import '../stylesheets/Inicio.css'
import {useState, useEffect} from 'react'
import { BsFillPersonFill } from "react-icons/bs";
import Publicacion from './Publicacion';
import Cookies from 'universal-cookie';
import axios from 'axios'
import Modal from './Modal';

function Inicio(){

    
    const cookies = new Cookies()
    const [body, setBody] = useState({
        registro: cookies.get('registro'), nombre_usuario: cookies.get('nombres')+' ' + cookies.get('apellidos'),nombre_curso: '', catedratico: '', detalles: '', fecha: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    })
    const [active, setActive] = useState(false)
    const toggle = () =>{
        setActive(!active)
    }
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
        axios.post('http://localhost:4000/api/crear-publicacion', body)
        .then(({data})=>{
            console.log(data)
        })
        .catch(({response})=>{
            console.log(response)
        })
    }

    //GENERAR CARDS DE LAS PUBLICACIONES
    const [publicacion, setPublicacion] = useState('')

    const publicaciones = () =>{
        fetch('http://localhost:4000/api/inicio')
        .then((response)=> response.json())
        .then((publicacionData)=>{
            console.log(publicacionData)
            setPublicacion(publicacionData)
        })
    }

    useEffect(() => {
        publicaciones()
      }, [])
    return(
        <>
            <header className = 'header'>
                <nav className='header_nav'>
                    <div className= 'nav_img-container'>
                        <img className = 'img-logo'
                            src='https://dtt-ecys.org/static/build/images/ecys/logo-ecys-fiusac-min.png' 
                            alt = 'dtt'
                        />
                    </div>
                    <ul className = 'nav_ul'>
                        <li className='ul_li'>
                            <button onClick={toggle}>Crear Publicación</button>
                        </li>
                        <li className='ul_li'>
                            <a href="https://google.com"><BsFillPersonFill/>{cookies.get('nombres')}</a>
                        </li>
                        
                    </ul>
                    
                </nav>
            </header>

            <main>
                {publicacion !== ''?
                    publicacion.map(publicacion =>{
                        return(
                            <Publicacion
                                nombreUsuario={publicacion.nombre_usuario}
                                fecha = {publicacion.fecha}
                                nombreCatedraticoCurso={publicacion.catedratico}
                                detallePublicacion={publicacion.detalles}
                            />
                        )
                    })
                    : publicaciones()
            
                }
                
                <Modal active = {active} toggle = {toggle}>
                    <form> 
                            
                            <input 
                                type="text" 
                                placeholder="Catedrático"
                                 value={body.catedratico}
                                onChange = {inputChange} 
                                name = 'catedratico'
                            />

                            
                            <input 
                                type="text" 
                                placeholder="Curso" 
                                value={body.nombre_curso}
                                onChange = {inputChange} 
                                name = 'nombre_curso'    
                            />
                            <textarea 
                                value={body.detalles}
                                onChange = {inputChange} 
                                name = 'detalles'
                            
                            />
                            <div className='buttons-container'>
                                <input 
                                    type="submit" 
                                    value="Publicar" 
                                    onClick={onSubmit} 
                                    
                                />
                                <button onClick={toggle}>Cancelar</button>
                            </div>

                        </form>
                </Modal>
            </main>
        </>
    )
}

export default Inicio