import api from './api.js';

export const getExperts = async ({ page = 1, limit = 6, search = '', category = '' } = {}) => {
  const response = await api.get('/experts', {
    params: { page, limit, search, category },
  });

  return response.data;
};

export const getExpertById = async (id) => {
  const response = await api.get(`/experts/${id}`);
  return response.data;
};