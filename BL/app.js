var express = require('express');

const bodyParser = require('body-parser');
var app = express();
var db = require('./db');
var user = require('./user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/users', user.createUsers);
app.get('/users', user.seeResults);
app.delete('/users/:id', user.delete);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
