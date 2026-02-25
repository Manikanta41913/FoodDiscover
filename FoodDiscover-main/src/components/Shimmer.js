const Shimmer = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Hero Shimmer */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-dark-800 dark:via-dark-900 dark:to-dark-800 border-b border-dark-100 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="h-12 bg-dark-200 dark:bg-dark-700 rounded-lg w-2/3 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-dark-200 dark:bg-dark-700 rounded-lg w-1/2 mx-auto animate-pulse"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="flex-1 w-full md:max-w-md h-12 bg-dark-200 dark:bg-dark-700 rounded-lg animate-pulse"></div>
              <div className="h-12 w-32 bg-dark-200 dark:bg-dark-700 rounded-lg animate-pulse"></div>
              <div className="h-12 w-32 bg-dark-200 dark:bg-dark-700 rounded-lg animate-pulse"></div>
              <div className="h-12 w-32 bg-dark-200 dark:bg-dark-700 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Shimmer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-8 bg-dark-200 dark:bg-dark-700 rounded-lg w-48 mb-8 animate-pulse"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="card overflow-hidden">
              {/* Image Skeleton */}
              <div className="h-48 bg-dark-200 dark:bg-dark-700 animate-pulse"></div>
              
              {/* Content Skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-6 bg-dark-200 dark:bg-dark-700 rounded animate-pulse"></div>
                <div className="flex justify-between">
                  <div className="h-5 bg-dark-200 dark:bg-dark-700 rounded w-20 animate-pulse"></div>
                  <div className="h-5 bg-dark-200 dark:bg-dark-700 rounded w-24 animate-pulse"></div>
                </div>
                <div className="h-4 bg-dark-200 dark:bg-dark-700 rounded animate-pulse"></div>
                <div className="h-10 bg-dark-200 dark:bg-dark-700 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
