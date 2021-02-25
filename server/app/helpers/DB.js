// DB.js
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://admin:123@cluster0.clg9o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,useUnifiedTopology: true , useFindAndModify: false,} )
// mongoose.connect('mongodb://localhost/blog', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
// })
    .then(() => console.log('Database Connected '))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });