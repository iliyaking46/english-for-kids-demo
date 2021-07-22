const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const data = require('./data.json');
const {createError, upload} = require('./utils')

const app = express();
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../build')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.route('/api/categories')
    .get((req, res) => {
        const categories = data.map(({type, name, imgSrc}) => ({type, name, imgSrc}))
        res.json(categories)
    })
    .post((req, res) => {
        const {type, name, imgSrc} = req.body

        if (!type || !name || !imgSrc) {
            return createError(res, 'Wrong values: type, name or imgSrc')
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
            return createError(res, 'Category not found', 404)
        }

        res.json(cardType.items)
    })
    .post(upload, (req, res) => {
        const {type} = req.params;
        const cardTypeIndex = data.findIndex(category => category.type === type);
        if (!type || !data[cardTypeIndex]) return createError(res, 'Category not found', 404)

        const {word, translation} = req.body
        if (!word || !translation) {
            return createError(res, 'Wrong values: word, translation')
        }
        const {image, sound} = req.files;
        if (!image || !sound) {
            return createError('Empty image or sound')
        }

        const newCard = {
            word, translation,
            image: `assets/images/${type}/${image[0].filename}`,
            soundSrc: `assets/sounds/${type}/${sound[0].filename}`,
        }
        data[cardTypeIndex].items.push(newCard)
        res.json(newCard)
    })

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../build/index.html'))
});

app.listen(PORT, () => console.log(`Server is started at port localhost:${PORT}`))
