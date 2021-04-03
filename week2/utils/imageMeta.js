'use strict';

const ExifImage = require('exif').ExifImage;

const getCoordinates =  imgFile => {
    return new Promise((resolve, reject) => {
        new ExifImage({image: imgFile}, (error, data) => {
            const decimalCoordinates = [];
            if (error) {
                console.error(error);
            } else {
                if (typeof data.gps !== "undefined") {
                    decimalCoordinates.push(gpsToDecimal(data.gps.GPSLongitude, data.gps.GPSLongitudeRef));
                    decimalCoordinates.push(gpsToDecimal(data.gps.GPSLatitude, data.gps.GPSLatitudeRef));
                }
            }
            resolve(decimalCoordinates);
        }); 
    });
};

const gpsToDecimal = (gpsData, hem) => {
    let d = parseFloat(gpsData[0]) + parseFloat(gpsData[1] / 60) +
        parseFloat(gpsData[2] / 3600);
    return (hem === 'S' || hem === 'W') ? d *= -1 : d;
};

module.exports = {
    getCoordinates
};