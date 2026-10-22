
import { useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { coffees } from "../data";
import CoffeeCard from "../components/CoffeeCard";
import { IoFilter } from "react-icons/io5";
import './Home.css'

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  function addToCart(coffee) {
    const cart = JSON.parse(localStorage.getItem("coffee-cart") || "[]");
    const existing = cart.find((item) => item.id === coffee.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...coffee, quantity: 1 });
    }

    localStorage.setItem("coffee-cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    alert(`${coffee.name} added to cart`);
  }

  const categories = ["All", "Cappuccino", "Latte", "Americano", "Mocha"];

  const filteredCoffees = coffees.filter((coffee) => {
    const matchesCategory =
      category === "All" || coffee.category === category;
    const matchesSearch = coffee.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
    <div className="page">     
      <header className="home-header">
        <div className="location-block">
          <span className="eyebrow">Location</span>
          <button className="location-button">
            <MapPin size={17} />
            Bilzen, Tanjungbalai
            <ChevronDown size={16} />
          </button>
        </div>
        
      </header>     


      <div className="search-box">

      <label className="search-bar">
        <Search size={20} />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search your favorite coffee"
          aria-label="Search coffee"
        />        
      </label>
      <div className="avatar"><IoFilter /></div>
      </div>

      

      <section className="promo-banner">
        <div className="promo-copy">
          <span className="promo-tag">Promo</span>
          <h2>Buy one get </h2>
          <h2>one FREE </h2>
          
        </div>
      </section>
    </div>

      
      <div className="page2">

      <section className="coffee-section">
        <div className="section-heading">
          <h2>Categories</h2>
        </div>

        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-chip${category === item ? " selected" : ""}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="coffee-section">
        <div className="section-heading">
          <h2>Popular coffee</h2>
          <span>{filteredCoffees.length} drinks</span>
        </div>

        <div className="coffee-grid">
          {filteredCoffees.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              onAdd={addToCart}
            />
          ))}
        </div>

        {filteredCoffees.length === 0 && (
          <p className="empty-state">No coffee found. Try another search.</p>
        )}
      </section>
    </div>
    
    </>
  );
}
