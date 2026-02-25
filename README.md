# 🍔 FoodHub - Modern Food Delivery Platform

A professional, production-ready food delivery web application built with React, Redux Toolkit, and Tailwind CSS.

![FoodHub](https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop)

## ✨ Features

### Core Functionality
- 🏪 **Restaurant Discovery** - Browse restaurants with real-time data from Swiggy API
- 🔍 **Smart Search** - Debounced search for restaurants and cuisines
- 🎯 **Advanced Filters** - Filter by rating, delivery time, and more
- 🛒 **Shopping Cart** - Full-featured cart with quantity controls
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🌙 **Dark Mode** - Toggle between light and dark themes with persistence

### Professional Features
- ⚡ **Fast Performance** - Optimized with lazy loading and code splitting
- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations
- 🔔 **Toast Notifications** - User-friendly feedback for all actions
- 📊 **Order Summary** - Detailed breakdown with taxes and fees
- 🔙 **Navigation** - Breadcrumbs and back buttons for easy navigation
- ⬆️ **Scroll to Top** - Smooth scroll to top button
- ✅ **Form Validation** - Client-side validation with error messages
- 🎭 **Loading States** - Skeleton loaders and spinners
- 🚫 **Error Handling** - Graceful fallbacks and error messages
- 🖼️ **Image Fallbacks** - Smart fallback images for missing content

## 🚀 Tech Stack

- **Frontend Framework**: React 18
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Build Tool**: Parcel
- **Testing**: Jest + React Testing Library

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/foodhub.git

# Navigate to project directory
cd foodhub

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🌐 Deployment

### Deploy to Render

1. Push your code to GitHub
2. Go to [Render Dashboard](https://render.com)
3. Click "New +" → "Static Site"
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
6. Click "Create Static Site"

Your site will be live at `https://your-app-name.onrender.com`

## 🎨 Features in Detail

### Restaurant Listing
- Grid layout with 1-4 columns (responsive)
- Restaurant cards with hover effects
- Rating badges and delivery time
- Cuisine tags
- Promoted restaurant labels

### Restaurant Menu
- Dark gradient header with restaurant info
- Accordion-style categories
- Veg/non-veg indicators
- Item images with fallbacks
- Add to cart functionality

### Shopping Cart
- Grouped items with quantity controls
- Individual item removal
- Order summary with price breakdown
- Empty state with call-to-action
- Toast notifications for actions

### Search & Filters
- Real-time debounced search
- Search by restaurant name or cuisine
- Filter by top-rated restaurants
- Filter by fast delivery
- Active filter highlighting

### Dark Mode
- System-wide dark mode toggle
- Persistent theme preference
- Smooth transitions
- Optimized for readability

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run watch-test
```

## 📁 Project Structure

```
FoodHub/
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Body.js
│   │   ├── RestaurantCard.js
│   │   ├── RestaurantMenu.js
│   │   ├── Cart.js
│   │   ├── Footer.js
│   │   ├── Toast.js
│   │   ├── ScrollToTop.js
│   │   └── ...
│   ├── utils/
│   │   ├── appStore.js
│   │   ├── cartSlice.js
│   │   ├── UserContext.js
│   │   └── ...
│   └── App.js
├── index.html
├── index.css
├── tailwind.config.js
├── package.json
└── README.md
```

## 🎯 Future Enhancements

- [ ] Supabase backend integration
- [ ] User authentication
- [ ] Order history
- [ ] Payment integration
- [ ] Real-time order tracking
- [ ] Restaurant reviews and ratings
- [ ] Favorites/Wishlist
- [ ] Multiple delivery addresses
- [ ] Promo codes and discounts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ by the FoodHub Team

## 🙏 Acknowledgments

- Restaurant data provided by Swiggy API
- Images from Unsplash
- Icons from Heroicons

---

**Live Demo**: [https://fooddiscover.onrender.com](https://fooddiscover.onrender.com)

**Support**: support@foodhub.com
