import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from './cloudinaryConfig.js';

// Set up Cloudinary storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'real-estate', // Specify a folder in your Cloudinary account
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx'],
  },
});

const upload = multer({ storage: storage });

export default upload;
