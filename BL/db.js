var mongoose = require('mongoose');
const PostSchema = require('./post');
var User = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is required.']
    },
    postCount: Number,
    posts: [PostSchema]
});

mongoose.model('User', User);
mongoose.connect('mongodb://172.17.76.215:27017/users_test', { 
    promiseLibrary: global.Promise, useMongoClient: true 
});

console.log('we are connected');
