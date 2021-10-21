const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define Path for config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewDir = path.join(__dirname,'../templates/views')
const parDir = path.join(__dirname,'../templates/partials')

//Loads the handlebars module
const handlebars = require('express-handlebars');

//setup hbs engine, and view location
app.set('view engine', 'handlebars');
app.set('views',viewDir)
hbs.registerPartials(parDir)

//setup static dir
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index.hbs',{
        title:'Weather App',
        name:'Anthony'
    })
})
app.get('/help',(req,res)=>{
    res.render('help.hbs',{
        title:'Help Page',
        name:'Anthony ',
        text:'Information'
    })
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'About Page',
        name:'Budianto'
    })
})

app.get('/Weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'No Address Provided'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You Must Provide search'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404.hbs',{
        errorMassage:'Help Article not found',
        title:'404',
        name:'Anthony'
    })
}) 

app.get('*',(req,res)=>{
    res.render('404.hbs',{
        name:'Anthony',
        title:'404',
        errorMassage:'Page Not Found'
    })
})

app.listen(3000,()=>{
    console.log('Server is Running ...')
})