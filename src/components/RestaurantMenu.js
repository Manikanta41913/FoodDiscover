import Shimmer from "./Shimmer";
import { useParams, Link, useNavigate } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestrauntMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const navigate = useNavigate();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(0);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage, avgRating, totalRatingsString, sla } =
    resInfo?.cards[0]?.card?.card?.info || {};

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-dark-800 border-b border-dark-100 dark:border-dark-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
              Home
            </Link>
            <span className="text-dark-400">/</span>
            <span className="text-dark-600 dark:text-dark-300">Restaurant</span>
            <span className="text-dark-400">/</span>
            <span className="text-dark-900 dark:text-white font-medium truncate max-w-xs">{name}</span>
          </div>
        </div>
      </div>

      {/* Restaurant Header */}
      <div className="bg-gradient-to-br from-dark-900 to-dark-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-dark-200 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{name}</h1>
              <p className="text-dark-200 text-lg mb-4">
                {cuisines?.join(", ")}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="font-semibold">{avgRating || '4.0'}</span>
                  <span className="text-dark-300">({totalRatingsString || '100+ ratings'})</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span>⚡</span>
                  <span>{sla?.slaString || '30 mins'}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span>💰</span>
                  <span>{costForTwoMessage || '₹300 for two'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">Menu</h2>
        
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-dark-600">No menu items available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((category, index) => (
              <RestaurantCategory
                key={category?.card?.card.title}
                data={category?.card?.card}
                showItems={index === showIndex}
                setShowIndex={() => setShowIndex(showIndex === index ? null : index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
