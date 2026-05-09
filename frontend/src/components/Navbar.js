import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/experts', label: 'Experts' },
  { to: '/bookings', label: 'Bookings' },
];

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="brand-lockup">
        <div className="brand-mark">ES</div>
        <div>
          <p className="brand-eyebrow">Real-Time Booking</p>
          <h1>Expert Session Hub</h1>
        </div>
      </div>

      <nav className="topnav">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `topnav-link ${isActive ? 'active' : ''}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}