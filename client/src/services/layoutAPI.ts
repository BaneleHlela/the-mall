import axios from 'axios';
import { Layout } from '../types/layoutTypes.ts';
const API_URL = 'http://localhost:5000';

export const fetchLayout = async (layoutId: string): Promise<Layout> => {
  const response = await axios.get(`${API_URL}/api/layouts/${layoutId}`);
  return response.data;
};

export const saveLayout = async (layoutConfig: Layout): Promise<Layout> => {
  const response = await axios.post(`${API_URL}/api/layouts`, layoutConfig);
  return response.data;
};

export const updateLayout = async (layoutId: string, layoutConfig: Layout): Promise<Layout> => {
  const response = await axios.patch(`${API_URL}/api/layouts/${layoutId}`, layoutConfig);
  return response.data;
};

export const deleteLayout = async (layoutId: string): Promise<void> => {
  await axios.delete(`${API_URL}/api/layouts/${layoutId}`);
};
