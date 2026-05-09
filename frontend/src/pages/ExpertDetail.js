import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getExpertById } from '../services/expertsService.js';
import { useSocket } from '../hooks/useSocket.js';

const makeSlotKey = (date, timeSlot) => `${date}__${timeSlot}`;

const groupSlotsByDate = (availableSlots = []) => {
  return availableSlots.reduce((groups, slotGroup) => {
    const dateKey = slotGroup.date;
    groups[dateKey] = slotGroup.slots || [];
    return groups;
  }, {});
};

export default function ExpertDetail() {
  const { id } = useParams();
  const { lastBookedSlot } = useSocket();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookedSlots, setBookedSlots] = useState(() => new Set());

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
      } catch (fetchError) {
        if (ignore) {
          return;
        }

        setError(fetchError.response?.data?.message || 'Unable to load expert details');
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

    const slotExpertId = String(lastBookedSlot.expertId);
    const currentExpertId = String(expert._id);

    if (slotExpertId !== currentExpertId) {
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

  if (loading) {
    return (
      <div className="loading-state page-loading">
        <span className="spinner" aria-hidden="true" />
        <p>Loading expert details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <section className="not-found">
        <div>
          <h2>Expert not found</h2>
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
    <section className="page-stack expert-detail-page">
      <div className="detail-hero surface-card">
        <div>
          <p className="eyebrow">Expert details</p>
          <h2>{expert.name}</h2>
          <p className="hero-text">{expert.bio}</p>
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

      <div className="surface-card">
        <div className="section-header section-header-tight">
          <div>
            <p className="eyebrow">Available slots</p>
            <h3>Grouped by date</h3>
          </div>
          <div className="detail-actions">
            <Link to={`/experts/${expert._id}/book`} className="primary-btn">
              Book now
            </Link>
            <Link to="/experts" className="secondary-btn">
              Back to experts
            </Link>
          </div>
        </div>

        <div className="slot-date-grid">
          {Object.keys(slotGroups).length > 0 ? (
            Object.entries(slotGroups).map(([date, slots]) => (
              <article key={date} className="slot-date-card">
                <div className="slot-date-header">
                  <h4>{date}</h4>
                  <span>{slots.length} slots</span>
                </div>

                <div className="slot-button-grid">
                  {slots.map((timeSlot) => {
                    const slotKey = makeSlotKey(date, timeSlot);
                    const isBooked = bookedSlots.has(slotKey);

                    return (
                      <button key={slotKey} type="button" className={`slot-button ${isBooked ? 'booked' : ''}`} disabled={isBooked}>
                        {isBooked ? 'Booked' : timeSlot}
                      </button>
                    );
                  })}
                </div>
              </article>
            ))
          ) : (
            <p className="status-text">No slots available.</p>
          )}
        </div>
      </div>
    </section>
  );
}