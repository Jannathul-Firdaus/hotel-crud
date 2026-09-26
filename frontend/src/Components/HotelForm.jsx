import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHotel, updateHotel } from "../Redux/hotelSlice";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";

function HotelForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [price, setPrice] = useState("");

  const [errors, setErrors] = useState({});

  const hotel = useSelector((state) =>
    state.hotels.hotels.find(
      (hotel) => hotel.id === Number(id)
    )
  );

  // Load existing hotel data when editing
  useEffect(() => {
    if (hotel) {
      setImage(hotel.image);

      setImagePreview(
        hotel.image.startsWith("http")
          ? hotel.image
          : `http://localhost:5000${hotel.image}`
      );

      setTitle(hotel.title);
      setDescription(hotel.description);
      setLatitude(hotel.latitude);
      setLongitude(hotel.longitude);
      setPrice(hotel.price);
    }
  }, [hotel]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validation
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    // Image is required only when adding a new hotel
    if (!id && !image) {
      newErrors.image = "Image is required";
    }

    if (!latitude) {
      newErrors.latitude = "Latitude is required";
    }

    if (!longitude) {
      newErrors.longitude = "Longitude is required";
    }

    if (!price || Number(price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Create FormData for backend
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("price", price);

    // Upload image only if a new file is selected
    if (image instanceof File) {
      formData.append("image", image);
    }

    // Add or Update
    if (id) {
      dispatch(
        updateHotel({
          id: Number(id),
          formData,
        })
      );
    } else {
      dispatch(createHotel(formData));
    }

    navigate("/");
  };

  return (
    <div className="hotel-page">

      <Helmet>
        <title>
          {id ? "Edit Hotel" : "Add Hotel"}
        </title>

        <meta
          name="description"
          content={
            id
              ? "Edit hotel details"
              : "Add a new hotel"
          }
        />
      </Helmet>

      {/* Form Header */}
      <div className="form-header">

        <div>
          <h1>
            {id ? "Edit Hotel" : "Add Hotel"}
          </h1>

          <p>
            {id
              ? "Update your hotel information"
              : "Add a new hotel to your collection"}
          </p>
        </div>

      </div>

      {/* Form Card */}
      <div className="form-card">

        <form onSubmit={handleSubmit}>

          {/* Image */}
          <div className="form-group">

            <label>Hotel Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  setImage(file);
                  setImagePreview(
                    URL.createObjectURL(file)
                  );
                }
              }}
            />

            {errors.image && (
              <p className="error-message">
                {errors.image}
              </p>
            )}

            {imagePreview && (
              <div className="image-preview">

                <p>Image Preview</p>

                <img
                  src={imagePreview}
                  alt="Hotel preview"
                />

              </div>
            )}

          </div>

          {/* Title */}
          <div className="form-group">

            <label>Hotel Title</label>

            <input
              type="text"
              placeholder="Enter hotel name"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            {errors.title && (
              <p className="error-message">
                {errors.title}
              </p>
            )}

          </div>

          {/* Description */}
          <div className="form-group">

            <label>Description</label>

            <textarea
              placeholder="Enter hotel description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows="5"
            />

            {errors.description && (
              <p className="error-message">
                {errors.description}
              </p>
            )}

          </div>

          {/* Location */}
          <div className="location-fields">

            <div className="form-group">

              <label>Latitude</label>

              <input
                type="number"
                step="any"
                placeholder="e.g. 11.0168"
                value={latitude}
                onChange={(e) =>
                  setLatitude(e.target.value)
                }
              />

              {errors.latitude && (
                <p className="error-message">
                  {errors.latitude}
                </p>
              )}

            </div>

            <div className="form-group">

              <label>Longitude</label>

              <input
                type="number"
                step="any"
                placeholder="e.g. 76.9558"
                value={longitude}
                onChange={(e) =>
                  setLongitude(e.target.value)
                }
              />

              {errors.longitude && (
                <p className="error-message">
                  {errors.longitude}
                </p>
              )}

            </div>

          </div>

          {/* Price */}
          <div className="form-group">

            <label>Price per Night</label>

            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            />

            {errors.price && (
              <p className="error-message">
                {errors.price}
              </p>
            )}

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="save-hotel-btn"
          >
            {id ? "Update Hotel" : "Save Hotel"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default HotelForm;