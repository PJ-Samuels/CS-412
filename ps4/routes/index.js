var express = require('express');
const axios = require("axios");
var router = express.Router();
var config = require('../config.js');
const fetch = require("node-fetch");
const async = require('async')
let token = config.API_TOKEN;

router.get('/', function(req, res, next) {
    res.render('index');
});
router.post('/searchRouter', async function(req,res){
    searchedTeam = req.body.team
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': token,
        'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
      }
    };

    const response = await fetch('https://api-basketball.p.rapidapi.com/games?date=2022-11-26', options);
    const data = await response.json();
    console.log("data",data);

    let arr = data.response;
    let games = arr.filter(game =>
        game.teams.home.name.toLowerCase().includes(searchedTeam.toLowerCase()) ||
        game.teams.away.name.toLowerCase().includes(searchedTeam.toLowerCase())
    ).map(game => game.teams)
    //console.log(games)
    console.log(JSON.stringify(games))
    res.render('searchpage', {games: games});

});

router.get('/async_await', async function(req, res){
  console.log("games post hitting");
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': token,
      'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch('https://api-basketball.p.rapidapi.com/games?date=2022-11-26', options);
    const data = await response.json();
    let arr = data.response;
    let games = arr.map(game => game.teams);
    // console.log(games);
    console.log(JSON.stringify(games))
    res.render('searchpage', {games: games});
  } catch (error) {
    console.error(error);
  }
});

router.get('/callback', function(req, res){
  // console.log("games post hitting");
  const options = {
    method: 'GET',
    params: {date: '2019-11-26'},
    headers: {
      'X-RapidAPI-Key': 'a7794b9a36mshed157cdb4537f8ap1b3af5jsn3878cc4f1a3c',
      'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
    }
  };

  fetch('https://api-basketball.p.rapidapi.com/games?date=2022-11-26', options)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        let arr = data.response;
        let games = arr.map(game => game.teams);
        res.render('searchpage', {games: games});
      })
      .catch(error => {
        console.error(error);
      });
});

router.post('/',function(req,res){
  console.log("games post hitting")
  const gamePromise = function () {
    return new Promise((resolve, reject) => {
      const axios = require("axios");
      console.log("Token is",token)
      const options = {
        method: 'GET',
        url: 'https://api-basketball.p.rapidapi.com/games',
        params: {date: '2022-11-26'},
        headers: {
          'X-RapidAPI-Key': token,
          'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
        }
      };

      axios.request(options).then(function (response) {
        let arr = response.data.response;
        let games = arr.map(game => game.teams);
        res.render('searchpage', {games: games});
        resolve(response.data)
      }).catch(function (error) {
        reject(error)
        console.error(error);
      });
    });

  }
  gamePromise()
      .then(
          value => {
            console.log(value);
            return value.length;
          });
});

module.exports = router;
