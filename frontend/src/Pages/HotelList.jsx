
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { fetchHotels } from "../Redux/hotelSlice";
import HotelCard from "../Components/HotelCard";

function HotelList() {
  const dispatch = useDispatch();

  const hotels = useSelector((state) => state.hotels.hotels);

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const hotelsPerPage = 2;
  useEffect(() => {
    setCurrentPage(1);
  }, [search, minPrice, maxPrice]);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        await dispatch(fetchHotels()).unwrap();
      } catch (error) {
        console.error("Failed to load hotels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHotels();
  }, [dispatch]);


  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch = hotel.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesMinPrice =
      minPrice === "" ||
      Number(hotel.price) >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" ||
      Number(hotel.price) <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });


  const indexOfLastHotel =
    currentPage * hotelsPerPage;

  const indexOfFirstHotel =
    indexOfLastHotel - hotelsPerPage;

  const currentHotels = filteredHotels.slice(
    indexOfFirstHotel,
    indexOfLastHotel
  );

  const totalPages = Math.ceil(
    filteredHotels.length / hotelsPerPage
  );

  return (
    <div className="hotel-page">

      <Helmet>
        <title>StayFinder | Explore Stays</title>

        <meta
          name="description"
          content="Discover comfortable stays and find the perfect hotel for your next trip."
        />
      </Helmet>

     
      <div className="page-header">

        <div>
          <h1>Explore Stays</h1>

          <p>
            Find a place you'll love to stay.
          </p>
        </div>

        <Link
          to="/add"
          className="add-hotel-btn"
        >
          <button type="button">
            + Add Hotel
          </button>
        </Link>

      </div>

    
      <div className="filters">

        <input
          type="text"
          placeholder="Search by hotel name..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Minimum price"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Maximum price"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value)
          }
        />

      </div>

      <div className="section-heading">

        <div>
          <h2>Discover Your Stay</h2>

          {!isLoading && (
            <p>
              {filteredHotels.length}{" "}
              {filteredHotels.length === 1
                ? "stay"
                : "stays"}{" "}
              available
            </p>
          )}
        </div>

      </div>

     
      {isLoading ? (
        <div className="no-hotels">
          <h3>Loading stays...</h3>
          <p>
            Please wait while we load the available stays.
          </p>
        </div>
      ) : currentHotels.length > 0 ? (
        <div className="hotel-grid">

          {currentHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
            />
          ))}

        </div>
      ) : (
        <div className="no-hotels">

          <h3>No stays found</h3>

          <p>
            Try changing your search or price range.
          </p>

        </div>
      )}

     
      {!isLoading && totalPages > 1 && (
        <div className="pagination">

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => page - 1)
            }
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => page + 1)
            }
            disabled={currentPage === totalPages}
          >
            Next →
          </button>

        </div>
      )}

    </div>
  );
}

export default HotelList;
