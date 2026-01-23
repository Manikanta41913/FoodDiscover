import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext, { ThemeContext } from "./utils/UserContext";
import { AuthProvider } from "./utils/AuthContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import { useCartSync } from "./utils/useCartSync";

const Grocery = lazy(() => import("./components/Grocery"));
const About = lazy(() => import("./components/About"));

const CartSyncWrapper = () => {
  useCartSync();
  return null;
};

const AppLayout = () => {
  const [userName, setUserName] = useState();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const data = {
      name: "Creator",
    };
    setUserName(data.name);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Provider store={appStore}>
      <AuthProvider>
        <CartSyncWrapper />
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
            <div className="app flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Outlet />
              </main>
              <Footer />
              <ScrollToTop />
            </div>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </AuthProvider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-dark-600 dark:text-dark-300">Loading...</p>
              </div>
            </div>
          }>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-dark-600 dark:text-dark-300">Loading...</p>
              </div>
            </div>
          }>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
