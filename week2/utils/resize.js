'use strict';

const sharp = require('sharp');
const path = require('path');

const makeThumbnail = async (file, thumbname) => {
    const dir = path.dirname(file);
    const destination = path.join(dir, thumbname + ".png")
    await sharp(file).resize(160, 160).png().toFile(destination);
    return path.basename(destination);
};

module.exports = {
    makeThumbnail
};