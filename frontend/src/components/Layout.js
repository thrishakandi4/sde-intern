import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.js';

export default function Layout() {
  return (
    <div className="app-shell">
      <div className="app-bg-orb app-bg-orb-one" />
      <div className="app-bg-orb app-bg-orb-two" />
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}