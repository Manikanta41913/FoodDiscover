import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">😕</div>
        <h1 className="text-6xl font-bold text-dark-900 dark:text-white mb-4">
          {err?.status || "Oops!"}
        </h1>
        <h2 className="text-2xl font-semibold text-dark-800 dark:text-dark-100 mb-4">
          {err?.statusText || "Something went wrong!"}
        </h2>
        <p className="text-dark-600 dark:text-dark-300 mb-8 max-w-md mx-auto">
          {err?.data || "The page you're looking for doesn't exist or an error occurred."}
        </p>
        <Link to="/" className="btn-primary inline-block">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
