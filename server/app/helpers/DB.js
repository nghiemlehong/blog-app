// DB.js
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
//mongoose.connect('mongodb+srv://admin:123@cluster0-jxecg.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true } )
mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true,useUnifiedTopology: true } )
    .then(() => console.log('Database Connected '))
    .catch((err) =>  {
        console.log(err);
        process.exit(1);
    });