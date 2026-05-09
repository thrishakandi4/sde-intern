import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../services/api.js';

export default function Home() {
  return (
    <section className="hero-grid">
      <div className="hero-copy">
        <p className="eyebrow">Expert Session Booking System</p>
        <h2>Book experts, manage slots, and receive live updates in one flow.</h2>
        <p className="hero-text">
          Built with a real-time backend, Socket.io notifications, Axios API calls, and a responsive frontend ready for expert discovery and booking.
        </p>

        <div className="hero-actions">
          <Link to="/experts" className="primary-btn">
            Browse Experts
          </Link>
          <Link to="/bookings" className="secondary-btn">
            Manage Bookings
          </Link>
        </div>

         
      </div>

       
    </section>
  );
}