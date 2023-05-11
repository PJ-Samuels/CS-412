var express = require('express');
const axios = require("axios");
const fetch = require("node-fetch");
var router = express.Router();
var config = require('./config.js');
const API_Token = config.API_Token;
const async = require('async')

const redis = require('redis');
const client = redis.createClient({
        port: '127.0.0.1',
        host: '6379',
        debug_mode: true
    }
);

client.on('connect', () => {
    console.log('Connected to Redis server');
});

client.on('error', (error) => {
    console.error('Redis Error:', error);
});

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);
const existsAsync = promisify(client.exists).bind(client);
const setAsync = promisify(client.set).bind(client);
const expireAsync = promisify(client.expire).bind(client);

// const expireAsync = (key, ttl) => {
//     return new Promise((resolve, reject) => {
//         client.expire(key, ttl, (err, reply) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 console.log('Expiration set successfully');
//                 resolve(reply);
//             }
//         });
//     });
// };



router.get('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  const str1 =    [   {"home":{"id":153,"name":"[Enter full Basketball team name here]","logo":"https://media-1.api-sports.io/basketball/teams/153.png"},"away":{"id":154,"name":"[Enter Another here]","logo":"https://media-1.api-sports.io/basketball/teams/154.png"}}]
    console.log(str1)
    let errorMessage = "error";
    res.json(JSON.stringify(str1));
});


//////NORMAL POST WITHOUT REDIS
// router.post('/', async function(req, res) {
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': API_Token,
//             'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
//         }
//     };
//
//     try {
//         const response = await fetch('https://api-basketball.p.rapidapi.com/games?date=2019-11-26', options);
//         const data = await response.json();
//         // console.log(data)
//         const arr = data.response;
//         // console.log(arr)
//         const searchedHome = req.body.home.name.toLowerCase();
//         const searchedAway = req.body.away.name.toLowerCase();
//         // console.log(arr[0].teams.home.name)
//         const games = arr.filter(game =>
//             game.teams.home.name.toLowerCase().includes(searchedHome) ||
//             game.teams.away.name.toLowerCase().includes(searchedHome) ||
//             game.teams.home.name.toLowerCase().includes(searchedAway) ||
//             game.teams.away.name.toLowerCase().includes(searchedAway)
//     ).map(game => game.teams);
//         // console.log("games",games)
//         res.json(games);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal server error');
//     }
// });

////***NOTE**** this is the post including redis, but there was an issue getting expire to run with the other async calls from the api
////***NOTE***** you can test the section it does give you one calls worth of data but you have to restart, there were issues with my redis server preventing me from getting full functionality

/////POST WITH REDIS FUNCTIONALITY
router.post('/', async function(req, res) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_Token,
            'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
        }
    };
    try {
        const searchedHome = req.body.home.name.toLowerCase();
        const searchedAway = req.body.away.name.toLowerCase();

        const cacheKey = `games:${searchedHome}:${searchedAway}`;
        if (!client.connected) {
            await client.connect((error) => {
                if (error) {
                    console.error('Redis client connect error', error);
                } else {
                    console.log('Redis client connected');
                }
            });
        }
        const cacheExists = existsAsync(cacheKey);
        if (cacheExists === true) {
            const cachedData = await getAsync(cacheKey);
            const games = JSON.parse(cachedData);
            res.json(games);
        } else {
            const response = await fetch('https://api-basketball.p.rapidapi.com/games?date=2019-11-26', options);
            const data = await response.json();
            const arr = data.response;
            console.log(arr)

            const games = arr.filter(game =>
                game.teams.home.name.toLowerCase().includes(searchedHome) ||
                game.teams.away.name.toLowerCase().includes(searchedHome) ||
                game.teams.home.name.toLowerCase().includes(searchedAway) ||
                game.teams.away.name.toLowerCase().includes(searchedAway)
            ).map(game => game.teams);

            setAsync(cacheKey, JSON.stringify(games));
            expireAsync(cacheKey, 60)
                .then(result => {
                    console.log('Expiry set:', result);
                    // client.quit();
                })
                .catch(error => console.error(error))
                .finally(() => client.quit());
            res.json(games);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
    finally {
        await client.quit();
    }
    console.log("finished")
});

module.exports = router;
