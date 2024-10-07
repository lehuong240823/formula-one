const fs = require('fs')
const path = require('path');

const readImgDir = async function (request, response) {
    try {
        const img_dir = '../public/img/sponsors/white';
        fs.readdir(path.join(__dirname, img_dir), function (error, files) {
            if (error)
                console.log(error);
            else {
                response.json(files);
            }
        });
    } catch (error) {
        response.status(500).json({ message: 'Error occur when try to read directory:', error: error.message });
    }
}

module.exports = readImgDir;