import { useEffect, useState } from 'react';
import ExpertCard from '../components/ExpertCard.js';
import { getExperts } from '../services/expertsService.js';

const categories = [
  '',
  'Frontend Development',
  'Backend Development',
  'DevOps',
  'Data Science',
  'Product Management',
  'Mobile Development',
  'UI/UX Design',
  'Cybersecurity',
];

export default function Experts() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const pageSize = 12;

  useEffect(() => {
    let ignore = false;

    const loadExperts = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getExperts({ page, limit: pageSize, search, category });

        if (ignore) {
          return;
        }

        setExperts(data.experts || []);
        setTotalPages(data.totalPages || 0);
      } catch (fetchError) {
        if (ignore) {
          return;
        }

        setError(fetchError.response?.data?.message || 'Unable to load experts');
      } finally {
        if (ignore) {
          return;
        }

        setLoading(false);
      }
    };

    loadExperts();

    return () => {
      ignore = true;
    };
  }, [page, search, category]);

  const hasExperts = experts.length > 0;

  return (
    <section className="page-stack">
      <div className="section-header">
        <div>
          <p className="eyebrow">Discover experts</p>
          <h2>Search by name, filter by category, and browse paginated results.</h2>
        </div>

        <div className="filters-row">
          <input
            type="text"
            placeholder="Search expert name"
            value={search}
            onChange={(event) => {
              setPage(1);
              setSearch(event.target.value);
            }}
          />

          <select
            value={category}
            onChange={(event) => {
              setPage(1);
              setCategory(event.target.value);
            }}
          >
            {categories.map((value) => (
              <option key={value || 'all'} value={value}>
                {value || 'All categories'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <span className="spinner" aria-hidden="true" />
          <p>Loading experts...</p>
        </div>
      ) : null}
      {error ? <div className="error-state">{error}</div> : null}

      {!loading && !error && !hasExperts ? (
        <div className="empty-state">
          <h3>No experts found</h3>
          <p>Try a different name or category filter.</p>
        </div>
      ) : null}

      <div className="grid-cards">
        {experts.map((expert) => (
          <ExpertCard key={expert._id} expert={expert} />
        ))}
      </div>

      <div className="pagination-bar">
        <button className="secondary-btn" disabled={page <= 1 || loading} onClick={() => setPage((current) => current - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages || 0}
        </span>
        <button className="secondary-btn" disabled={page >= totalPages || loading} onClick={() => setPage((current) => current + 1)}>
          Next
        </button>
      </div>
    </section>
  );
}