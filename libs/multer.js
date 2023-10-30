const multer = require('multer') 
const uuidv4 = require('uuid')
const path = require ('path')

// const storage = multer.diskStorage({
//     destination: 'uploads',
//     filename: (req, file, cb) => {
//         cb(null, uuidv4()+path.extname(file.originalname))
//     }
// })
// // module.export = multer
// var upload = multer({ storage: storage })

// SET STORAGE OTRA OPCION DE SUBIDA
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  var upload = multer({ storage: storage })
  module.exports = upload;