import { React } from "react";

const Button = (props) => {
  const {
    children = "default",
    modify,
    onClick = () => {},
    type = "button",
  } = props; //destructuring untuk memberikan default value, juga membuat tidak perlu syntax props.variant
  return (
    <div className="flex justify-center items-center">
      <button
        className={`h-8 pb-1 px-6 font-medium rounded-lg ${modify} text-white`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
