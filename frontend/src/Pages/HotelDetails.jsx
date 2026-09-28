
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

function HotelDetails() {
  const { id } = useParams();

  const [userLocation, setUserLocation] = useState(null);

  const hotel = useSelector((state) =>
    state.hotels.hotels.find(
      (hotel) => hotel.id === Number(id)
    )
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      () => {
        console.log("Location permission denied");
      }
    );
  }, []);

  if (!hotel) {
    return (
      <div className="hotel-page">
        <div className="no-hotels">
          <h2>Stay not found</h2>

          <p>
            The hotel you're looking for is unavailable.
          </p>

          <Link to="/">
            <button
              type="button"
              className="delete-btn"
            >
              ← Back to Explore
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const hotelLocation = [
    Number(hotel.latitude),
    Number(hotel.longitude),
  ];

  const imageUrl = hotel.image.includes("localhost:5000")
    ? `https://hotel-crud-backend-zori.onrender.com${hotel.image.replace(
        "http://localhost:5000",
        ""
      )}`
    : hotel.image.startsWith("http")
    ? hotel.image
    : `https://hotel-crud-backend-zori.onrender.com${hotel.image}`;

  console.log("Hotel image:", hotel.image);
  console.log("Image URL:", imageUrl);

  return (
    <div className="hotel-page">

      <Helmet>
        <title>
          {hotel.title} | StayFinder
        </title>

        <meta
          name="description"
          content={hotel.description}
        />
      </Helmet>

      <Link
        to="/"
        className="back-link"
      >
        ← Back to Explore
      </Link>

      <div className="details-card">

        <img
          src={imageUrl}
          alt={hotel.title}
          className="details-image"
        />

        <div className="details-content">

          <p className="details-label">
            YOUR STAY
          </p>

          <h1>{hotel.title}</h1>

          <div className="details-price">
            ₹{hotel.price}
            <span> / night</span>
          </div>

          <p className="details-description">
            {hotel.description}
          </p>

          <div className="location-info">

            <div>
              <span>Latitude</span>
              <strong>
                {hotel.latitude}
              </strong>
            </div>

            <div>
              <span>Longitude</span>
              <strong>
                {hotel.longitude}
              </strong>
            </div>

          </div>

        </div>
      </div>

      <div className="map-section">

        <div className="map-heading">

          <p className="details-label">
            LOCATION
          </p>

          <h2>
            Explore the Location
          </h2>

          <p>
            Discover where your stay is located.
          </p>

        </div>

        <MapContainer
          center={hotelLocation}
          zoom={13}
          className="hotel-map"
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={hotelLocation}>
            <Popup>
              {hotel.title}
            </Popup>
          </Marker>

          {userLocation && (
            <Marker position={userLocation}>
              <Popup>
                Your Current Location
              </Popup>
            </Marker>
          )}

        </MapContainer>

      </div>

    </div>
  );
}

export default HotelDetails;
