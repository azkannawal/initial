import { useEffect, useRef, useState } from "react";
import CardProduct from "./../component/Fragments/CardProduct";
import Button from "./../component/Elements/Button/index";
import { getProducts } from "../services/product.services";
import { getUsername } from "../services/auth.services";

// const products = [
//   {
//     id: 1,
//     name: "New Shoes",
//     price: 1000000,
//     image:
//       "https://images.unsplash.com/photo-1508020963102-c6c723be5764?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//   },
//   {
//     id: 2,
//     name: "Old Shoes",
//     price: 2000000,
//     image:
//       "https://images.unsplash.com/photo-1508020963102-c6c723be5764?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//   },
// ];

const ProductPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUsername(getUsername(token));
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("password");
    window.location.href = "/login";
  };

  const handleAddToCart = (id) => {
    if (cart.find((item) => item.id === id)) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { id, qty: 1 }]);
    }
  };

  //useRef sebagai alternatif useState, namun tidak auto render
  const cartRef = useRef(JSON.parse(localStorage.getItem("cart")));
  const handleAddToCartRef = (id) => {
    cartRef.current = [...cartRef.current, { id, qty: 1 }];
    localStorage.setItem("cart", JSON.stringify(cartRef.current));
  };

  const totalPriceRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart]);

  return (
    <>
      <div className="flex justify-end bg-gray-800 text-white items-center px-10 py-4">
        {username}
        <Button modify="bg-red-800 ml-5" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="flex flex-wrap justify-center pt-5 gap-5">
        {products.length > 0 &&
          products.map((product) => (
            <CardProduct key={product.id}>
              <CardProduct.Header image={product.image}></CardProduct.Header>
              <CardProduct.Body name={product.title}>
                {product.description}
              </CardProduct.Body>
              <CardProduct.Footer
                price={product.price}
                id={product.id}
                handleAddToCart={handleAddToCart}
              ></CardProduct.Footer>
            </CardProduct>
          ))}
      </div>
      <div className="flex flex-col items-center py-5 gap-3">
        <h1 className="text-2xl font-bold">Cart</h1>
        <table className="text-sm text-gray-800">
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
                const product = products.find(
                  (product) => product.id === item.id
                );
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
                    <td className="text-left px-6 py-3 font-medium">
                      {item.qty}
                    </td>
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
      </div>
    </>
  );
};

export default ProductPage;
