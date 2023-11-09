import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = (props) => {
  const { children, title, type } = props;
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xs">
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
