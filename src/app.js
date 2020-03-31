const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const app = express()
const port = process.env.PORT || 3000
const publicdir = path.join(__dirname,'../public')

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars and view locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup public dir
app.use(express.static(publicdir))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Luca Tassi'
    })
})
app.get('/about',(req,res)=>{
     res.render('about',{
         title:'About page',
         name:'Luca Tassi'
     })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        helpText:'Questa è la pagina di help',
        name:'Luca Tassi'
    })
})
app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
        
    }
    console.log(req.query.search)
    console.log(req.query.rating)
    res.send({
       products: []
    })
})
app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'Please provide an address'
        })      
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({error:error})
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location:data.location,
                address:req.query.address
            })

            //console.log(data.location)
            //console.log(forecastData)
        })
    })

    // res.send({
    //     forecast:'Cloudy',
    //     location:'sassol',
    //     address:req.query.address
    // })
})

/*
if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, data) => {
        if (error) {
            return console.log(error)
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(data.location)
            console.log(forecastData)
        })
    })
}
*/

app.get('/help/*',(req,res) => {
    //res.send('Help 404 page: Article not found')
    res.render('404',{
        title:'404 Help page',
        helpText:'L \'articolo non esiste',
        name:'Luca Tassi'

    })
})
//* route needs to be the last to work
app.get('*',(req,res) => {
    //res.send('My 404 page')
    res.render('404',{
        title:'404',
        helpText:'NOT FOUND',
        name:'Luca Tassi'

    })
})

// app.get('',(req,res) => {
//     res.send('<h1>Ciao express</h1>')
// })
// app.get('/help',(req,res)=>{
//     res.send('Help page')
// })
// app.get('/about',(req,res)=>{
//     res.send('about page')
// }) nb9gft
app.get('/weather',(req,res)=>{
    //res.send('<h1>Weather</h1>')
    /* res.send([
        {name: 'Lucaa',age:37},
        {name: 'Vally',age:37}
    ]
    ) */
    res.send({forecast:'Sunny',
    location:'Sassuolo'})
})

// app.listen(3000, () => {
app.listen(port, () => {
    console.log('il server sta andando sulla porta ' + port)  
})