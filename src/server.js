const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const body_parser = require('body-parser')
const {landingPage, studyPage, teachPage, addTeacherPage} = require("./pages") 

//configurar nunjucks
nunjucks.configure('src/views',{
    express: server,
    noCache: true,
})


server

//receber dados do req.body codificado
.use(body_parser.urlencoded({ extended: true}))
.use(body_parser.json())
//configurar arquivos estaticos
.use(express.static("public"))
//rotas da app
.get("/", landingPage)
.get("/study", studyPage)
.get("/teach", teachPage)
.post("/add-teacher", addTeacherPage)
.listen(5500)