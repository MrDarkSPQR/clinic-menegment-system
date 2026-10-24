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