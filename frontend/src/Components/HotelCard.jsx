import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteHotel } from "../Redux/hotelSlice";

function HotelCard({ hotel }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteHotel(hotel.id)).unwrap();

      alert("Hotel removed successfully!");
    } catch (error) {
      alert("Failed to delete hotel");
    }
  };

  const imageUrl = hotel.image.startsWith("http")
    ? hotel.image
    : `http://localhost:5000${hotel.image}`;

  const shortDescription =
    hotel.description.length > 80
      ? hotel.description.substring(0, 80) + "..."
      : hotel.description;

  return (
    <div className="hotel-card">

      {/* Hotel Image */}
      <Link
        to={`/hotel/${hotel.id}`}
        className="hotel-card-image-link"
      >
        <img
          src={imageUrl}
          alt={hotel.title}
        />
      </Link>

      {/* Hotel Content */}
      <div className="hotel-card-content">

        {/* Hotel Title */}
        <Link
          to={`/hotel/${hotel.id}`}
          className="hotel-card-title"
        >
          <h2>{hotel.title}</h2>
        </Link>

        {/* Description */}
        <p className="hotel-description">
          {shortDescription}
        </p>

        {/* Price */}
        <h3 className="hotel-price">
          ₹{hotel.price}
          <span className="price-label"> / night</span>
        </h3>

        {/* Actions */}
        <div className="hotel-actions">

          <Link to={`/edit/${hotel.id}`}>
            <button className="edit-btn">
              Edit Details
            </button>
          </Link>

          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            Remove
          </button>

        </div>

      </div>
    </div>
  );
}

export default HotelCard;