import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { DarkMode } from "../../context/DarkMode";

const TableCart = (props) => {
  const { products } = props;
  const cart = useSelector((state) => state.cart.data);
  const [totalPrice, setTotalPrice] = useState(0);
  const { isDarkMode } = useContext(DarkMode);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

  const totalPriceRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart]);

  return (
    <table className={`text-sm ${isDarkMode && "text-white"}`}>
      <thead className="text-xs text-gray-900 uppercase">
        <tr>
          <th className="text-left px-6 py-3">Product</th>
          <th className="text-left px-6 py-3">Price</th>
          <th className="text-left px-6 py-3">Quantity</th>
          <th className="text-left px-6 py-3">Total</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 &&
          cart.map((item) => {
            const product = products.find((product) => product.id === item.id);
            return (
              <tr key={item.id}>
                <td className="text-left px-6 py-3 font-medium">
                  {product.title.substring(0, 20)}...
                </td>
                <td className="text-left px-6 py-3 font-medium">
                  ${" "}
                  {product.price.toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td className="text-left px-6 py-3 font-medium">{item.qty}</td>
                <td className="text-left px-6 py-3 font-medium">
                  $.{" "}
                  {(item.qty * product.price).toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
                </td>
              </tr>
            );
          })}
        <tr ref={totalPriceRef}>
          <td colSpan={3} className="text-left px-6 py-3">
            Total Price
          </td>
          <td className="text-left px-6 py-3">
            ${" "}
            {totalPrice.toLocaleString("id-ID", {
              styles: "currency",
              currency: "IDR",
            })}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableCart;
