
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";
import  image from "../images/Image Onboarding.png"

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-screen">     

      {/* Coffee hero image */}
      <div className="onboarding-hero">
        <img
          className="onboarding-coffee-image"
          src={image}
          alt="Freshly brewed coffee with roasted coffee beans"
        />
        <div className="onboarding-image-overlay" />
      </div>

      {/* Welcome content */}
      <main className="onboarding-content">
        <h1>
          Fall in Love with
          <br />
          Coffee in Blissful
          <br />
          Delight!
        </h1>

        <p className="onboarding-description">
          Welcome to our cozy coffee corner, where
          <br className="desktop-text-break" />
          every cup is a delightful for you.
        </p>

        <button
          type="button"
          className="onboarding-start-button"
          onClick={() => navigate("/home")}
        >
          Get Started
        </button>
      </main>

      {/* iPhone home indicator */}
      <div className="onboarding-home-indicator">
        <span />
      </div>
    </div>
  );
}
