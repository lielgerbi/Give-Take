const path = require('path');

const uploadFile = (req, res) => {
  
  if (!req.body.formData) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const filePath = path.join(__dirname, '..', 'uploads');
  console.log(filePath)

  // Process the file as needed (e.g., save file path to a database)

  res.status(200).json({ filePath });
};

// const getFile= async (req, res) => {
//   res.sendFile(path.join(__dirname, "../uploads/fed4ddb2-11ea-4808-829d-92793de11972.png"));
//   res.status(200)
// };

module.exports = {
  uploadFile
};



// import multer from "multer"
// const base ="http://localhost:443/"
// const storage = multer.diskStorage({
//     destination : function (req,file,cd){
//         cd(null,'public/')
//     },
//     filename : function(req,file,cd){
//         const ext = file.originalname.split('.')
//         .filter(Boolean)
//         .splice(1)
//         .join('.')
//        cd(null, Date.now()+"."+ext)
//     }
// })
// const upload = multer({storage:storage})

// const saveFile = async (req, res) => {
//     upload.single("file")
//     res.status(200).send({url:base+req.file.path})
//   };

//   module.exports = {
//      saveFile
//   };