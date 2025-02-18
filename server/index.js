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

const upload = multer({
    storage: storage
})

// Combined endpoint for products with image upload
app.post('/products', upload.single('file'), async (req, res) => {
    try {
        const productData = {
            title: req.body.title,
            description: req.body.description,
            prix: req.body.prix,
            stock: req.body.stock
        };
        
        // If file was uploaded, add image field
        if (req.file) {
            productData.image = req.file.filename;
        }
        
        const product = new Stocks(productData);
        const result = await product.save();
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Keep these endpoints for backward compatibility
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

app.get('/stocks', async(req, res) => {
    try{
        const stock = await Stocks.find();
        res.status(200).json(stock);
    } catch (error){
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/stocks/:id', async(req, res) => {
    try{
        const result = await Stocks.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ error: "user not found" });
        }
        res.status(200).json({ message: "deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

const port = 5000
console.log(`running on port : ${port} `)

app.listen(port)