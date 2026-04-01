from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from schema import VinylRecordBase
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Vinyl Record Library")
models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "localhost:3000",
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
async def create_record(record: VinylRecordBase, db: db_dependency):
    db_record = models.VinylRecords(
        artist=record.artist,
        album_artist=record.album_artist,
        album=record.album,
        year=record.year,
        genre=record.genre,
        record_label=record.record_label,
        format=record.format,
        condition=record.condition,
        album_artwork=record.album_artwork,
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
