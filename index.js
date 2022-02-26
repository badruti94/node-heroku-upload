const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
require('dotenv').config()
const cors = require('cors')

const app = express()


const storage = multer.memoryStorage()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors())
const upload = multer({
    storage
}).single('file')

app.post('/tes', upload, async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'uploads',
        use_filename: true,
        unique_filename: false
    })
    console.log(result);
    res.send('tes');
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Running....`);
})