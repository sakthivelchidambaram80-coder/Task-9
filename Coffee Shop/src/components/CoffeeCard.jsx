
import { Heart, Plus, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CoffeeCard({ coffee, onAdd }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="coffee-card">
      <div className="coffee-image-wrap">
        <Link to={`/product/${coffee.id}`}>
          <img
            className="coffee-image"
            src={coffee.image}
            alt={coffee.name}
          />
        </Link>

        <button
          className={`favorite-button${liked ? " liked" : ""}`}
          aria-label={liked ? "Remove favorite" : "Add favorite"}
          aria-pressed={liked}
          onClick={() => setLiked(!liked)}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>

      <Link to={`/product/${coffee.id}`} className="coffee-info">
        <h3>{coffee.name}</h3>
        <p>{coffee.subtitle}</p>
        <div className="coffee-rating">
          <Star size={14} fill="#F5B544" color="#F5B544" />
          <span>{coffee.rating}</span>
        </div>
      </Link>

      <div className="coffee-card-bottom">
        <strong>${coffee.price.toFixed(2)}</strong>
        <button
          className="add-button"
          aria-label={`Add ${coffee.name} to cart`}
          onClick={() => onAdd(coffee)}
        >
          <Plus size={19} />
        </button>
      </div>
    </article>
  );
}
