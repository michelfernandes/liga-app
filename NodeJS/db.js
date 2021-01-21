const mongoose = require('mongoose');

const uri = 'mongodb+srv://ADMIN:KPc32gFJOuD4LWMu@cluster0.ndhlx.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri,{ useNewUrlParser: true }, (err) => {
    debugger;
    if (!err)
        console.log('MongoDB connection succeeded.');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;