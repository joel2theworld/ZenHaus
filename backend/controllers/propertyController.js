
import { Property } from "../models/Property.js";
import { User } from '../models/User.js';

//create property
export const createProperty = async (req,res) => {
    const {name, address, description, price, images, city, state, listingType} = req.body;
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        const property = new Property({
            name,
            address,
            description,
            price,
            listingType,
            city,
            images,
            state,
            status: 'Available',
            user: user._id
        });

        await property.save();

        // Add the property to the user's list of properties
        user.properties.push(property._id);
        await user.save();
        res.status(200).send('Property created successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update property by ID
export const updateProperty = async (req, res) => {
    const { propertyId } = req.params;
    const updates = req.body; // Get all fields from the request body

    try {
        // Find the property by ID
        let property = await Property.findById(propertyId);
        
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }

        // Ensure the user is the owner of the property
        if (property.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Update only the fields provided
        property = await Property.findByIdAndUpdate(
            propertyId,
            { $set: updates }, // Use $set to update only the provided fields
            { new: true } // Return the updated document
        );

        res.status(200).json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get Single property by ID
export const getProperty = async (req, res) => {
    const { propertyId } = req.params;
    try {
        // Fetch the property by ID
        const property = await Property.findById(propertyId);
        
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }
        // Respond with the found property
        res.status(200).json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete property by ID
export const deleteProperty = async (req, res) => {
    const { propertyId } = req.params;

    try {
        // Find the property by ID
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }

        // Ensure the user is the owner of the property
        if (property.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Remove the property
        await Property.findByIdAndDelete(propertyId);

        // Remove the property from the user's list of properties
        const user = await User.findById(req.user.id);
        user.properties = user.properties.filter(propId => propId.toString() !== propertyId);
        await user.save();

        res.status(200).json({ msg: 'Property removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get user by property ID
export const getUserByPropertyId = async (req, res) => {
    const { propertyId } = req.params;

    try {
        // Find the property by ID and populate the user field
        const property = await Property.findById(propertyId).populate({
            path: 'user',
            select: 'firstName lastName email phone picture' // Specify which fields to include
        });

        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }

        // Return the limited user object
        res.status(200).json(property.user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get All Properties by User ID
export const getAllProperties = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find all properties for the given user
        const properties = await Property.find({ user: userId });

        // If no properties are found, return an empty array or a message
        if (!properties.length) {
            return res.status(404).json({ msg: 'No properties found for this user' });
        }
        res.status(200).json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

