const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')

require('./db/connection')
const Stocks = require('./models/schema')

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/Images")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer ({
    storage: storage
})

app.post('/upload', upload.single('file'), (req, res) => {
    Stocks.create({image: req.file.filename})
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.get('/getImage', (req, res) => {
    Stocks.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/', async(req, res) => {
    const stock = new Stocks(req.body);
    const result = await stock.save();
    res.send(result);
})


const port = 5000
console.log(`running on port : ${port} `)

app.listen(port)