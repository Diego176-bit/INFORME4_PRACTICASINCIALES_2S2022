const express = require('express')
const routes = express.Router()

routes.get('/inicio', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM cursos', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


routes.post('/registro', (req, res)=>{
    req.getConnection((err, conn)=>{
        if (err) return res.send(err)
        conn.query('INSERT INTO usuarios set ?',[req.body], (err, rows)=>{
            if (err) return res.send(err)

            res.send('Registro exitoso!')
        })
    })
})

routes.post('/crear-publicacion', (req, res)=>{
    req.getConnection((err, conn)=>{
        if (err) return res.send(err)
        conn.query('INSERT INTO cursos set ?',[req.body], (err, rows)=>{
            if (err) return res.send(err)

            res.send('Registro exitoso!')
        })
    })
})

module.exports = routes