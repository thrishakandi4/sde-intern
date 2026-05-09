const express = require('express');

const {
  getBookings,
  createBooking,
  updateBookingStatus,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookedSlotsByExpert,
} = require('../controllers/bookingController');

const router = express.Router();

router.route('/').get(getBookings).post(createBooking);
router.route('/expert/:expertId/booked-slots').get(getBookedSlotsByExpert);
router.route('/:id/status').patch(updateBookingStatus);
router.route('/:id').get(getBookingById).put(updateBooking).delete(deleteBooking);

module.exports = router;