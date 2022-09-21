
import '../stylesheets/Publicacion.css'



function Publicacion({nombreUsuario, fecha, nombreCatedraticoCurso, detallePublicacion}){

    return(
        <div className='card'>
            <div className= 'nombre-fecha_container'>
                <span className='nombre-usuario'>{nombreUsuario}</span>
                <span className= 'fecha'>{fecha}</span>
            </div>
            <strong className = 'nombre-catedratico-curso'>{nombreCatedraticoCurso}</strong>
            <div className='detalle-publicacion-container'>
                <p>{detallePublicacion}</p>
            </div>
        </div>

    )
}

export default Publicacion