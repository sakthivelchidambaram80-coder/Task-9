
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  CirclePercent,
  CreditCard,
  FileText,
  MapPin,
  Minus,
  Pencil,
  Plus,
  Wallet,
} from "lucide-react";
import "./Order.css";

const DELIVERY_FEE = 2;
const DISCOUNTED_DELIVERY_FEE = 1;

export default function Order() {
  const navigate = useNavigate();

  const [orderType, setOrderType] = useState("deliver");
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("Jl. Kpg Sutoyo");
  const [addressDetails, setAddressDetails] = useState(
    "Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai."
  );
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash/Wallet");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");

  useEffect(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("coffee-cart") || "[]"
      );
      setCart(Array.isArray(savedCart) ? savedCart : []);
    } catch {
      setCart([]);
    }
  }, []);

  const updateQuantity = (cartKey, change) => {
    setCart((currentCart) => {
      const updatedCart = currentCart
        .map((item) => {
          if (item.cartKey !== cartKey) return item;

          return {
            ...item,
            quantity: Math.max(0, (item.quantity || 1) + change),
          };
        })
        .filter((item) => item.quantity > 0);

      localStorage.setItem("coffee-cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cart-updated"));

      return updatedCart;
    });
  };

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price || 0) * (item.quantity || 1),
    0
  );

  const deliveryFee =
    orderType === "deliver" ? DISCOUNTED_DELIVERY_FEE : 0;

  const total = subtotal + deliveryFee;

  const editAddress = () => {
    const newAddress = window.prompt("Enter your delivery address", address);
    if (newAddress?.trim()) setAddress(newAddress.trim());

    const newDetails = window.prompt(
      "Enter your full address",
      addressDetails
    );
    if (newDetails?.trim()) setAddressDetails(newDetails.trim());
  };

  const addNote = () => {
    const newNote = window.prompt("Add a note for your order", note);
    if (newNote !== null) setNote(newNote.trim());
  };

  const placeOrder = () => {
    if (!cart.length) {
      setOrderMessage("Your cart is empty. Add a coffee before ordering.");
      return;
    }

    const order = {
      id: `ORD-${Date.now()}`,
      items: cart,
      orderType,
      address: orderType === "deliver" ? addressDetails : "Store pickup",
      note,
      paymentMethod,
      subtotal: Number(subtotal.toFixed(2)),
      deliveryFee,
      total: Number(total.toFixed(2)),
      createdAt: new Date().toISOString(),
    };

    const previousOrders = JSON.parse(
      localStorage.getItem("coffee-orders") || "[]"
    );

    localStorage.setItem(
      "coffee-orders",
      JSON.stringify([...previousOrders, order])
    );
    localStorage.removeItem("coffee-cart");
    window.dispatchEvent(new Event("cart-updated"));

    setCart([]);
    setOrderMessage(`Order placed successfully! Order ID: ${order.id}`);
  };

  return (
    <main className="order-page">
      <header className="order-header">
        <button
          className="order-back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <h1>Order</h1>
        <span className="order-header-spacer" />
      </header>

      <div className="order-type-switch">
        <button
          className={orderType === "deliver" ? "selected" : ""}
          onClick={() => setOrderType("deliver")}
        >
          Deliver
        </button>
        <button
          className={orderType === "pickup" ? "selected" : ""}
          onClick={() => setOrderType("pickup")}
        >
          Pick Up
        </button>
      </div>

      {orderType === "deliver" && (
        <section className="order-address-section">
          <h2>Delivery Address</h2>

          <div className="order-address-info">
            <h3>{address}</h3>
            <p>{addressDetails}</p>
          </div>

          <div className="order-address-actions">
            <button onClick={editAddress}>
              <Pencil size={17} />
              Edit Address
            </button>
            <button onClick={addNote}>
              <FileText size={17} />
              {note ? "Edit Note" : "Add Note"}
            </button>
          </div>

          {note && <p className="order-note">Note: {note}</p>}
        </section>
      )}

      {orderType === "pickup" && (
        <section className="order-pickup-info">
          <MapPin size={22} />
          <div>
            <h2>Pick Up Your Order</h2>
            <p>Collect your coffee at the store.</p>
          </div>
        </section>
      )}

      <section className="order-items-section">
        {cart.length === 0 ? (
          <div className="order-empty-cart">
            <p>Your cart is empty.</p>
            <button onClick={() => navigate("/menu")}>
              Browse Coffee
            </button>
          </div>
        ) : (
          cart.map((item) => (
            <article
              className="order-item"
              key={item.cartKey || item.id}
            >
              <img src={item.image} alt={item.name} />

              <div className="order-item-details">
                <h3>{item.name}</h3>
                <p>{item.subtitle || "Freshly brewed coffee"}</p>
                {item.size && <span>Size: {item.size}</span>}
                <strong>
                  ${(Number(item.price || 0) * (item.quantity || 1)).toFixed(2)}
                </strong>
              </div>

              <div className="order-quantity">
                <button
                  onClick={() => updateQuantity(item.cartKey, -1)}
                  aria-label={`Decrease ${item.name} quantity`}
                >
                  <Minus size={17} />
                </button>
                <span>{item.quantity || 1}</span>
                <button
                  onClick={() => updateQuantity(item.cartKey, 1)}
                  aria-label={`Increase ${item.name} quantity`}
                >
                  <Plus size={19} />
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      <button
        className="order-discount-card"
        onClick={() =>
          setOrderMessage("Your discounted delivery fee is applied.")
        }
      >
        <CirclePercent size={32} />
        <span>1 Discount is Applied</span>
        <ChevronRight size={26} />
      </button>

      <section className="order-summary">
        <h2>Payment Summary</h2>

        <div className="order-summary-row">
          <span>Price</span>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>

        {orderType === "deliver" && (
          <div className="order-summary-row">
            <span>Delivery Fee</span>
            <div className="order-delivery-prices">
              <del>${DELIVERY_FEE.toFixed(1)}</del>
              <strong>${deliveryFee.toFixed(1)}</strong>
            </div>
          </div>
        )}

        {orderType === "pickup" && (
          <div className="order-summary-row">
            <span>Pickup Fee</span>
            <strong>$0.00</strong>
          </div>
        )}
       
      </section>

      <footer className="order-checkout">
        <button
          className="order-payment-selector"
          onClick={() => setShowPaymentOptions(!showPaymentOptions)}
        >
          <Wallet size={34} />
          <span>
            <strong>{paymentMethod}</strong>
            <small>${total.toFixed(2)}</small>
          </span>
          
          <ChevronDown
            className={showPaymentOptions ? "rotated" : ""}
            size={25}
          />
         
        </button>
        <button className="btn" onClick={() => navigate("/Delivery")}> Order</button>
        
        <button
          className="order-submit-button"
          onClick={placeOrder}
          disabled={cart.length === 0}
        >
         
          
        </button>

       
      </footer>
    </main>
  );
}
