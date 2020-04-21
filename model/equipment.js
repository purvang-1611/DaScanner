const db=require('../dbconnection');


const equipmentSchema=db.Schema({
    equipment_id : {type:db.Schema.ObjectId,ref:"inventorytb"},
        student_id : {type:String},
        issue_date : {type:String},
        return_date : {type:String},
        loan : {type:Number}
       
});

module.exports=db.model('equipments_borrow',equipmentSchema);