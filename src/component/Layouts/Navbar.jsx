import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import Button from "./../Elements/Button/index";
import { useSelector } from "react-redux";

const Navbar = () => {
  const username = useLogin();
  const [totalCart, setTotalCart] = useState(0);
  const cart = useSelector((state) => state.cart.data);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      return acc + item.qty;
    }, 0);
    setTotalCart(sum);
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("password");
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-end bg-gray-800 text-white items-center px-10 py-4">
      {username}
      <Button modify="bg-red-800 ml-5" onClick={handleLogout}>
        Logout
      </Button>
      <div className="flex items-center bg-gray-950 p-2 rounded-md ml-5">
        {totalCart}
      </div>
    </div>
  );
};

export default Navbar;
