import React from "react";
import {
  ArrowRight,
  LocateFixed,
  MapPin,
  Bike,
  Phone,
  Navigation,
} from "lucide-react";
import "./Delivery.css";

export default function Delivery() {
  const handleCall = () => {
    window.location.href = "tel:+1234567890";
  };

  return (
    <div className="delivery-screen">
      {/* Map Section */}
      <section className="delivery-map">
        <div className="map-label label-one">96th St</div>
        <div className="map-label label-two">95th St</div>
        <div className="map-label label-three">86th Street</div>
        <div className="map-label label-four">2nd Ave</div>
        <div className="map-label label-five">3rd Ave</div>
        <div className="map-label label-six">Nirmala Girls HSS</div>

        <div className="map-road road-one" />
        <div className="map-road road-two" />
        <div className="map-road road-three" />
        <div className="map-road road-four" />

        {/* Delivery Route */}
        <svg
          className="delivery-route"
          viewBox="0 0 750 1000"
          preserveAspectRatio="none"
          aria-label="Delivery route on the map"
        >
          <polyline
            points="162,474 195,474 190,411 240,411 240,360 475,347 504,335 504,625"
            fill="none"
            stroke="#CB8050"
            strokeWidth="7"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        <button
          className="map-control back-control"
          aria-label="Go back"
          onClick={() => window.history.back()}
        >
          <ArrowRight size={18} />
        </button>

        <button
          className="map-control location-control"
          aria-label="Show current location"
        >
          <LocateFixed size={16} />
        </button>

        <div className="destination-pin">
          <MapPin size={40} fill="#CB8050" color="#CB8050" />
          <span />
        </div>

        <div className="courier-map-marker">
          <Bike size={29} />
        </div>
      </section>

      {/* Delivery Details */}
      <main className="delivery-panel">
        <div className="panel-handle" />

        <header className="delivery-heading">
          <h1>10 minutes left</h1>
          <p>
            Delivery to <strong>Jl. Kpg Sutoyo</strong>
          </p>
        </header>

        {/* Progress */}
        <div
          className="delivery-progress"
          role="progressbar"
          aria-label="Delivery progress"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <span className="completed" />
          <span className="completed" />
          <span className="completed" />
          <span />
        </div>

        {/* Order Status */}
        <section className="delivery-status">
          <div className="status-icon">
            <Bike size={33} />
          </div>

          <div className="status-copy">
            <h2>Delivered your order</h2>
            <p>
              We will deliver your goods to you in the shortest possible time.
            </p>
          </div>
        </section>

        {/* Courier Details */}
        <section className="courier-details">
          <img
            className="courier-avatar"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=240&q=80"
            alt="Brooklyn Simmons, personal courier"
          />

          <div className="courier-info">
            <h2>Brooklyn Simmons</h2>
            <p>Personal Courier</p>
          </div>

          <button
            className="call-button"
            onClick={handleCall}
            aria-label="Call your courier"
          >
            <Phone size={15} strokeWidth={1.8} />
          </button>
        </section>
      </main>

      <div className="home-indicator">
        <span />
      </div>
    </div>
  );
}