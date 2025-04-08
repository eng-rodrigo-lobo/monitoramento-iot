# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import random

app = FastAPI()

# Configura CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/sensor-data")
async def get_sensor_data():
    # Simula dados - substitua por dados reais do seu banco de dados
    data = []
    now = datetime.now()
    
    for i in range(20):
        timestamp = now - timedelta(minutes=i*5)
        data.append({ "timestamp": timestamp.isoformat(), "temperature": round(random.uniform(20, 30), "humidity": round(random.uniform(40, 80)) })
    
return data