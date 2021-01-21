const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 9999;
require('./app/helpers/DB');
const {userRouter} = require('./app/routes/user.route');
const {postRouter} = require('./app/routes/post.route');
const {commentRouter} = require('./app/routes/comment.route')
const {tagRouter} = require('./app/routes/tag.route')
const cors = require('cors');

app.use(express.static('uploads'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use((req, res, next) => {
    res.onError = function(error) {
        const body = { success: false, message: error.message };
        if (!error.statusCode) console.log(error);
        res.status(error.statusCode || 500).send(body);
    };
    next();
});
app.use('/user', userRouter);
app.use('/post',postRouter);
app.use('/comment',commentRouter);
app.use('/tag',tagRouter);
app.get('/', (req,res)=>
{
    res.send("<h1>WEB SERVICE BLOG</h1>")
})
app.listen(port, function() {
    console.log('Server is running on Port:', port);
});