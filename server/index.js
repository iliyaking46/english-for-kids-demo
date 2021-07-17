const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const data = require('./data.json')

const app = express();
const PORT = 5000

app.use(bodyParser.json())

app.use(express.static('build'));

app.route('/api/categories')
    .get((req, res) => {
        const categories = data.map(({type, name, imgSrc}) => ({type, name, imgSrc}))
        res.json(categories)
    })
    .post((req, res) => {
        const {type, name, imgSrc} = res.body

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
