const mongoose = require('mongoose')

const connectDataBase = ()=>{
    mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true,useUnifiedTopology:true }).then((data)=>{
        console.log(`mongoDb connected with server: ${data.connection.host}`)
        })
}

module.exports = connectDataBase;