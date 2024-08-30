import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/AllProperties.css";
import Sidebar from "../../components/Sidebar.jsx";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const response = await axios.get(
          `http://localhost:5001/property/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProperties(response.data);
      } catch (err) {
        if (err.response && err.response.data) {
          toast.error(err.response.data.msg || "Failed to fetch properties.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="props-page">
      <Sidebar />
      <div className="props-content">
        <ToastContainer />
        <h2 className="properties-title">Your Properties</h2>
        {error && <p className="error-message">{error}</p>}
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <table className="table properties-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Price</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property._id}>
                  <td>{property.name}</td>
                  <td>{property.address}</td>
                  <td>{property.city}</td>
                  <td>{property.state}</td>
                  <td>{property.price}</td>
                  <td>{property.listingType}</td>
                  <td>{property.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
