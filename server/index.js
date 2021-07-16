const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const data = require('./data.json')

const app = express();
const PORT = 5000

// app.use(cors());
app.use(bodyParser.json())

app.use(express.static('build'));

// app.get('/api/test', (res, req) => {
//     req.send('test api')
// })
//
// app.post('/api/test', (res, req) => {
//     console.log(res.body)
//     req.send('post test api')
// })

app.route('/api/categories')
    .get((res, req) => {
        const categories = data.map(({type, name, imgSrc}) => ({type, name, imgSrc}))
        req.json(categories)
    })
    .post((res, req) => {
        const {type, name, imgSrc} = res.body

        if (!type || !name || !imgSrc) {
            req.statusCode = 500;
            return req.json({error: 'Wrong values: type, name or imgSrc'})
        }

        const newCategory = {type, name, imgSrc, items: []}
        data.push(newCategory)
        req.json(newCategory)
    })

app.route('/api/categories/:type')
    .get((res, req) => {
        const {type} = res.params;
        console.log(type)
        const cardType = data.find(category => category.type === type)

        if (!cardType) {
            req.statusCode = 404
            req.json({error: 'Category not found'})
        }

        req.json(cardType.items)

    })
    .post((res, req) => {
        const {word, translation, image, soundSrc, type} = res.body

        if (!word || !translation || !image || !soundSrc || !type) {
            req.statusCode = 500;
            return req.json({error: 'Wrong values: word, translation, image, soundSrc or type'})
        }

        const newCard = {word, translation, image, soundSrc}
        const cardTypeIndex = data.findIndex(category => category.type === type);
        data[cardTypeIndex].items.push(newCard)
        req.json(newCard)
    })

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../build/index.html'))
});
app.listen(PORT, () => console.log(`Server is started at port localhost:${PORT}`))
