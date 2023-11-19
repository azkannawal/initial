import { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../../context/DarkMode";

const AuthLayout = (props) => {
  const { children, title, type } = props;
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  {
    console.log(isDarkMode);
  }

  return (
    <div className={`flex justify-center items-center min-h-screen ${isDarkMode && "bg-slate-950"}`}>
      <div className="w-full max-w-xs">
        <button className="bg-blue-500 absolute right-2 top-2 p-2 text-white rounded" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? "Light" : "Dark"}
        </button>
        <h1 className="text-3xl font-bold mb-2 text-blue-600">{title}</h1>
        <p className="font-medium text-slate-500 mb-6">
          Welcome, Please enter your details
        </p>
        {children}
        <p className="mt-6 text-slate-700 text-sm text-center">
          {type === "login" //ternary operator
            ? "Don't have an account? "
            : "Already have an account? "}
          {type === "login" && ( //and operator
            <Link to="/register" className="text-blue-500 font-semibold">
              Register
            </Link>
          )}
          {type === "register" && (
            <Link to="/login" className="text-blue-500 font-semibold">
              Login
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
