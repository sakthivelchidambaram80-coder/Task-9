
import { NavLink } from "react-router-dom";
import { House, LayoutGrid, ShoppingBag, UserRound } from "lucide-react";
import './BottomNavigation.css';

export default function BottomNavigation() {
  const items = [
    { to: "/", label: "Home", Icon: House },
    { to: "/menu", label: "Menu", Icon: LayoutGrid },
    { to: "/cart", label: "Cart", Icon: ShoppingBag },
    { to: "/profile", label: "Profile", Icon: UserRound },
  ];

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `nav-item${isActive ? " active" : ""}`
          }
        >
          <Icon size={22} strokeWidth={1.8} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
