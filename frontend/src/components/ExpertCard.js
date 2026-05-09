import { Link } from 'react-router-dom';

export default function ExpertCard({ expert }) {
  return (
    <article className="expert-card">
      <div className="expert-card-header">
        <div>
          <p className="expert-category">{expert.category}</p>
          <h3>{expert.name}</h3>
        </div>
        <div className="rating-pill">{Number(expert.rating).toFixed(1)}</div>
      </div>

      <div className="expert-summary-grid">
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

      <p className="expert-bio">{expert.bio}</p>

      <div className="slot-preview">
        {(expert.availableSlots || []).slice(0, 2).map((slot) => (
          <div key={slot.date} className="slot-group">
            <span>{slot.date}</span>
            <div className="slot-tags">
              {(slot.slots || []).slice(0, 3).map((time) => (
                <span key={time} className="slot-tag">
                  {time}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card-actions">
        <Link to={`/experts/${expert._id}`} className="secondary-btn card-link-btn">
          View details
        </Link>
      </div>
    </article>
  );
}