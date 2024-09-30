from sqlalchemy.orm import Session
from fastapi import Depends
from models import SessionLocal

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()