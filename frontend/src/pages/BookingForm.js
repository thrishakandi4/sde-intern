import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getExpertById } from '../services/expertsService.js';
import { createBooking, getBookedSlots } from '../services/bookingsService.js';
import { useSocket } from '../hooks/useSocket.js';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  timeSlot: '',
  notes: '',
};

const makeSlotKey = (date, timeSlot) => `${date}__${timeSlot}`;

const groupSlotsByDate = (availableSlots = []) => {
  return availableSlots.reduce((groups, slotGroup) => {
    groups[slotGroup.date] = slotGroup.slots || [];
    return groups;
  }, {});
};

const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

export default function BookingForm() {
  const { id } = useParams();
  const { lastBookedSlot } = useSocket();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [bookedSlots, setBookedSlots] = useState(() => new Set());
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    let ignore = false;

    const loadExpert = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getExpertById(id);

        if (ignore) {
          return;
        }

        setExpert(response.data || null);

        // Load booked slots for this expert
        if (response.data?._id) {
          try {
            const bookedSlotsResponse = await getBookedSlots(response.data._id);
            if (!ignore) {
              const slotsSet = new Set();
              bookedSlotsResponse.bookedSlots.forEach((slot) => {
                slotsSet.add(makeSlotKey(slot.date, slot.timeSlot));
              });
              setBookedSlots(slotsSet);
            }
          } catch (slotsError) {
            console.error('Failed to load booked slots:', slotsError);
          }
        }
      } catch (fetchError) {
        if (ignore) {
          return;
        }

        setError(fetchError.response?.data?.message || 'Unable to load expert');
      } finally {
        if (ignore) {
          return;
        }

        setLoading(false);
      }
    };

    loadExpert();

    return () => {
      ignore = true;
    };
  }, [id]);

  useEffect(() => {
    if (!lastBookedSlot || !expert) {
      return;
    }

    if (String(lastBookedSlot.expertId) !== String(expert._id)) {
      return;
    }

    const dateKey = new Date(lastBookedSlot.date).toISOString().slice(0, 10);
    const slotKey = makeSlotKey(dateKey, lastBookedSlot.timeSlot);

    setBookedSlots((current) => {
      const next = new Set(current);
      next.add(slotKey);
      return next;
    });
  }, [lastBookedSlot, expert]);

  const slotGroups = useMemo(() => {
    return expert ? groupSlotsByDate(expert.availableSlots) : {};
  }, [expert]);

  const selectedDateSlots = useMemo(() => {
    if (!form.date) {
      return [];
    }

    return slotGroups[form.date] || [];
  }, [form.date, slotGroups]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleDateSelect = (date) => {
    setForm((current) => ({
      ...current,
      date,
      timeSlot: '',
    }));
  };

  const handleSlotSelect = (timeSlot) => {
    setForm((current) => ({
      ...current,
      timeSlot,
    }));
  };

  const validateForm = () => {
    if (!form.name.trim()) return 'Name is required';
    if (!isValidEmail(form.email)) return 'Enter a valid email';
    if (!form.phone.trim()) return 'Phone is required';
    if (!form.date) return 'Date is required';
    if (!form.timeSlot) return 'Time slot is required';
    if (!form.notes.trim()) return null;
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const slotKey = makeSlotKey(form.date, form.timeSlot);
    if (bookedSlots.has(slotKey)) {
      setError('This slot has already been booked');
      return;
    }

    try {
      setSubmitting(true);

      const response = await createBooking({
        expertId: expert._id,
        ...form,
      });

      setMessage(response.message || 'Booking created successfully');
      setForm(initialForm);

      // Reload booked slots to update the UI
      if (expert?._id) {
        try {
          const bookedSlotsResponse = await getBookedSlots(expert._id);
          const slotsSet = new Set();
          bookedSlotsResponse.bookedSlots.forEach((slot) => {
            slotsSet.add(makeSlotKey(slot.date, slot.timeSlot));
          });
          setBookedSlots(slotsSet);
        } catch (slotsError) {
          console.error('Failed to reload booked slots:', slotsError);
        }
      }
    } catch (bookingError) {
      setError(bookingError.response?.data?.message || 'Booking request failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-state page-loading">
        <span className="spinner" aria-hidden="true" />
        <p>Loading booking form...</p>
      </div>
    );
  }

  if (error && !expert) {
    return (
      <section className="not-found">
        <div>
          <h2>Booking form unavailable</h2>
          <p>{error}</p>
          <Link to="/experts" className="primary-btn">
            Back to experts
          </Link>
        </div>
      </section>
    );
  }

  if (!expert) {
    return null;
  }

  return (
    <section className="page-stack booking-form-page">
      <div className="detail-hero surface-card">
        <div>
          <p className="eyebrow">Book session</p>
          <h2>{expert.name}</h2>
          <p className="hero-text">Fill in your details and choose one of the available time slots.</p>
        </div>

        <div className="detail-metrics">
          <div>
            <span>Category</span>
            <strong>{expert.category}</strong>
          </div>
          <div>
            <span>Experience</span>
            <strong>{expert.experience} years</strong>
          </div>
          <div>
            <span>Rating</span>
            <strong>{Number(expert.rating).toFixed(1)}</strong>
          </div>
        </div>
      </div>

      <div className="two-column-grid">
        <form className="surface-card form-card" onSubmit={handleSubmit}>
          <h3>Booking details</h3>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input name="date" type="date" value={form.date} onChange={handleChange} />
          <input name="timeSlot" placeholder="Time Slot" value={form.timeSlot} onChange={handleChange} readOnly />
          <textarea name="notes" rows="4" placeholder="Notes" value={form.notes} onChange={handleChange} />

          {message ? <div className="success-state">{message}</div> : null}
          {error ? <div className="error-state">{error}</div> : null}

          <button className="primary-btn" type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Booking'}
          </button>
        </form>

        <div className="surface-card">
          <div className="section-header section-header-tight">
            <div>
              <p className="eyebrow">Available slots</p>
              <h3>Choose a date and slot</h3>
            </div>
            <Link to={`/experts/${expert._id}`} className="secondary-btn">
              View expert
            </Link>
          </div>

          <div className="slot-date-grid">
            {Object.entries(slotGroups).map(([date, slots]) => {
              const isSelectedDate = form.date === date;

              return (
                <article key={date} className={`slot-date-card ${isSelectedDate ? 'selected-date' : ''}`}>
                  <div className="slot-date-header">
                    <h4>{date}</h4>
                    <button type="button" className="secondary-btn" onClick={() => handleDateSelect(date)}>
                      Select date
                    </button>
                  </div>

                  <div className="slot-button-grid">
                    {slots.map((timeSlot) => {
                      const slotKey = makeSlotKey(date, timeSlot);
                      const isBooked = bookedSlots.has(slotKey);
                      const isActive = form.date === date && form.timeSlot === timeSlot;

                      return (
                        <button
                          key={slotKey}
                          type="button"
                          className={`slot-button ${isBooked ? 'booked' : ''} ${isActive ? 'active' : ''}`}
                          disabled={isBooked}
                          onClick={() => {
                            handleDateSelect(date);
                            handleSlotSelect(timeSlot);
                          }}
                        >
                          {isBooked ? 'Booked' : timeSlot}
                        </button>
                      );
                    })}
                  </div>
                </article>
              );
            })}

            {Object.keys(slotGroups).length === 0 ? <p className="status-text">No available slots for this expert.</p> : null}
          </div>

          {selectedDateSlots.length > 0 ? (
            <p className="helper-text">Selected date has {selectedDateSlots.length} available slots.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}