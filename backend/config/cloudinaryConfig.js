import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dh2l9xsuj', // Replace with your Cloudinary cloud name
  api_key: '414633161527468',       // Replace with your Cloudinary API key
  api_secret: 'VBRIfijUcXLP0YgY9kzdIBZ0RjQ'  // Replace with your Cloudinary API secret
});

export default cloudinary;
