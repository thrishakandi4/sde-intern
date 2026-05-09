const Booking = require('../models/Booking');

const allowedStatusValues = ['Pending', 'Confirmed', 'Completed'];

const requiredBookingFields = ['expertId', 'name', 'email', 'phone', 'date', 'timeSlot'];

const isDuplicateKeyError = (error) => error && error.code === 11000;

const validateBookingPayload = (payload) => {
  const missingFields = requiredBookingFields.filter((field) => {
    const value = payload[field];
    return value === undefined || value === null || value === '';
  });

  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(', ')}`;
  }

  if (!payload.name || typeof payload.name !== 'string') {
    return 'name must be a non-empty string';
  }

  if (!payload.email || typeof payload.email !== 'string') {
    return 'email must be a non-empty string';
  }

  if (!payload.phone || typeof payload.phone !== 'string') {
    return 'phone must be a non-empty string';
  }

  if (!payload.timeSlot || typeof payload.timeSlot !== 'string') {
    return 'timeSlot must be a non-empty string';
  }

  const parsedDate = new Date(payload.date);
  if (Number.isNaN(parsedDate.getTime())) {
    return 'date must be a valid date';
  }

  return null;
};

const getBookings = async (req, res, next) => {
  try {
    const { email } = req.query;

    if (!email) {
      res.status(400);
      throw new Error('email query parameter is required');
    }

    const bookings = await Booking.find({ email: email.toLowerCase().trim() }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const validationError = validateBookingPayload(req.body);

    if (validationError) {
      res.status(400);
      throw new Error(validationError);
    }

    const booking = await Booking.create(req.body);

    const io = req.app.get('io');
    if (io) {
      io.emit('slotBooked', {
        expertId: booking.expertId,
        date: booking.date,
        timeSlot: booking.timeSlot,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      res.status(409);
      error.message = 'This expert is already booked for the selected date and time slot';
    }

    next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!allowedStatusValues.includes(status)) {
      res.status(400);
      throw new Error(`status must be one of: ${allowedStatusValues.join(', ')}`);
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }

    res.status(200).json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const getBookedSlotsByExpert = async (req, res, next) => {
  try {
    const { expertId } = req.params;

    const bookings = await Booking.find({ expertId }).select('date timeSlot status');

    const bookedSlots = bookings.map((booking) => ({
      date: booking.date.toISOString().slice(0, 10),
      timeSlot: booking.timeSlot,
      status: booking.status,
    }));

    res.status(200).json({
      success: true,
      bookedSlots,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookings,
  createBooking,
  updateBookingStatus,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookedSlotsByExpert,
};