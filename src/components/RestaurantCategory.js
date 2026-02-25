import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div className="card overflow-hidden">
      {/* Accordion Header */}
      <div
        className="flex justify-between items-center p-5 cursor-pointer hover:bg-dark-50 dark:bg-dark-700 transition-colors"
        onClick={handleClick}
      >
        <h3 className="font-bold text-lg text-dark-900">
          {data.title} ({data.itemCards?.length || 0})
        </h3>
        <svg
          className={`w-5 h-5 text-dark-600 dark:text-dark-300 transition-transform duration-200 ${
            showItems ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Accordion Content */}
      {showItems && (
        <div className="border-t border-dark-100">
          <ItemList items={data.itemCards} />
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
