const ErrorState = ({ config = {} }) => {
  const {
    title = "Something went wrong",
    message = "We couldn’t load the data. Please try again later.",
    showRetry = true,
    showHome = true,
  } = config;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-3xl font-bold text-error mb-2">{title}</h2>

      <p className="text-base-content/70 max-w-md mb-6">{message}</p>

      <div className="flex gap-4">
        {showRetry && (
          <button
            onClick={() => window.location.reload()}
            className="btn btn-outline btn-primary"
          >
            Try Again
          </button>
        )}

        {showHome && (
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
