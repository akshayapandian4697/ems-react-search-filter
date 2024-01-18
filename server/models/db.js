const mongoose = require('mongoose')

mongoose.connect(
    'mongodb+srv://tharumanoj:admintharu@cluster0.c9nteks.mongodb.net/emsTharani?retryWrites=true&w=majority',
    { useNewUrlParser: true }, (error) => {
        console.log(error, "Connected");
    })

mongoose.connection.on("connected", function(){
    console.log("Database connected successfully");
})