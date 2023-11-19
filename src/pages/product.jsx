import { useEffect, useRef, useState } from "react";
import CardProduct from "./../component/Fragments/CardProduct";
import { getProducts } from "../services/product.services";
import { useLogin } from "../hooks/useLogin";
import TableCart from "./../component/Fragments/TableCart";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  useLogin();

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center pt-5 gap-5">
        {products.length > 0 &&
          products.map((product) => (
            <CardProduct key={product.id}>
              <CardProduct.Header
                image={product.image}
                id={product.id}
              ></CardProduct.Header>
              <CardProduct.Body name={product.title}>
                {product.description}
              </CardProduct.Body>
              <CardProduct.Footer
                price={product.price}
                id={product.id}
              ></CardProduct.Footer>
            </CardProduct>
          ))}
      </div>
      <div className="flex flex-col items-center py-5 gap-3">
        <h1 className="text-2xl font-bold">Cart</h1>
        <TableCart products={products} />
      </div>
    </>
  );
};

export default ProductPage;
