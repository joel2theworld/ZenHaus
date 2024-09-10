import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../components/PropertyCard.jsx";

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/properties")
      .then((response) => setProperties(response.data))
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  return (
    <section>
      {properties.map((property, index) => (
        <PropertyCard key={index} {...property} />
      ))}
    </section>
  );
};

export default PropertyListing;