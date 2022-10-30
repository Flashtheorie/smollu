const express = require('express');
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connection;
const config = require('./config/server');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var ObjectId = require('mongodb').ObjectId;
const cors = require("cors");
var base62 = require("base62/lib/ascii");
const redis = require('redis');
const { urlredis } = require('./config/server');
const bcrypt = require("bcrypt")

const  PORT = 3001;

const client = redis.createClient({
    url : urlredis
});
(async () => {
    try {
      const result = await client.connect();
      console.log('Connected to Redis : ✅');
    } catch (err) {
      console.error(err)
    }
  })()
  
app.use(cors());
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// connexion à MongoDB

mongoose.connect(config.DB_URI, async (err) => {
    if (err) {
            console.log(err);
    } else {
        console.log('Connected to MongoDB : ✅');
    }
});


app.post('/api/url/shorten', async (req, res) => {
    url = req.body.longUrl;
    console.log(url);
    var shortUrl = base62.encode(new Date().getTime());
    // search in urls mongodb
    const urls = db.collection('urls');
    const result = await urls.findOne({ longUrl: url });
    if (result) {
        res.json(result);
    }
    else {
        db.collection('urls').insertOne({longUrl: url, shortUrl: shortUrl}, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                // hSet with a 10 minutes expiration
                client.hSet('urls', shortUrl, url, 'EX', 600);
    
    
    
                res.json({shortUrl: shortUrl});
            }
        }
        );
    }

});
app.get('/:code', async (req, res) => {
    var code = req.params.code;
   
            var url = await db.collection('urls').findOne({shortUrl: code});
            if (url) {
                // hSet with a 10 minutes expiration
                client.hSet('urls', code, url.longUrl, 'EX', 600);
                return res.redirect(url.longUrl);
            } else {
                return res.status(404).send('Invalid URL');
            }

});


// how many link shortened
app.get('/api/url/shorten', async (req, res) => {
    var count = await db.collection('urls').countDocuments();
    res.json(count);
});



// register
app.post('/api/register', async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var user = await db.collection('users').findOne({email: email});
    if (user) {
        res.json({error: 'Email already used'});
    } else {
        // crypte le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        db.collection('users').insertOne({email: email, password: hash}, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result.insertedId)
            }
        }
        );
    }
});

app.listen(PORT, function(){
    console.log("Node Js Server running on port " + PORT 
     + " : ✅");
})