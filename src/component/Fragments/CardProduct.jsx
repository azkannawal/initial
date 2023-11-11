import { Link } from "react-router-dom";
import Button from "../Elements/Button";

const CardProduct = (props) => {
  const { children } = props;
  return (
    <div className="w-full max-w-sm bg-gray-800 rounded-lg shadow">
      {children}
    </div>
  );
};

const Header = (props) => {
  const { image } = props;
  return (
    <Link to="#">
      <img src={image} alt="product" className="p-8 rounded-t-lg h-72 w-full object-cover" />
    </Link>
  );
};

const Body = (props) => {
  const { children, name } = props;
  return (
    <div className="px-5 pb-5">
      <Link to="#">
        <h5 className="text-xl font-semibold tracking-tight text-white">
          {name.substring(0, 20)}...
        </h5>
        <p className="text-sm text-white">{children.substring(0, 100)}..</p>
      </Link>
    </div>
  );
};

const Footer = (props) => {
  const { price, handleAddToCart, id } = props;
  return (
    <div className="flex items-center justify-between px-5 pb-5">
      <span className="text-2xl font-bold text-white">Rp {price.toLocaleString('id-ID', {styles: 'currency', currency: 'IDR'})}</span>
      <Button modify="bg-gray-900" onClick={() => handleAddToCart(id)}>Add to cart</Button>
    </div>
  );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
