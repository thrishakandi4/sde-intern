import api from './api.js';

export const createBooking = async (payload) => {
  const response = await api.post('/bookings', payload);
  return response.data;
};

export const getBookingsByEmail = async (email) => {
  const response = await api.get('/bookings', {
    params: { email },
  });

  return response.data;
};

export const updateBookingStatus = async (id, status) => {
  const response = await api.patch(`/bookings/${id}/status`, { status });
  return response.data;
};

export const getBookedSlots = async (expertId) => {
  const response = await api.get(`/bookings/expert/${expertId}/booked-slots`);
  return response.data;
};