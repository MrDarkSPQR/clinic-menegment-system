export interface PatientCreate {
  full_name: string;
  phone_number: string;
}

export interface PatientResponse {
  id: number;
  full_name: string;
  phone_number: string;
}

export interface AppointmentCreate {
  patient_id: number;
  doctor_name: string;
  appointment_date: string;
}

export interface AppointmentResponse {
  id: number;
  patient_id: number;
  doctor_name: string;
  appointment_date: string;
  status: string;
}