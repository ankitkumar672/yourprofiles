const express = require('express')//import express from express lib
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')//for working with var in routes
const methodOverride = require('method-override')//for put and delete req, no way from browser for put and delete req
//allows to take a post form send that to server with special parameter and tells whether it is put or delete req

//importing routers
const indexRouter = require('./routes/index')//in relative path, route for index
const profileRouter = require('./routes/profiles')//route for authors

app.set('view engine', 'ejs')//set view_engine, using ejs as view_engine
app.set('views', __dirname + '/views')//setting location of views:inside a views dir, current-dir-name/views dir 
app.set('layout', 'layouts/layout')//location of layout_file, every file put inside layout_file for not dublicating same html["header", "footer"]
app.use(expressLayouts)//use express layouts which includes from lib
app.use(methodOverride('_method'))//we want parameter to be like put or delete
app.use(express.static('public'))//location of public_file, like css, js etc
app.use(bodyParser.urlencoded({ limit:'10mb', extended: false}))//sending these values by url
//-----------------------------------------------------------------------------------------------------------------------------------   
//db section
const mongoose = require('mongoose')//import mongoose
mongoose.connect('mongodb://localhost/mybrary' || process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to Mongoose"))

//app to use routers
//('route of application', handle that route)
app.use('/', indexRouter)//'/' for main index file
app.use('/profiles', profileRouter)//'/authors' for author file

app.listen(process.env.PORT || 3000)//app to listen to port has two options