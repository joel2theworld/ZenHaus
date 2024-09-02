import React from "react";
import Header from "../components/Header";
import '../styles/Home.css';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="homepage">
        <section className="dream-home-section">
          <div className="content-wraper">
            <div className="text-column">
              <div className="text-content">
                <h1 className="main-heading">Find your dream home</h1>
                <p className="welcome-text">
                  Welcome to ZenHaus! Find your dream home in our collection.
                  Are you an agent?
                  <a
                    href="signup"
                    style={{textDecoration: 'underline', color: '#379AE6'}}
                  >
                    Sign Up
                  </a>
                </p>
                <a href="/signup"><button className="cta-button">List my own property</button></a>
              </div>
            </div>
            <div className="image-column">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aba8bab7cdc1ab382bd62b10cee2a3eab1b700116bfbc02ae919d23d04c5d8a?placeholderIfAbsent=true&apiKey=65b3ada40e564124a193992cddc527e9"
                className="heroo-image"
                alt="Illustration of a dream home"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
