const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const data = require('./data.json');

const app = express();
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../build')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

const filesUpload = multer({
    storage: multer.diskStorage(
        {
            destination: (req, file, cb) => {
                console.log('destination')
                if (!req.body.type) return cb(new Error('No type inside body'));
                if (!file.fieldname) return cb(new Error('No file name inside body'));
                const dir = path.join(__dirname, 'assets-test', file.fieldname + 's', req.body.type)
                fs.mkdirsSync(dir)
                cb(null, dir);
            },
            filename: (req, file, cb) => {
                console.log('filename')
                console.log(req.error)
                if (!req.body.word) cb(new Error('No word inside body or set it as before files'));
                // 1626883959579_dance.mp3 or 1626883959579_dance.jpeg
                const fileName = new Date().valueOf() + '_' + req.body.word + '.' + file.originalname.split('.').pop()
                cb(null, fileName);
            }
        }
    ),
});

const upload = filesUpload.fields([
    {name: 'image', maxCount: 1},
    {name: 'sound', maxCount: 1}
])

const handleUpload = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.log('ERROR ', err.message)
            res.statusCode = 500
            return res.send(err.message)
        }
        next()
    })
}

app.post('/register', handleUpload, (req, res) => {
    res.json(req.files);
});

app.post('/register/change-type', (req, res) => {
    const {type, newType} = req.body;
    const base = path.join(__dirname, 'assets', 'images')
    const oldPath = path.join(base, type)
    const newPath = path.join(base, newType)
    fs.moveSync(oldPath, newPath)

    res.send('ok');
});

app.route('/api/categories')
    .get((req, res) => {
        const categories = data.map(({type, name, imgSrc}) => ({type, name, imgSrc}))
        res.json(categories)
    })
    .post((req, res) => {
        const {type, name, imgSrc} = req.body

        if (!type || !name || !imgSrc) {
            res.statusCode = 500;
            return res.json({error: 'Wrong values: type, name or imgSrc'})
        }

        const newCategory = {type, name, imgSrc, items: []}
        data.push(newCategory)
        res.json(newCategory)
    })

app.route('/api/categories/:type')
    .get((req, res) => {
        const {type} = req.params;
        console.log(type)
        const cardType = data.find(category => category.type === type)

        if (!cardType) {
            res.statusCode = 404
            res.json({error: 'Category not found'})
        }

        res.json(cardType.items)

    })
    .post((req, res) => {
        const {word, translation, image, soundSrc, type} = req.body

        if (!word || !translation || !image || !soundSrc || !type) {
            res.statusCode = 500;
            return res.json({error: 'Wrong values: word, translation, image, soundSrc or type'})
        }

        const newCard = {word, translation, image, soundSrc}
        const cardTypeIndex = data.findIndex(category => category.type === type);
        data[cardTypeIndex].items.push(newCard)
        res.json(newCard)
    })

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../build/index.html'))
});

app.listen(PORT, () => console.log(`Server is started at port localhost:${PORT}`))
