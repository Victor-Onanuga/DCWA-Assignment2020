var mysql = require('promise-mysql');

var pool

mysql.createPool({
    connectionLimit : 3,
    host            : 'localhost',
    user            : 'root',
    password        : 'Ola$imbo61',
    database        : 'geography'
  })
  .then((result) => {
    pool = result
  })
  .catch((error) => {
    console.log(error)
  });

  var getCities = function () {

    return new Promise((resolve, reject) => {
        pool.query('select * from city')
        .then((result) => { // when the promise is successful
            resolve(result)
        })
        .catch((error) => { // when the promise is unsuccessful
            reject(error)
        //console.log(error)
         }) 
    })
  }

  var getCountries = function () {

    return new Promise((resolve, reject) => {
        pool.query('select * from country')
        .then((result) => { // when the promise is successful
            resolve(result)
        })
        .catch((error) => { // when the promise is unsuccessful
            reject(error)
        //console.log(error)
         }) 
    })
  }

  module.exports = { getCities, getCountries }
  