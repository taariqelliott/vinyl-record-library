from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from typing import Annotated
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from schema import VinylRecordBase
from fastapi.middleware.cors import CORSMiddleware
import models
import json
import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Vinyl Record Library")
models.Base.metadata.create_all(bind=engine)

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://*.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@app.get("/")
async def root():
    return {"message": "Vinyl Record Library API"}


@app.get("/records/")
async def get_all_records(db: db_dependency):
    records = db.query(models.VinylRecords).all()
    return records


@app.get("/records/{record_id}")
async def get_record(record_id: int, db: db_dependency):
    record = (
        db.query(models.VinylRecords)
        .filter(models.VinylRecords.id == record_id)
        .first()
    )
    if not record:
        raise HTTPException(status_code=404, detail="Record is not found.")
    return record


@app.post("/records/")
async def create_record(
    artist: str = Form(...),
    album: str = Form(...),
    album_artist: str = Form(...),
    year: int = Form(...),
    genre: str = Form(...),
    record_label: str = Form(...),
    format: str = Form(...),
    condition: str = Form(...),
    album_artwork: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # Upload image to Cloudinary
    try:
        result = cloudinary.uploader.upload(album_artwork.file)
        artwork_url = result["secure_url"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")

    # Create record with the Cloudinary URL
    db_record = models.VinylRecords(
        artist=artist,
        album_artist=album_artist,
        album=album,
        year=year,
        genre=json.loads(genre),
        record_label=record_label,
        format=format,
        condition=condition,
        album_artwork=artwork_url,
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record


@app.put("/records/{record_id}")
async def update_record(record_id: int, record: VinylRecordBase, db: db_dependency):
    db_record = db.query(models.VinylRecords).filter(
        models.VinylRecords.id == record_id
    )
    existing_record = db_record.first()
    if not existing_record:
        raise HTTPException(status_code=404, detail="Record not found.")
    db_record.update(
        {k: v for k, v in record.model_dump().items()}, synchronize_session=False
    )
    db.commit()
    return existing_record


@app.delete("/records/{record_id}")
async def delete_record(record_id: int, db: db_dependency):
    record = (
        db.query(models.VinylRecords)
        .filter(models.VinylRecords.id == record_id)
        .first()
    )
    if not record:
        raise HTTPException(status_code=404, detail="Record is not found.")
    db.delete(record)
    db.commit()
    return {"Record deleted": record}
