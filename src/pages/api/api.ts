import axios from "axios";

const API_BASE_URL = "http://localhost:3333";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface CarProps {
  _id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
}

export const createCar = async (newCarData: CarProps) => {
  try {
    const res = await api.post("/cars", newCarData); // Use newCarData as the payload
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCars = async () => {
  try {
    const res = await api.get("/cars");

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCar = async (_id: CarProps) => {
  try {
    await axios.delete(`${API_BASE_URL}/cars/${_id}`);
  } catch (error) {
    throw error;
  }
};
