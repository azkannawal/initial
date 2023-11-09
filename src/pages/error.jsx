import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-4">
      <h1 className="text-3xl font-bold">Hello there!</h1>
      <p className="font-semibold">The route is wrong</p>
      <p>The page is {error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPage;
