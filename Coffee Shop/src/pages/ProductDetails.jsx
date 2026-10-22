
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import { coffees } from "../data";
import "./ProductDetails.css";
import { FaRegHeart } from "react-icons/fa";
import Order from "./Order";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const coffee = coffees.find((item) => item.id === id);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");

  if (!coffee) {
    return (
      <div className="product-page">
        <h2>Coffee not found</h2>
        <button
          className="product-button"
          onClick={() => navigate("/menu")}
        >
          Back to menu
        </button>
      </div>
    );
  }

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("coffee-cart") || "[]");
    const key = `${coffee.id}-${size}`;
    const existing = cart.find((item) => item.cartKey === key);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        ...coffee,
        cartKey: key,
        size,
        quantity,
      });
    }

    localStorage.setItem("coffee-cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    navigate("/cart");
  }

  return (
    <div className="product-page">
      <button
        className="product-back-button"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack  size={21} />
       Detail <FaRegHeart  size={21}/>
      </button>
      

      <img
        className="product-detail-image"
        src={coffee.image}
        alt={coffee.name}
      />

      <div className="product-title-row">
        <div>
          <h1>{coffee.name}</h1>
          <p className="product-muted">{coffee.subtitle}</p>
        </div>

        <span className="product-rating">
          <Star size={16} fill="#F5B544" color="#F5B544" />
          {coffee.rating}
        </span>
      </div>

      <h3 className="product-option-title">Description</h3>

      <p className="product-muted product-description">
        A cappuccino is an approximately 150 ml (5 oz) beverage, with
        25 ml of espresso coffee and 85ml of fresh milk.
      </p>

      <h3 className="product-option-title">Size</h3>

      <div className="product-size-options">
        {["S", "M", "L"].map((item) => (
          <button
            key={item}
            className={`product-size-button${
              size === item ? " selected" : ""
            }`}
            onClick={() => setSize(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="product-footer">
        <div>
          <span className="product-eyebrow">Price</span>
          <h2>
            $
            {(
              coffee.price +
              (size === "L" ? 0.8 : size === "M" ? 0.4 : 0)
            ).toFixed(2)}
          </h2>
        </div>

        <button className="product-button" onClick={() => navigate("/Order")}>
          Buy Now
        </button>
      </div>
    </div>
  );
}
