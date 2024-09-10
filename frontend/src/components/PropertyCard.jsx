import React from "react";
import styles from "../styles/PropertyCard.module.css";

const PropertyCard = ({ imageUrl, location, title, price, description, tag }) => {
  return (
    <article className={styles.card}>
      <img
        loading="lazy"
        src={imageUrl}
        alt={`Property: ${title}`}
        className={styles.propertyImage}
      />
      <div className={styles.cardContent}>
        <div className={styles.headerSection}>
          <div className={styles.titleWrapper}>
            <p className={styles.location}>{location}</p>
            <h2 className={styles.propertyTitle}>{title}</h2>
          </div>
          <p className={styles.price}>{price}</p>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.footerSection}>
          <div className={styles.tag}>
            <div className={styles.tagContent}>{tag}</div>
          </div>
          <div className={styles.actionWrapper}>
            <button className={styles.viewDetails}>View details</button>
            <button className={styles.contactButton}>Contact Agent</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;