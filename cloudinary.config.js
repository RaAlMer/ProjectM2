const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');

//Here our config (this is Mehdi's)
cloudinary.config({
    cloud_name: 'dkjra5gmb',
    api_key: '648317471416645',
    api_secret: 'wzNgmzaXMUPBZsmfnhoQcgz2xY8',
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowed_formats: ['jpg', 'png', 'jpeg'],
        folder: 'm2Image',
    },
});

module.exports = multer({storage});