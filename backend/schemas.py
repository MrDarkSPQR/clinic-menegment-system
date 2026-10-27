from pydantic import BaseModel

class PatientCreate(BaseModel):
    full_name: str
    phone_number: str

class PatientResponse(BaseModel):
    id: int
    full_name: str
    phone_number: str

    class Config:
        from_attributes = True  

class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_name: str
    appointment_date: str

class AppointmentResponse(BaseModel):
    id: int
    patient_id: int
    doctor_name: str
    appointment_date: str
    status: str

    class Config:
        from_attributes = True