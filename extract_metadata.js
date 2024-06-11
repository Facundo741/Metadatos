const fs = require('fs');
const ExifImage = require('exif').ExifImage;
const sharp = require('sharp');

function extractExifMetadata(imagePath) {
    try {
        new ExifImage({ image: imagePath }, function (error, exifData) {
            if (error) {
                console.log('Error: ' + error.message);
            } else {
                console.log('EXIF Data:', exifData);
            }
        });
    } catch (error) {
        console.log('Error: ' + error.message);
    }
}

async function convertToJpeg(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .jpeg()
            .toFile(outputPath);
        console.log(`Imagen convertida y guardada en: ${outputPath}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function getImageInfo(imagePath) {
    try {
        const metadata = await sharp(imagePath).metadata();
        console.log('Basic Image Info:', metadata);

        if (metadata.format !== 'jpeg') {
            const jpegPath = imagePath.replace(/\.[^/.]+$/, ".jpeg");
            await convertToJpeg(imagePath, jpegPath);
            extractExifMetadata(jpegPath);
        } else {
            extractExifMetadata(imagePath);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

const imagePath = './images/Cv_Facundo.jpeg';

getImageInfo(imagePath);
