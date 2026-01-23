import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const getFallbackImage = (itemName) => {
    const name = itemName?.toLowerCase() || '';
    if (name.includes('biryani')) return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=300&fit=crop';
    if (name.includes('pizza')) return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop';
    if (name.includes('burger')) return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop';
    if (name.includes('chicken')) return 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=300&fit=crop';
    if (name.includes('paneer')) return 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop';
    if (name.includes('rice')) return 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=300&h=300&fit=crop';
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop';
  };

  return (
    <div className="divide-y divide-dark-100 dark:divide-dark-700">
      {items?.map((item) => (
        <div
          data-testid="foodItems"
          key={item.card.info.id}
          className="p-5 hover:bg-dark-50 dark:hover:bg-dark-700/50 transition-colors"
        >
          <div className="flex justify-between gap-4">
            {/* Item Details */}
            <div className="flex-1">
              <div className="flex items-start mb-2">
                {item.card.info.isVeg !== undefined && (
                  <span className={`inline-block w-4 h-4 border-2 ${
                    item.card.info.isVeg ? 'border-green-600' : 'border-red-600'
                  } mr-2 mt-1`}>
                    <span className={`block w-2 h-2 rounded-full ${
                      item.card.info.isVeg ? 'bg-green-600' : 'bg-red-600'
                    } m-0.5`}></span>
                  </span>
                )}
                <h4 className="font-semibold text-dark-900 dark:text-white">
                  {item.card.info.name}
                </h4>
              </div>
              
              <p className="font-bold text-dark-800 dark:text-dark-100 mb-2">
                ₹{item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </p>
              
              {item.card.info.description && (
                <p className="text-sm text-dark-600 dark:text-dark-300 line-clamp-2">
                  {item.card.info.description}
                </p>
              )}
            </div>

            {/* Item Image and Add Button */}
            <div className="relative flex-shrink-0">
              <div className="relative">
                <img
                  src={item.card.info.imageId ? CDN_URL + item.card.info.imageId : getFallbackImage(item.card.info.name)}
                  className="w-32 h-32 object-cover rounded-lg"
                  alt={item.card.info.name}
                  onError={(e) => {
                    e.target.src = getFallbackImage(item.card.info.name);
                  }}
                />
                <button
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-8 py-2 bg-white dark:bg-dark-800 text-primary-600 dark:text-primary-400 font-bold rounded-lg shadow-md hover:shadow-lg hover:bg-primary-50 dark:hover:bg-dark-700 transition-all border border-primary-200 dark:border-primary-700"
                  onClick={() => handleAddItem(item)}
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
