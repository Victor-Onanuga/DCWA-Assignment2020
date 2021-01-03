const { response } = require('express');
var express = require('express')
var mysqlDAO = require('./mysqlDAO')
var mongoDAO = require('./mongoDAO')

var app = express()

app.set('view engine','ejs')

//Home page
app.get('/', function (req, res) {
    res.render("index.ejs")// links to different pages
})

// Countries page
app.get('/countries', function (req, res) {
    mysqlDAO.getCountries()
            .then((result) => {
                console.log(result)
                res.render('showCountries', {countries:result})// setting variable cities = result
            })
            .catch((error) => {
                res.send(error)
            })
})

//Cities page
app.get('/cities', function (req, res) {
    mysqlDAO.getCities()
            .then((result) => {
                console.log(result)
                res.render('showCities', {cities:result})// setting variable cities = result
            })
            .catch((error) => {
                res.send(error)
            })
    
})

// Gets city details
app.get('/cities/:details', (req, res) => {
    mysqlDAO.getCityDetails(req.params.details)
        .then((result) => {
            if(result.length > 0){
                res.send(result)
            }
            else{
                res.send("<h3>!! No such City with this code : " + req.params.details)
            }
            
        })
        .catch((error) =>{
            res.send(error)
        })
})

app.get('/stateHeads', (req, res) => {
    mongoDAO.getStateHeads()// retrieving and outputting data from mongo DB
    .then((documents) => {
        res.send(documents)
    })
    .catch((error) => {
        res.send(error)
    })
})

app.listen(3000)
console.log("Listening on Port 3000")