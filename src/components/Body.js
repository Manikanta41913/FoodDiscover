import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { fetchRestaurants } from "../utils/supabaseService";

const Body = () => {
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText) {
        const filtered = listOfRestaurants.filter((res) =>
          res.info.name.toLowerCase().includes(searchText.toLowerCase()) ||
          res.info.cuisines?.some(cuisine => 
            cuisine.toLowerCase().includes(searchText.toLowerCase())
          )
        );
        setFilteredRestaurant(filtered);
      } else if (activeFilter === "all") {
        setFilteredRestaurant(listOfRestaurants);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText, listOfRestaurants, activeFilter]);

  const fetchData = async () => {
    try {
      console.log('Fetching from Supabase...');
      const data = await fetchRestaurants();
      console.log('Supabase data:', data);
      
      if (!data || data.length === 0) {
        throw new Error('No restaurants in database');
      }
      
      // Transform Supabase data to match existing component structure
      const transformed = data.map(restaurant => ({
        info: {
          id: restaurant.id,
          name: restaurant.name,
          cuisines: restaurant.cuisines,
          avgRating: restaurant.avg_rating,
          sla: { deliveryTime: restaurant.delivery_time },
          costForTwo: `₹${restaurant.cost_for_two} for two`,
          cloudinaryImageId: restaurant.image_url,
          promoted: restaurant.promoted
        }
      }));
      setListOfRestraunt(transformed);
      setFilteredRestaurant(transformed);
    } catch (error) {
      console.log("Supabase failed, using Swiggy API", error);
      try {
        const data = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        setListOfRestraunt(
          json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        setFilteredRestaurant(
          json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
      } catch (apiError) {
        console.log("API failed, using mock data");
        const mockData = await import("./mocks/mockResListData.json");
        setListOfRestraunt(
          mockData?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        setFilteredRestaurant(
          mockData?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
      }
    }
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
        <div className="text-center">
          <div className="text-6xl mb-4">📡</div>
          <h1 className="text-2xl font-bold text-dark-800 dark:text-dark-100 mb-2">You're Offline</h1>
          <p className="text-dark-600 dark:text-dark-300">Please check your internet connection</p>
        </div>
      </div>
    );

  const { loggedInUser, setUserName } = useContext(UserContext);

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-dark-800 dark:via-dark-900 dark:to-dark-800 border-b border-dark-100 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-white mb-4">
              Discover Delicious Food Near You
            </h1>
            <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
              Order from the best restaurants and get it delivered to your doorstep
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              {/* Search Bar */}
              <div className="flex-1 w-full md:max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    data-testid="searchInput"
                    className="input-field w-full pl-12 bg-white dark:bg-dark-800 dark:text-white dark:border-dark-600"
                    placeholder="Search for restaurants or cuisines..."
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      setActiveFilter("all");
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const filtered = listOfRestaurants.filter((res) =>
                          res.info.name.toLowerCase().includes(searchText.toLowerCase()) ||
                          res.info.cuisines?.some(cuisine => 
                            cuisine.toLowerCase().includes(searchText.toLowerCase())
                          )
                        );
                        setFilteredRestaurant(filtered);
                      }
                    }}
                  />
                  <svg 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400 dark:text-dark-500"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <button
                className={`btn-${activeFilter === "all" ? "primary" : "secondary"} whitespace-nowrap`}
                onClick={() => {
                  setActiveFilter("all");
                  setFilteredRestaurant(listOfRestaurants);
                  setSearchText("");
                }}
              >
                All Restaurants
              </button>

              <button
                className={`btn-${activeFilter === "topRated" ? "primary" : "secondary"} whitespace-nowrap`}
                onClick={() => {
                  setActiveFilter("topRated");
                  const filtered = listOfRestaurants.filter(
                    (res) => res.info.avgRating > 4
                  );
                  setFilteredRestaurant(filtered);
                  setSearchText("");
                }}
              >
                ⭐ Top Rated
              </button>

              <button
                className={`btn-${activeFilter === "fastDelivery" ? "primary" : "secondary"} whitespace-nowrap`}
                onClick={() => {
                  setActiveFilter("fastDelivery");
                  const filtered = listOfRestaurants.filter(
                    (res) => parseInt(res.info.sla?.deliveryTime || 60) <= 30
                  );
                  setFilteredRestaurant(filtered);
                  setSearchText("");
                }}
              >
                ⚡ Fast Delivery
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
            {filteredRestaurant.length} Restaurants
          </h2>
        </div>

        {filteredRestaurant.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-dark-800 dark:text-dark-100 mb-2">No restaurants found</h3>
            <p className="text-dark-600 dark:text-dark-300">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurant.map((restaurant) => (
              <Link
                key={restaurant?.info.id}
                to={"/restaurants/" + restaurant?.info.id}
              >
                {restaurant?.info.promoted ? (
                  <RestaurantCardPromoted resData={restaurant?.info} />
                ) : (
                  <RestaurantCard resData={restaurant?.info} />
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
