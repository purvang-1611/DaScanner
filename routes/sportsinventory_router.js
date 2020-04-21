const express=require('express');
const router=express.Router();
const inventorytb=require('../model/sportsinventory_model');

router.get("/",function(req,res,next){
    inventorytb.find(function(err,inventoryrecord){
        if(err){
            return res.send(err);
        }
        console.log(inventoryrecord);
        res.render('inventory_detail',{data:{stock:inventoryrecord}});
    });
});

router.post("/updatestock",function(req,res,next){
    //let newdata=new inventorytb(req.body);
    console.log(req);
    
    //console.log(newdata);
    /*inventorytb.insertMany(req.body,function(err,record){
        if(err)
            return res.send(err);
        else
            return res.json(record);
    });*/
});

router.put('/:id',function(req,res,next){
    inventorytb.updateOne({_id:req.params.id},req.body,function(err,record){
        if(err)
            return res.send(err);
        return res.json(record);
    });
});

router.delete('/:id',function(req,res,next){
    inventorytb.deleteOne({_id:req.params.id},function(err,record){
        if(err)
            return res.send(err);
        return res.json(record);
    });
});
module.exports=router;