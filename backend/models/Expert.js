const mongoose = require('mongoose');

const availableSlotSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      trim: true,
    },
    slots: {
      type: [String],
      required: true,
      default: [],
    },
  },
  { _id: false }
);

const expertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    bio: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
      trim: true,
    },
    availableSlots: {
      type: [availableSlotSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Expert = mongoose.model('Expert', expertSchema);

module.exports = Expert;