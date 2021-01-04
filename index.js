const { response } = require('express');
var express = require('express')
var mysqlDAO = require('./mysqlDAO')
var mongoDAO = require('./mongoDAO')
var bodyParser = require('body-parser')

var app = express()

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))

//Home page
app.get('/', function (req, res) {
    res.render("index.ejs")// links to different pages
})

// Countries page
app.get('/countries', function (req, res) {
    mysqlDAO.getCountries()
            .then((result) => {
                console.log(result)
                res.render('showCountries', {countries:result})// setting variable countries = result
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
        console.log(documents)
        res.render('showStateHeads', {StateHeads:documents})
        //res.send(documents)
    })
    .catch((error) => {
        res.send(error)
    })
})

app.get('/addHeadOfState',(req, res) => {// adding head of state
    res.render("addStateHead")
})

app.post('/addHeadOfState',  (req, res) => {// sending data to database
    mongoDAO.addStateHead(req.body._id, req.body.headOfState)
        .then((result)=> {
            res.redirect("/stateHeads")
        })
        .catch((error) => {
            if(error.message.includes("11000")){ // error code if id entered already exists
                res.send("<h1>Error: Employee with ID " + req.body._id + " already exists !!")
            }
            else {
                res.send(error.message)
            }
        })
})

app.get('/addCountry',(req, res) => {// adding country
    res.render("addCountry")
})

app.post('/addCountry', (req, res) => { // adding new country
    mysqlDAO.addCountry(req.body.co_code, req.body.co_name, req.body.co_details)
    .then((result)=> {
        res.redirect("/countries")
    })
    .catch((error) => {
        res.send(error)
    })
})

app.get('/delete/:id', (req, res) => { // deleting country
    console.log("im in " + req.params.id)
    mysqlDAO.deleteCountry(req.params.id)
      .then((result) => {
        console.log(result);
        res.redirect('../countries');
  
      }).catch((error) => {
            res.send("Error Message: " +req.params.id +" has cities, it cannot be deleted" );  
      })
  
  })

app.listen(3000)
console.log("Listening on Port 3000")