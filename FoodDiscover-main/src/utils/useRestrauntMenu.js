import { useEffect, useState } from "react";
import { fetchRestaurantById, fetchMenuItems } from "./supabaseService";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const restaurant = await fetchRestaurantById(resId);
      const menuItems = await fetchMenuItems(resId);
      
      // Transform to match existing structure
      const groupedByCategory = menuItems.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {});

      const categories = Object.keys(groupedByCategory).map(category => ({
        card: {
          card: {
            '@type': 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory',
            title: category,
            itemCards: groupedByCategory[category].map(item => ({
              card: {
                info: {
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  price: item.price,
                  defaultPrice: item.default_price,
                  isVeg: item.is_veg ? 1 : 0,
                  imageId: item.image_id
                }
              }
            }))
          }
        }
      }));

      setResInfo({
        cards: [
          {
            card: {
              card: {
                info: {
                  name: restaurant.name,
                  cuisines: restaurant.cuisines,
                  costForTwoMessage: `₹${restaurant.cost_for_two} for two`,
                  avgRating: restaurant.avg_rating,
                  totalRatingsString: restaurant.total_ratings,
                  sla: { slaString: `${restaurant.delivery_time} mins` }
                }
              }
            }
          },
          {},
          {
            groupedCard: {
              cardGroupMap: {
                REGULAR: { cards: categories }
              }
            }
          }
        ]
      });
    } catch (error) {
      console.log("Supabase menu failed, using Swiggy API", error);
      try {
        const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.62448069999999&restaurantId=${resId}`);
        if (!data.ok) throw new Error('API failed');
        const json = await data.json();
        setResInfo(json.data);
      } catch (error) {
        console.log("Menu API failed, using mock data");
        const mockData = await import("../components/mocks/mockResMenu.json");
        setResInfo(mockData.data);
      }
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
