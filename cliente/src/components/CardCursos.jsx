import '../stylesheets/CardCursos.css'

export default function CardCursos({codigo, nombreCurso,notaCurso, creditos}){
    return(
        <div className='card-cursos'>
            <div className='codigo-curso'>
                <span className='label'>Codigo</span>
                <span className='text'>{codigo}</span>
            </div>
            <div className='nombre-curso'>
                <span className='label'>Curso</span>
                <span className='text'>{nombreCurso}</span>
            </div>
            <div className='nota-curso'>
                <span className='label'>Nota</span>
                <span className='text'>{notaCurso}</span>
            </div>
            <div className='creditos-curso'>
                <span className='label'>Creditos</span>
                <span className='text'>{creditos}</span>
            </div>
        </div>
    )
}