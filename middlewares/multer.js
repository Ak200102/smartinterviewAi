// import multer from "multer"

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, "public")
//     },
//     filename: function(req , file , cb){
//         const filename = Date.now() + "-" + file.originalname;
//         cb(null , filename)
//     }
// })


// export const upload = multer({
//     storage,
//     limits: { fieldSize: 5 * 1024 * 1024},
// })
import multer from "multer"
import fs from "fs"

const uploadPath = "public"

// create folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadPath)
    },
    filename: function(req , file , cb){
        const filename = Date.now() + "-" + file.originalname;
        cb(null , filename)
    }
})

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }  // also fix this
})