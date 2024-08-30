import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/CreateProperty.css";
import Sidebar from "../../components/Sidebar.jsx";

const CreateProperty = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [name, setName] = useState("");
  const [listingType, setListingType] = useState("Sale");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [images, setImages] = useState([]);

  // Validation states
  const [errors, setErrors] = useState({});

  const listingTypes = ["Sale", "Rental"];

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name of Property is required.";
    if (!price) newErrors.price = "Price is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!address) newErrors.address = "Address is required.";
    if (!city) newErrors.city = "City is required.";
    if (!state) newErrors.state = "State is required.";
    if (images.length === 0) newErrors.images = "At least one image is required.";
    if (images.length > 4) newErrors.images = "You can upload a maximum of 4 images.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      setErrors(prevErrors => ({ ...prevErrors, images: "You can upload a maximum of 4 images." }));
      return;
    }
    setErrors(prevErrors => ({ ...prevErrors, images: null }));
    setImages(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return; // If validation fails, stop submission
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("listingType", listingType);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    images.forEach((image) => {
      formData.append("images", image); // Append each image to the 'images' array
    });

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post("http://localhost:5001/property/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
      // Handle success
      toast.success("Property created successfully!");
      navigate("/properties");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.msg || "An error occurred.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="create-property">
      <Sidebar />
      <section className="property-info-container">
        <header className="property-info-header">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b861891a9eccab1543308c11492be7a9dc4c1fd2b37f450d70549087e6564bba?placeholderIfAbsent=true&apiKey=65b3ada40e564124a193992cddc527e9"
            className="property-icon"
            alt="Property icon"
          />
          <h2 className="property-info-title">Create Property</h2>
        </header>

        <form className="property-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="property-name" className="form-label">
              Name of Property
            </label>
            <input
              type="text"
              id="property-name"
              className="form-input"
              placeholder="Grey Homes"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="listing-type" className="form-label">
              Listing Type
            </label>
            <select
              id="listing-type"
              className="form-input"
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
            >
              {listingTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Price (₦)
            </label>
            <input
              type="text"
              id="price"
              className="form-input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="150,000"
            />
            {errors.price && <p className="error-message">{errors.price}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className="form-input description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A spacious 3-bedroom apartment in the heart of town."
            ></textarea>
            {errors.description && (
              <p className="error-message">{errors.description}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="form-input address-input"
              placeholder="7, Ozuma Mbadiwe Avenue"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && (
              <p className="error-message">{errors.address}</p>
            )}
          </div>

          <div className="city-state-container">
            <div className="form-group city-state-group">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Ikeja"
                className="form-input address-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-group city-state-group">
              <label htmlFor="state" className="form-label">
                State/Province
              </label>
              <input
                type="text"
                id="state"
                placeholder="Lagos"
                className="form-input address-input"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="images" className="form-label">
              Upload Images (max 4, at least 1 required)
            </label>
            <input
              type="file"
              id="images"
              className="form-input"
              multiple
              onChange={handleImageChange}
            />
            {errors.images && <p className="error-message">{errors.images}</p>}
          </div>

          <button type="submit" className="continue-button">
            <span className="continue-text">Create Property</span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/40c9221185dfbffd505064ae1de1bc1117df763ce1ce661d85acf6ff5a7f3f40?placeholderIfAbsent=true&apiKey=65b3ada40e564124a193992cddc527e9"
              className="continue-icon"
              alt=""
            />
          </button>
        </form>

        <ToastContainer />
      </section>
    </div>
  );
};

export default CreateProperty;
