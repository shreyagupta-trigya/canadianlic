import axios from 'axios';
import { putUrl } from '@/boot/axios';

export const getAllPolicy = async () => {
  try {
    const response = await axios.get(`${putUrl}canadianlicapi/policy/api/v2/get-all-policy`);
    return response.data;
  } catch (error) {
    console.error('Error fetching policies:', error);
    throw error;
  }
};

export const getAllInvestments = async () => {
  try {
    const response = await axios.get(`${putUrl}canadianlicapi/investment/api/v2/get-all-investments`);
    return response.data;
  } catch (error) {
    console.error('Error fetching investments:', error);
    throw error;
  }
};

export const getAllInvestmentAndPolicy = async (payload = {}) => {
  try {
    const response = await axios.post(`${putUrl}canadianlicapi/policy/api/v2/get-all-investment-and-policy`, payload);
    return response.data;
  } catch (error) {
    console.error('Error fetching policies and investments:', error);
    throw error;
  }
};
