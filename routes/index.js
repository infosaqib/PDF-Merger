const express = require('express'),
  router = express.Router(),
  multer = require('multer'),
  upload = multer({ dest: 'uploads/' }),
  { mergerPdfs, clearUploadsFolder } = require('../controllers/merge'),
  path = require('path');





/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'PDf Merger App' });
});

router.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {

  const filePathOne = req.files[0].path;
  const filePathTwo = req.files[1].path;

  await mergerPdfs(filePathOne, filePathTwo)
  res.redirect('/static/merged.pdf');

  //Clear the uploads folder
  clearUploadsFolder();

});



module.exports = router;
