import { useState } from 'react';
import { getBookingsByEmail, updateBookingStatus } from '../services/bookingsService.js';

export default function Bookings() {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [updateError, setUpdateError] = useState('');

  const statusOptions = ['Pending', 'Confirmed', 'Completed'];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setBookings([]);
    setSearched(true);

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError('Email is required');
      return;
    }

    try {
      setLoading(true);
      const response = await getBookingsByEmail(trimmedEmail);
      setBookings(response.data || []);
    } catch (lookupError) {
      setError(lookupError.response?.data?.message || 'Could not fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setUpdatingId(bookingId);
      setUpdateError('');

      await updateBookingStatus(bookingId, newStatus);

      // Update the local state
      setBookings((current) =>
        current.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (statusError) {
      setUpdateError(statusError.response?.data?.message || 'Failed to update booking status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="page-stack">
      <div className="section-header">
        <div>
          <p className="eyebrow">My Bookings</p>
          <h2>Find all your bookings by email.</h2>
        </div>
      </div>

      <div className="surface-card my-bookings-card">
        <form className="lookup-row my-bookings-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search Bookings'}
          </button>
        </form>

        {loading ? (
          <div className="loading-state">
            <span className="spinner" aria-hidden="true" />
            <p>Loading bookings...</p>
          </div>
        ) : null}
        {error ? <div className="error-state">{error}</div> : null}
        {updateError ? <div className="error-state">{updateError}</div> : null}

        {!loading && searched && !error && bookings.length === 0 ? (
          <div className="empty-state">
            <h3>No bookings found</h3>
            <p>Try another email address.</p>
          </div>
        ) : null}

        {!loading && bookings.length > 0 ? (
          <div className="booking-list my-bookings-list">
            {bookings.map((booking) => (
              <article key={booking._id} className="booking-item booking-item-grid">
                <div>
                  <p className="booking-label">Expert</p>
                  <strong>{booking.name}</strong>
                </div>
                <div>
                  <p className="booking-label">Date</p>
                  <strong>{new Date(booking.date).toLocaleDateString()}</strong>
                </div>
                <div>
                  <p className="booking-label">Time Slot</p>
                  <strong>{booking.timeSlot}</strong>
                </div>
                <div>
                  <p className="booking-label">Status</p>
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                    disabled={updatingId === booking._id}
                    style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}