var express=require('express');
var router=express.Router();
var equipment=require('../model/equipment');
var inventory=require('../model/sportsinventory_model');
//wait ek min

router.get('/',function(req,res,next){
    equipment.find(function(err,docs){
        if(err)
        {
            console.log(err);
            res.json(err);
        }
        else
        {
            console.log(docs);
            res.json(docs);
        }
    }).populate('equipment_id');
});



router.post('/',function(req,res,next){
    const equi=new equipment({
        equipment_id : req.body.equipment_id,
        student_id : req.body.student_id,
        issue_date : req.body.issue_date,
        return_date : req.body.return_date,
        loan : req.body.loan
        
    });
    console.log(equi);
    equi.save(function(err,result){
        if(err)
        {
            res.json(err);
        }
        else{
                console.log(result);
                inventory.updateOne({_id:result.equipment_id},{$inc:{NumberOfAvailable:-1}},function(err,result){
                    if(err)
                        res.json(err);
                    res.json(result);
                });
            //res.json(result);
        }
    });
})

router.put('/:id',function(req,res,next){
    equipment.findById(req.params.id,function(err,docs){
        console.log(docs);
        if(err)
        {
            res.json(err);
        }// wait ek min
        else
        {
            //res.json(docs);
            docs.equipment_id = req.body.equipment_id;
            docs.student_id = req.body.student_id;
            docs.issue_date = req.body.issue_date;
            docs.return_date = req.body.return_date;
            docs.loan = req.body.loan;
            
            docs.save(function(err1,res1){
                if(err1)
                {
                    res.json(err1);
                }
                else
                {
                    res.json(res1);
                }
            });

        }
    });
});



router.delete('/:id',function(req,res,next){
    equipment.deleteOne({_id:req.params.id},function(err,result){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(result);
        }
    })
});

module.exports=router;
