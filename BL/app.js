var express = require('express');
var fs = require('fs');
const bodyParser = require('body-parser');
var app = express();
var db = require('./db');
var ulozak = require('./ulozak');
var cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/ulosci', ulozak.seeResults);
app.get('/institucije', ulozak.getInstitutions);
app.post('/glavneknjige', ulozak.getMainBooks);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
