const cloudinary = require('cloudinary').v2;
const config = require('../../configs/config');

cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
    secure: true
})

module.exports = {
    uploadToCloudinary: async (buffer) => {
        const uploadResult = await new Promise((resolve) => {
            cloudinary.uploader.upload_stream({
                folder: 'hello-world',
                use_filename: true
            }, (error, uploadResult) => {
                return resolve(uploadResult);
            }).end(buffer)
        })
        return uploadResult.url;
    }
}