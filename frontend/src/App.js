import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.js';
import Home from './pages/Home.js';
import Experts from './pages/Experts.js';
import ExpertDetail from './pages/ExpertDetail.js';
import BookingForm from './pages/BookingForm.js';
import Bookings from './pages/Bookings.js';
import NotFound from './pages/NotFound.js';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/experts" element={<Experts />} />
        <Route path="/experts/:id" element={<ExpertDetail />} />
        <Route path="/experts/:id/book" element={<BookingForm />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}