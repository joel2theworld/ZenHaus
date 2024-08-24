import express from 'express';
import auth from '../middlewares/auth.js';
import { createProperty, getProperty, updateProperty, deleteProperty, getUserByPropertyId, getAllProperties } from '../controllers/propertyController.js';
import upload from '../config/multerCloudinaryConfig.js';

const router = express.Router();

//Routes
router.post('/create', auth, createProperty);
router.get('/:propertyId', getProperty);
router.put('/update/:propertyId', auth, updateProperty);
router.delete('/delete/:propertyId', auth, deleteProperty);
router.get('/:propertyId/agent', getUserByPropertyId);
router.get('/user/:userId', getAllProperties);

export default router;