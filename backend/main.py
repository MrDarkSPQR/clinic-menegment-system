from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Clinic Management System API",
    description="API для синхронізації записів та управління клінікою",
    version="0.1.0"
)

@app.get("/")
async def root():
    return {"message": "Система працює! API готове до роботи."}

@app.get("/ping")
async def ping():
    return {"status": "ok", "service": "clinic-backend"}

@app.post("/patients/", response_model=schemas.PatientResponse)
def create_patient(patient: schemas.PatientCreate, db: Session = Depends(get_db)):
    db_patient = models.Patient(full_name=patient.full_name, phone_number=patient.phone_number)
    
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    
    return db_patient

@app.get("/patients/", response_model=list[schemas.PatientResponse])
def read_patients(db: Session = Depends(get_db)):
    patients = db.query(models.Patient).all()
    return patients

@app.post("/appointments/", response_model=schemas.AppointmentResponse)
def create_appointment(appointment: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = models.Appointment(
        patient_id=appointment.patient_id,
        doctor_name=appointment.doctor_name,
        appointment_date=appointment.appointment_date
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@app.get("/appointments/", response_model=list[schemas.AppointmentResponse])
def read_appointments(db: Session = Depends(get_db)):
    appointments = db.query(models.Appointment).all()
    return appointments