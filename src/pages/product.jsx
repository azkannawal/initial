import { useState } from "react";
import CardProduct from "./../component/Fragments/CardProduct";
import Button from "./../component/Elements/Button/index";

const products = [
  {
    id: 1,
    name: "New Shoes",
    price: 1000000,
    image:
      "https://images.unsplash.com/photo-1508020963102-c6c723be5764?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 2,
    name: "Old Shoes",
    price: 2000000,
    image:
      "https://images.unsplash.com/photo-1508020963102-c6c723be5764?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  },
];

const email = localStorage.getItem("email");

const ProductPage = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Old Shoes",
      qty: 1,
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("email");
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

  return (
    <>
      <div className="flex justify-end bg-gray-800 text-white items-center px-10 py-4">
        {email}
        <Button modify="bg-red-800 ml-5" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="flex justify-center py-5 gap-5">
        {products.map((product) => (
          <CardProduct key={product.id}>
            <CardProduct.Header image={product.image}></CardProduct.Header>
            <CardProduct.Body name={product.name}>
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
        <table className="text-sm text-gray-500">
          <thead className="text-xs text-gray-900 uppercase">
            <tr>
              <th className="text-left px-6 py-3">Product</th>
              <th className="text-left px-6 py-3">Price</th>
              <th className="text-left px-6 py-3">Quantity</th>
              <th className="text-left px-6 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              const product = products.find(
                (product) => product.id === item.id
              );
              return (
                <tr key={item.id}>
                  <td className="text-left px-6 py-3 font-medium">{product.name}</td>
                  <td className="text-left px-6 py-3 font-medium">
                    Rp{" "}
                    {product.price.toLocaleString("id-ID", {
                      styles: "currency",
                      currency: "IDR",
                    })}
                  </td>
                  <td className="text-left px-6 py-3 font-medium">{item.qty}</td>
                  <td className="text-left px-6 py-3 font-medium">
                    Rp.{" "}
                    {(item.qty * product.price).toLocaleString("id-ID", {
                      styles: "currency",
                      currency: "IDR",
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductPage;
