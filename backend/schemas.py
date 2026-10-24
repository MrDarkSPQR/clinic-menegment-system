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