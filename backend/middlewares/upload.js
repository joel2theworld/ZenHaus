import multer from 'multer';
import { storage } from '../config/cloudinaryConfig.js'; // Adjust the path as necessary

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: Limit file size to 5MB
}).fields([
  { name: 'images', maxCount: 4 } // Handle up to 4 images
]);

export default upload;
