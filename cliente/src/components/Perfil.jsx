
import { useState, useEffect } from "react"
import { AiFillHome, AiOutlineLogout } from "react-icons/ai"
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../stylesheets/Perfil.css'
import Modal from "./Modal"
import Cookies from 'universal-cookie'
import { RiAddCircleFill } from "react-icons/ri"
import CardCursos from "./CardCursos"


export default function Perfil(){
    const cookies = new Cookies()
    const [body, setBody] = useState({registro: cookies.get('registro'), codigo_curso: '',nombre_curso: '', nota: '', creditos: '' })
    const [curso, setCurso] = useState([])
    
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
        axios.post('http://localhost:4000/api/cursos-aprobados', body)
        .then(({data})=>{
            console.log(data)
            alert('Curso agregado con éxito!')
            toggle()
        })
        .catch(({response})=>{
            console.log(response)
        })
    }
    //CONSUMIR LA API
    const cursos = async() =>{
        const response = await fetch('http://localhost:4000/api/get-cursos-aprobados')
        const data = await response.json()
        console.log(data)
        setCurso(data)
    }

    useEffect(() => {
        cursos()
    },[])
    const resultados =  curso.filter((dato)=>dato.registro.includes(cookies.get('registro')))
    function filtro(registro){
        return (registro == cookies.get('registro'))
    }
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
                            <Link to = '/inicio'><AiFillHome/> Inicio</Link>
                        </li>

                        <li className='ul_li'>
                            <button onClick={toggle}><RiAddCircleFill /> Agregar Curso</button>
                        </li>
                        
                    </ul>
                    
                </nav>
            </header>

            <main className='main-perfil'>
                <div className='datos-container'>
                    <span>{cookies.get('registro')}</span>
                    <span>{`${cookies.get('nombres')} ${cookies.get('apellidos')}`}</span>
                    <span>{cookies.get('correo_electronico')}</span>
                    
                </div>
                <div className='creditos-container'>
                    <span className='creditos'>Créditos 63</span>
                </div>
            </main>
            <hr/>
            <section>
            {curso !== ''?
                        resultados.map(curso =>{
                            return(
                                <CardCursos
                                    key ={curso.id}
                                    codigo = {curso.codigo_curso}
                                    nombreCurso = {curso.nombre_curso}
                                    notaCurso = {curso.nota}
                                    creditos = {curso.creditos}


                                />
                            )
                        })
                        : cursos()
                
                    }
                <Modal active = {active} toggle = {toggle}>
                    <form className='form-modal'> 
                            

                            <input 
                                type="text" 
                                placeholder="Código del Curso"
                                 value={body.codigo_curso}
                                onChange = {inputChange}  
                                name = 'codigo_curso'
                            />

                            <input 
                                type="text" 
                                placeholder="Nombre del Curso"
                                value={body.nombre_curso}
                                onChange = {inputChange}  
                                name = 'nombre_curso'
                            />

                            <input 
                                type="text" 
                                placeholder="Nota Aprovatoria" 
                                value={body.nota}
                                onChange = {inputChange}
                                name = 'nota'    
                            />
                            <input 
                                type="text" 
                                placeholder="Créditos" 
                                value={body.creditos}
                                onChange = {inputChange}
                                name = 'creditos'    
                            />
                            <div className='buttons-container'>
                                <input 
                                    type="submit" 
                                    value="Guardar" 
                                    onClick={onSubmit} 
                                    
                                />
                                <button onClick={toggle}>Cancelar</button>
                            </div>

                        </form>
                </Modal>
            </section>
                
            
        </>
        
        
    )
}