# backend/database/database_manager.py
from sqlalchemy import create_engine, Column, Integer, Float, DateTime, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

Base = declarative_base()

class SensorData(Base):
    __tablename__ = 'sensor_data'
    id = Column(Integer, primary_key=True)
    sensor_id = Column(String(50))
    value = Column(Float)
    unit = Column(String(10))
    timestamp = Column(DateTime, default=datetime.utcnow)

class DatabaseManager:
    def __init__(self, db_url):
        self.engine = create_engine(db_url)
        Base.metadata.create_all(self.engine)
        self.Session = sessionmaker(bind=self.engine)

    def insert_sensor_data(self, data):
        session = self.Session()
        try:
            sensor_data = SensorData(
                sensor_id=data['sensor_id'],
                value=data['value'],
                unit=data['unit']
            )
            session.add(sensor_data)
            session.commit()
        except Exception as e:
            print(f"Database error: {e}")
            session.rollback()
        finally:
            session.close()