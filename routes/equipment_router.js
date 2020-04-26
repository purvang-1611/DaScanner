var express = require('express');
var router = express.Router();
var equipment = require('../model/equipment');
var inventory = require('../model/sportsinventory_model');
var sacrecords = require('../model/SacRecords_model');

router.get("/", function (req, res, next) {
    inventory.find(function (err, inventoryrecord) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('equipment_borrow', { data: { stock: inventoryrecord } });
            //res.json(inventoryrecord);
        }
    });
});


// router.get('/',function(req,res,next){
//     inventory.find(function(err,inventoryrecord){
//         if(err){
//             res.send(err);
//         }
//         else{
//             console.log(inventoryrecord);
//             res.render('equipment_details',{data:{result:inventoryrecord}});
//         }
//     });
// });



router.post('/', function (req, res, next) {
    equipment.find({ student_id: req.body.studentID, equipment_id: req.body.equipmentID }, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            if (rows.length == 0) {
                var x = Date.now();
                var dat_obj = new Date(x);
                const equi = new equipment({
                    equipment_id: req.body.equipmentID,
                    student_id: req.body.studentID,
                    issue_date: new Date(dat_obj.getFullYear(), dat_obj.getMonth(), dat_obj.getDate()),
                    quantity: req.body.quantity


                });
                console.log(equi);
                equi.save(function (err, result) {
                    if (err) {
                        res.json(err);
                    }
                    else {
                        //res.json(result);
                        /*var data={
                            "id":req.body.studentID,
                            "equipment":req.body.equipmentID,
                            "Quantity":req.body.quantity,
                            "return_date":new Date(dat_obj.getFullYear(),dat_obj.getMonth(),dat_obj.getDate()+7)
                        };
                       mail_equ.sendMail(data);*/
                       
                            inventory.updateOne({_id:result.equipment_id},{$inc:{NumberOfAvailable:-result.quantity}},function(err,result){
                                if(err)
                                    res.json(err);
                                    res.redirect('/equipment');
                            });
                    }
                });
            }
            else {
                console.log("record is already there");
                console.log(rows);
                var x = Date.now();
                var dat_obj = new Date(x);
                //quantity aema hase j so eno use karine loan nu karje
                //console.log(dat_obj-rows[0].issue_date);

                var dat_obj1 = new Date(rows[0].issue_date);
                const diffTime = Math.abs(dat_obj - dat_obj1);
                var loan1 = 0;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays > 7) {
                    loan1 = (diffDays - 7) * 5
                }
                const sac1 = new sacrecords({
                    equipment_id: rows[0].equipment_id,
                    student_id: rows[0].student_id,
                    issue_date: rows[0].issue_date,
                    quantity:rows[0].quantity,
                    return_date: new Date(dat_obj.getFullYear(), dat_obj.getMonth(), dat_obj.getDate()),
                    loan: loan1



                });
               // console.log(sac1);
                sac1.save(function (err, result) {
                    if (err) {
                        res.json(err);
                    }
                    else {
                        //res.json(result);
                        console.log(result);
                        inventory.updateOne({_id:result.equipment_id},{$inc:{NumberOfAvailable:result.quantity}},function(err,result){
                            if(err)
                                res.json(err);
                            equipment.deleteOne({ student_id: req.body.studentID, equipment_id: req.body.equipmentID }, function (err, result) {
                                    if (err) {
                                        res.json(err);
                                    }
                                    else {
                                        res.redirect('/equipment');
                                        
                                    }
                                });
                        });
                                
                       
                        
                    }
                });
            }
        }
    })
})

router.put('/:id', function (req, res, next) {
    equipment.findById(req.params.id, function (err, docs) {
        console.log(docs);
        if (err) {
            res.json(err);
        }
        else {
            //res.json(docs);
            docs.equipment_id = req.body.equipment_id;
            docs.student_id = req.body.student_id;
            docs.issue_date = req.body.issue_date;
            docs.return_date = req.body.return_date;
            docs.loan = req.body.loan;

            docs.save(function (err1, res1) {
                if (err1) {
                    res.json(err1);
                }
                else {
                    res.json(res1);
                }
            });

        }
    });
});



router.delete('/:id', function (req, res, next) {
    equipment.deleteOne({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    })
});

module.exports = router;
