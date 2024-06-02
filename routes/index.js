var express = require('express');
const multer = require('multer');//To enable file upload
var router = express.Router();
const fs = require('fs');
const path=require('path')

const photoUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, fun) {
      fun(null, './public/images'); //set the destination path
    },
    filename: function (req, file, fun) {
      fun(null, file.originalname); //set the destination filename
    }
  })
}).array('uploads');

router.get("/excel", function (req, res) {
  //downloading a excel
  const stats = fs.statSync('public/test.xlsx');
  const fileSizeInBytes = stats["size"]; //get the size of the file
  console.log(fileSizeInBytes);
   res.set("Content-Length", fileSizeInBytes);
   res.set("Content-Disposition", 'attachment;filename="test.xlsx"');
    //res.send(data);
  res.sendFile(path.join(__dirname, '../public', 'test.xlsx'))

})


router.get("/photos", function (req, res) {
  //downloading a json
  const stats = fs.statSync('public/photos.json');
  const fileSizeInBytes = stats["size"]; //get the size of the file
  console.log(fileSizeInBytes);
   res.set("Content-Length", fileSizeInBytes);
   res.set("Content-Disposition", 'attachment;filename="photos.json"');
    //res.send(data);
  res.sendFile(path.join(__dirname, '../public', 'photos.json'))

})


router.post('/uploadPhoto', function (req, res) {
  //uploading single/multiple images
  photoUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err); //Multer error
    } else if (err) {
      console.log(err); //Some other error
    }
  })
  res.send({ message: 'file uploaded' });
})

module.exports = router;
