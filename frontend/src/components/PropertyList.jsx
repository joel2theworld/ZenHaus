import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard.jsx";
import styles from "../styles/PropertyList.module.css";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/property/properties"
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <p>Loading properties...</p>;
  }

  return (
    <div className={styles.propertyList}>
      <div className={styles.listingsContainer}>
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            imageUrl={property.images[0]}
            city={property.city}
            state={property.state}
            name={property.name}
            price={property.price}
            description={property.description}
            listingType={property.listingType}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
