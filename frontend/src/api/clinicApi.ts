import axios from 'axios';
import type{
  PatientCreate,
  PatientResponse,
  AppointmentCreate,
  AppointmentResponse,
} from '../types/clinic';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createPatient = async (data: PatientCreate): Promise<PatientResponse> => {
  const response = await api.post<PatientResponse>('/patients/', data);
  return response.data;
};

export const createAppointment = async (data: AppointmentCreate): Promise<AppointmentResponse> => {
  const response = await api.post<AppointmentResponse>('/appointments/', data);
  return response.data;
};