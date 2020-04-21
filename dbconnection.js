const mongoose=require('mongoose');
const url="mongodb://localhost/DaScanner";
mongoose.connect(url,{useNewUrlParser:true},function(err){
    if(err){
        console.log("Error when connection...");
    }
    else{
        console.log("connected");
    }
});

module.exports=mongoose;