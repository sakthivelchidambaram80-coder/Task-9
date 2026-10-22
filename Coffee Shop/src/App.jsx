
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Delivery from "./pages/Delivery";
import ProductDetails from "./pages/ProductDetails";
import Order from "./pages/Order";
// import Profile from "./pages/Profile";
import BottomNavigation from "./components/BottomNavigation";


import "./index.css";


function AppLayout() {
  return (
    <>
      <main className="app-shell">
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Delivery" element={<Delivery />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/Order" element={<Order />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </main>
      

      <BottomNavigation />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
