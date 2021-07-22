const multer = require('multer')
const fs = require('fs-extra');
const path = require('path');

const createError = (res, text, code = 500) => {
    res.status(code).json({error: text})
}

const filesUpload = multer({
    storage: multer.diskStorage(
        {
            destination: (req, file, cb) => {
                if (!req.params.type) return cb(new Error('No type inside body'));
                if (!file.fieldname) return cb(new Error('No file name inside body'));
                const dir = path.join(__dirname, 'assets', file.fieldname + 's', req.params.type)
                fs.mkdirsSync(dir)
                cb(null, dir);
            },
            filename: (req, file, cb) => {
                if (!req.body.word) cb(new Error('No word inside body or set it as before files'));
                // 1626883959579_dance.mp3 or 1626883959579_dance.jpeg
                const fileName = new Date().valueOf() + '_' + req.body.word + path.extname(file.originalname)
                cb(null, fileName);
            }
        }
    ),
}).fields([
    {name: 'image', maxCount: 1},
    {name: 'sound', maxCount: 1}
]);

const upload = (req, res, next) => {
    filesUpload(req, res, (err) => {
        if (err) {
            return createError(res, err.message)
        }
        next()
    })
}

module.exports = {createError, upload}
