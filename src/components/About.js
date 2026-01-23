import { Component } from "react";
import UserContext from "../utils/UserContext";

class About extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-dark-900 dark:text-white mb-4">About FoodHub</h1>
            <p className="text-lg text-dark-600 dark:text-dark-300 max-w-2xl mx-auto">
              Your favorite food delivery platform connecting you with the best restaurants in your area
            </p>
          </div>

          {/* Mission Card */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-dark-700 dark:text-dark-200 leading-relaxed mb-4">
              At FoodHub, we're passionate about bringing delicious food from your favorite local restaurants 
              right to your doorstep. We believe that great food should be accessible to everyone, and we're 
              committed to making the ordering experience as seamless as possible.
            </p>
            <p className="text-dark-700 dark:text-dark-200 leading-relaxed">
              Whether you're craving comfort food, exploring new cuisines, or ordering for a special occasion, 
              we've got you covered with thousands of restaurant partners and lightning-fast delivery.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-bold text-dark-900 dark:text-white mb-2">Fast Delivery</h3>
              <p className="text-sm text-dark-600 dark:text-dark-300">Get your food delivered in 30 minutes or less</p>
            </div>

            <div className="card p-6 text-center">
              <div className="text-4xl mb-3">🍽️</div>
              <h3 className="font-bold text-dark-900 dark:text-white mb-2">Wide Selection</h3>
              <p className="text-sm text-dark-600 dark:text-dark-300">Choose from thousands of restaurants</p>
            </div>

            <div className="card p-6 text-center">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-bold text-dark-900 dark:text-white mb-2">Top Quality</h3>
              <p className="text-sm text-dark-600 dark:text-dark-300">Only the best rated restaurants</p>
            </div>
          </div>

          {/* Team Section */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6 text-center">Meet the Team</h2>
            <UserContext.Consumer>
              {({ loggedInUser }) => (
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-16 h-16 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">{loggedInUser}</h3>
                  <p className="text-dark-600 dark:text-dark-300">Project Creator</p>
                </div>
              )}
            </UserContext.Consumer>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
