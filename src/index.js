const express = require('express')
const morgan = require('morgan')
const  handlebars  = require('express-handlebars');
const app = express()
const port = process.env.PORT || 3000;
const path = require('path')
const methodOverride = require('method-override')
const db = require('../src/config/db')
const cookieParser = require('cookie-parser');
const router = require('./router/index');
app.use(methodOverride('_method'))//ho tro PUT, PATH, DELETE
app.use(express.urlencoded({
  extended:true
}))
app.use(express.json());

console.log(__dirname)
app.engine('hbs', handlebars.create({extname: '.hbs'}).engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

app.use(express.static(path.join(__dirname,'public')));

app.use(morgan('combined'))
db.connect()
router(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})