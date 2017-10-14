var mongoose = require('mongoose');
var Ulozak = new mongoose.Schema({
    lrUnitId: {
        type: String
    }
});

mongoose.model('Ulozak', Ulozak, 'ulosci');
mongoose.connect('mongodb://localhost:27017/cupo', { 
    promiseLibrary: global.Promise, useMongoClient: true 
});
