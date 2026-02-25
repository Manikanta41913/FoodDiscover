import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { loggedInUser } = useContext(UserContext);

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    sla,
  } = resData;

  // Fallback images for different cuisine types
  const getFallbackImage = () => {
    const cuisine = cuisines?.[0]?.toLowerCase() || '';
    const fallbackImages = {
      'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      'pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      'chinese': 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop',
      'indian': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
      'biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
      'dessert': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
      'default': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop'
    };
    
    for (let key in fallbackImages) {
      if (cuisine.includes(key)) return fallbackImages[key];
    }
    return fallbackImages.default;
  };

  const imageUrl = cloudinaryImageId 
    ? `${CDN_URL}${cloudinaryImageId}` 
    : getFallbackImage();

  return (
    <div
      data-testid="resCard"
      className="card overflow-hidden group cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-dark-100 dark:bg-dark-700">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          alt={name}
          src={imageUrl}
          onError={(e) => {
            e.target.src = getFallbackImage();
          }}
        />
        {/* Delivery Time Badge */}
        <div className="absolute top-3 right-3 bg-white dark:bg-dark-800 px-3 py-1 rounded-full shadow-md">
          <span className="text-sm font-semibold text-dark-700 dark:text-dark-200">
            ⚡ {sla?.deliveryTime || sla?.slaString || '30 mins'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-dark-900 dark:text-white mb-2 line-clamp-1">
          {name}
        </h3>
        
        {/* Rating and Cost */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">⭐</span>
            <span className="font-semibold text-dark-800 dark:text-dark-100">{avgRating || '4.0'}</span>
          </div>
          <span className="text-sm font-medium text-dark-600 dark:text-dark-300">
            {costForTwo || '₹300 for two'}
          </span>
        </div>

        {/* Cuisines */}
        <p className="text-sm text-dark-600 dark:text-dark-300 line-clamp-1 mb-3">
          {cuisines?.join(", ")}
        </p>

        {/* View Menu Button */}
        <button className="w-full py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors">
          View Menu
        </button>
      </div>
    </div>
  );
};

// Higher Order Component for Promoted Label
export const withPromtedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-dark-900 px-3 py-1 rounded-full shadow-lg">
          <span className="text-xs font-bold">✨ PROMOTED</span>
        </div>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
