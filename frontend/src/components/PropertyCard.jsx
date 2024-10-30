import React, { useState } from "react";
import styles from "../styles/PropertyCard.module.css";

const PropertyCard = ({ imageUrl, city, state, name, price, description, listingType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <article className={styles.card}>
        <img
          loading="lazy"
          src={imageUrl}
          alt={`Property: ${name}`}
          className={styles.propertyImage}
        />
        <div className={styles.cardContent}>
          <div className={styles.headerSection}>
            <div className={styles.titleWrapper}>
              <p className={styles.city}>{city}, {state}</p>
              <h2 className={styles.propertyTitle}>{name}</h2>
            </div>
            <p className={styles.price}>{price}</p>
          </div>
          <p className={styles.description}>{description}</p>
          <div className={styles.footerSection}>
            <div className={styles.listingType}>
              <div className={styles.listingTypeContent}>{listingType}</div>
            </div>
            <div className={styles.actionWrapper}>
              <button className={styles.viewDetails}>View details</button>
              <button className={styles.contactButton} onClick={openModal}>
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Modal Structure */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Contact Agent</h2>
            <p>Enter your details to contact the agent for this property.</p>
            <form className={styles.contactForm}>
              <label>
                Name:
                <input type="text" name="name" required />
              </label>
              <label>
                Email:
                <input type="email" name="email" required />
              </label>
              <label>
                Message:
                <textarea name="message" required />
              </label>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitButton}>
                  Send Message
                </button>
                <button onClick={closeModal} className={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyCard;
