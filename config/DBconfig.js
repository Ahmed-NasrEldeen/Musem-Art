const mongoose = require('mongoose')
require('dotenv').config({ path: './keys' })
const {mangoosedb} = require('./keys')
let database ;
const mongo =  mongoose.connect(mangoosedb,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify: false})
.then(
( db) =>{ 
database =db    
console.log('Synced models with database 💃 .')
})
.catch(error => console.log('Could not sync models with database 🤦 .', error))




module.exports = database

