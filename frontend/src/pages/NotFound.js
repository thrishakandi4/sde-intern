import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="not-found">
      <div>
        <h2>Page not found</h2>
        <p>The requested route does not exist.</p>
        <Link to="/" className="primary-btn">
          Go home
        </Link>
      </div>
    </section>
  );
}