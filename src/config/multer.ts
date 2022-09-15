import multer from "multer";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },

});
const fileFilter = multer({
  fileFilter: function(req, file, cb) {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype ==='image/jpeg'){
      cb(null, true)
    }else{
      cb(null, false)
    }
  }
  
})

const upload = multer({ 
  storage: storage,
 // fileFilter : fileFilter,
  limits:{
    fileSize: 1024 * 1024 * 5  //limitando o tamanho do arquivo
  },  

 

}) 

export default 
    upload
    fileFilter;