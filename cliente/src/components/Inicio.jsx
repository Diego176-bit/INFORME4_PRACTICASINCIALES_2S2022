import '../stylesheets/Inicio.css'
import {useState, useEffect} from 'react'
import { BsFillPersonFill } from "react-icons/bs";
import Publicacion from './Publicacion';
import Cookies from 'universal-cookie';
import axios from 'axios'
import Modal from './Modal';
import {Link} from 'react-router-dom'
import { AiOutlineLogout } from "react-icons/ai"
function Inicio(){

    
    const cookies = new Cookies()
    //CERRAR SESION
    const cerrarSesion=()=>{
        cookies.remove('registro', {path: '/'})
        cookies.remove('nombres', {path: '/'})
        cookies.remove('apellidos', {path: '/'})
        cookies.remove('correo_electronico', {path: '/'})
        window.location.href = '/'
    }

    const [body, setBody] = useState({
        registro: cookies.get('registro'), nombre_usuario: cookies.get('nombres')+' ' + cookies.get('apellidos'),nombre_curso: '', catedratico: '', detalles: '', fecha: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    })

    //MODAL
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
            alert('Publicado con éxito!')
            toggle()
        })
        .catch(({response})=>{
            console.log(response)
        })
    }

    //GENERAR CARDS DE LAS PUBLICACIONES
    const [publicacion, setPublicacion] = useState([])

    /* const  publicaciones = () =>{
         fetch('http://localhost:4000/api/inicio')
        .then((response)=> response.json())
        .then((publicacionData)=>{
            console.log(publicacionData)
            setPublicacion(publicacionData)
        })
    } */

    const publicaciones = async() =>{
        const response = await fetch('http://localhost:4000/api/inicio')
        const data = await response.json()
        console.log(data)
        setPublicacion(data)
    }
    //FILTRO BUSQUEDA
    //HOOKS USESTATE
    const [filtro, setFiltro] = useState('')

    //FUNCION FILTRADO
    const filtrado = (e) =>{
        setFiltro(e.target.value)
        //console.log(e.target.value)
    }

    useEffect(() => {
        if(!cookies.get('registro')){
            window.location.href = '/'
        }
        publicaciones()
        
        
      }, [])

    

    //METODO DE FILTRADO
    const resultados = !filtro ? publicacion.reverse() : publicacion.filter((dato)=>dato.catedratico.toLowerCase().includes(filtro.toLowerCase())).reverse()
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
                            <Link to="/main-perfil"><BsFillPersonFill />{cookies.get('nombres')}</Link>
                        </li>

                        <li className='ul_li'>
                            <button onClick={cerrarSesion}><AiOutlineLogout /> Cerrar Sesión</button>
                        </li>
                        
                    </ul>
                    
                </nav>
            </header>

            <main className='main-inicio'>
                <div className='publicaciones-container'>
                    {publicacion !== ''?
                        resultados.map(publicacion =>{
                            return(
                                <Publicacion
                                    key ={publicacion.id}
                                    nombreUsuario={publicacion.nombre_usuario}
                                    fecha = {publicacion.fecha}
                                    nombreCatedraticoCurso={publicacion.catedratico}
                                    detallePublicacion={publicacion.detalles}
                                />
                            )
                        })
                        : publicaciones()
                
                    }
                </div>
                <aside className='aside'>
                    <div className="group">
                        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                        <input value={filtro} onChange={filtrado} placeholder="Search" type="text" className="input"  />
                    </div>
                </aside>
                <Modal active = {active} toggle = {toggle}>
                    <form className='form-modal'> 
                            
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