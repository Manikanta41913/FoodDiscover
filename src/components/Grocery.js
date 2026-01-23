const Grocery = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-4xl font-bold text-dark-900 dark:text-white mb-4">Grocery Store</h1>
          <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
            Fresh groceries delivered to your doorstep. Shop from thousands of products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { emoji: "🥬", title: "Fresh Vegetables", desc: "Farm fresh produce" },
            { emoji: "🍎", title: "Fruits", desc: "Seasonal fruits" },
            { emoji: "🥛", title: "Dairy Products", desc: "Milk, cheese & more" },
            { emoji: "🍞", title: "Bakery", desc: "Fresh baked goods" },
            { emoji: "🥩", title: "Meat & Seafood", desc: "Premium quality" },
            { emoji: "🍝", title: "Pantry Staples", desc: "Rice, pasta & more" },
            { emoji: "🍫", title: "Snacks", desc: "Chips, cookies & treats" },
            { emoji: "🧃", title: "Beverages", desc: "Drinks & juices" },
          ].map((category, index) => (
            <div key={index} className="card p-6 text-center hover:shadow-card-hover transition-all cursor-pointer">
              <div className="text-5xl mb-3">{category.emoji}</div>
              <h3 className="font-bold text-dark-900 dark:text-white mb-1">{category.title}</h3>
              <p className="text-sm text-dark-600 dark:text-dark-300">{category.desc}</p>
            </div>
          ))}
        </div>

        <div className="card p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">Coming Soon!</h2>
          <p className="text-dark-600 dark:text-dark-300 mb-6">
            We're working hard to bring you the best grocery shopping experience. 
            Stay tuned for our launch!
          </p>
          <button className="btn-primary">
            Notify Me When Available
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grocery;
