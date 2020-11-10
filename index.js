// index.js

const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')


const app = express()
const port = 3000


// views configuration
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

// interceptors
app.use((request, response, next) => {
  console.log(request.headers)
  next()
})

app.use((request, response, next) => {
  request.random = Math.random()
  next()
})

// last interceptor -> error handler
app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Something broke!')
})

// endpoints
app.get('/render', (request, response) => {
  response.render('home', {
    name: 'John Rambo'
  })
})


app.get('/hello-world', (request, response) => {
  response.json({
    random: request.random,
    message: 'Hello World'
  })
})

// server init
app.listen(port, () => {
  console.log(`server is listening on ${port}`)
})