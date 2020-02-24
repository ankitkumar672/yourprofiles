//a form for route/authors
const mongoose = require('mongoose')

//in nosql db schema = table 
//defining schema
const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }//JSON object
})
//exporting schema
//by new model, name of (model || table) = Author, passes authorSchema
module.exports = mongoose.model('profile', profileSchema)