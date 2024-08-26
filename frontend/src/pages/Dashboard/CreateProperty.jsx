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
  const [city, setCity] = useState("Abuja");
  const [state, setState] = useState("FCT");

  // Validation states
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name of Property is required.";
    if (!price) newErrors.price = "Price is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!address) newErrors.address = "Address is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return; // If validation fails, stop submission
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/property/create",
        {
          name,
          listingType,
          price,
          description,
          address,
          city,
          state,
        }
      );
      toast.success("Property created successfully!");
      navigate("/properties"); // Redirect to properties page or another relevant page
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="listing-type" className="form-label">
              Listing type
            </label>
            <div className="form-input dropdown-input">
              <span>{listingType}</span>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1389849e9c5820bbe5f838bef78fd9459f8fb2846d631515f45b87df0e7430d?placeholderIfAbsent=true&apiKey=65b3ada40e564124a193992cddc527e9"
                className="dropdown-icon"
                alt=""
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="text"
              id="price"
              className="form-input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
              <div className="form-input dropdown-input">
                <span>{city}</span>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1389849e9c5820bbe5f838bef78fd9459f8fb2846d631515f45b87df0e7430d?placeholderIfAbsent=true&apiKey=65b3ada40e564124a193992cddc527e9"
                  className="dropdown-icon"
                  alt=""
                />
              </div>
            </div>

            <div className="form-group city-state-group">
              <label htmlFor="state" className="form-label">
                State/Province
              </label>
              <div className="form-input dropdown-input">
                <span>{state}</span>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1389849e9c5820bbe5f838bef78fd9459f8fb2846d631515f45b87df0e7430d?placeholderIfAbsent=true&apiKey=65b3ada40e564124a193992cddc527e9"
                  className="dropdown-icon"
                  alt=""
                />
              </div>
            </div>
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
