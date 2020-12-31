const { response } = require('express');
var express = require('express')
var mysqlDAO = require('./mysqlDAO')

var app = express()

app.set('view engine','ejs')

app.get('/', function (req, res) {
    res.render("index.ejs")// links to different pages
})

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

app.listen(3000)
console.log("Listening on Port 3000")