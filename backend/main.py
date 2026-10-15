from fastapi import FastAPI

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