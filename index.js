const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
require('dotenv').config()
const cors = require('cors')
const DatauriParser = require('datauri/parser')
const path = require('path')

const app = express()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors())


const parser = new DatauriParser()
const storage = multer.memoryStorage()
const upload = multer({
    storage
}).single('file')

app.post('/tes', upload, async (req, res) => {
    const file = parser.format(path.extname(req.file.originalname).toString(), req.file.buffer).content
    const result = await cloudinary.uploader.upload(file, {
        folder: 'uploads',
        use_filename: true,
        unique_filename: false
    })
    res.json(result)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Running....`);
})