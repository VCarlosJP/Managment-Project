const express = require('express');
const router = express.Router();

const fileUpload = require('express-fileupload');

router.use(fileUpload());
const fs = require('fs');

const Minuta = require('../models/file');

router.post('/postMinuta/:camp/:well', async (req, res) => {
    if(req.files){
        var file = req.files.file, filename = file.name;
        file.mv('C:/Users/Vills/Documents/ManagmentDB/'+filename,function(err){
            if(err)
                res.json({status: "shit"});
            else
                {
                    minuta = new Minuta({
                        camp: req.params.camp,
                        well: req.params.well,
                        name: filename,
                    })
                    minuta.save();
                }
        })
    }
});

router.get('/Minutas/:camp/:well', async (req, res) => {
    const minutas = await Minuta.find({ camp: req.params.camp, well: req.params.well});
    res.json(minutas);     
});


router.get('/Minuta/:id', function(req, response){
    var tempFile="C:/Users/Vills/Documents/ManagmentDB/"+req.params.id;
    fs.readFile(tempFile, function (err,data){
       response.contentType("application/pdf");
       response.send(data);
    });
  });

module.exports = router;