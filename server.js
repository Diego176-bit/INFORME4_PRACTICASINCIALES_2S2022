const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const app = express()
app.set('port', process.env.PORT || 3000)

const dbOptions ={
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'grupo_2',
    database: 'db_informe4'
}

//middlewares--------------------------
app.use(myconn(mysql, dbOptions, 'single'))
//rutas---------------------------------
app.get('/', (req, res)=>{
    res.send('servidor corriendo')
})

//servidor running----------------------
app.listen(app.get('port'), ()=>{
    console.log('servidor corriendo xd', app.get('port'))
})
