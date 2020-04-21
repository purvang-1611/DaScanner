const monoogse=require('../dbconnection');

const inventorySchema=monoogse.Schema({
    name:{type:String},
    NumberOfItems:{type:Number},
    NumberOfAvailable:{type:Number},
    versionKey: false

});

module.exports=monoogse.model('inventorytb',inventorySchema);