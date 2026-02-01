import { v2 as cloudinary } from 'cloudinary';

/**
 * @fileoverview Cloudinary Server-side SDK configuration.
 * @description Configures the Cloudinary instance for AI-driven asset processing.
 */

cloudinary.config({
    // Strictly use process.env for server-side authorization
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export default cloudinary;