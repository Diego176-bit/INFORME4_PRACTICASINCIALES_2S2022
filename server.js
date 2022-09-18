const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const app = express()
const routes = require('./routes')


app.set(cors())
app.listen(4000, ()=> console.log('hola soy el servidor'))

const dbOptions ={
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'grupo_2',
    database: 'db_informe4'
}

//middlewares--------------------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
//rutas---------------------------------
app.get('/', (req, res)=>{
    res.send('hola soy el servidor')
})

//ruta para enviar credenciales de inicio de sesión
app.post('/iniciar-sesion', (req, res)=>{
    const { username, password } = req.body
    const values = [username, password]
    let connection = mysql.createConnection(dbOptions) 
    connection.query('SELECT * FROM usuarios WHERE registro = ? AND password = ?', values, (err, result)=>{
        if (err) return res.status(500).send(err)
        if(result.length > 0){
            res.status(200).send(result[0])
        }else{
            res.status(400).send('usuario no encontrado')
        }
        connection.end()
    })
})

app.use('/api', routes)

//servidor running----------------------
app.listen(app.get('port'), ()=>{
    console.log('servidor corriendo xd', app.get('port'))
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
