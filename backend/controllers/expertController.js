const Expert = require('../models/Expert');

const getExperts = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
    const search = (req.query.search || '').trim();
    const category = (req.query.category || '').trim();

    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      filter.category = { $regex: `^${category}$`, $options: 'i' };
    }

    const totalExperts = await Expert.countDocuments(filter);
    const totalPages = totalExperts === 0 ? 0 : Math.ceil(totalExperts / limit);
    const currentPage = totalPages === 0 ? 0 : Math.min(page, totalPages);
    const skip = totalPages === 0 ? 0 : (currentPage - 1) * limit;

    const experts = await Expert.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      experts,
      totalPages,
      currentPage,
    });
  } catch (error) {
    next(error);
  }
};

const getExpertById = async (req, res, next) => {
  try {
    const expert = await Expert.findById(req.params.id);

    if (!expert) {
      res.status(404);
      throw new Error('Expert not found');
    }

    res.status(200).json({
      success: true,
      data: expert,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400);
      error.message = 'Invalid expert id';
    }

    next(error);
  }
};

module.exports = {
  getExperts,
  getExpertById,
};