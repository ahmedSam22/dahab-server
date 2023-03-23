const path = require("path");
const multer = require("multer")



const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null , './uploads')
    },
    filename : (req,file,cb)=>{
        let ext = path.extname(file.originalname)
        cb(null , Date.now() + ext);
    
    }
})


const upload = multer ({
    storage : storage ,
    // fileFilter : (req,file,callback)=>{
    //     if(
    //         file.mimetype  == "image/jpg" || file.mimetype == "image/png"
    //     ){
    //         callback(null , true)
    //     } else {
    //         console.log("only jpg and png can uploaded");
    //         callback(null , false)
    //     }

    // },
    limits: {
        fileSize : 1024 * 1024 * 2
    }
})



module.exports = upload