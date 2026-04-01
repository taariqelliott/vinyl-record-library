from sqlalchemy import Column, Integer, String, ARRAY
from database import Base


class VinylRecords(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True, index=True)
    artist = Column(String, index=True)
    album_artist = Column(String, index=True)
    album = Column(String, index=True)
    year = Column(Integer, index=True)
    genre = Column(ARRAY(String), index=True)
    record_label = Column(String, index=True)
    format = Column(String, index=True)
    condition = Column(String, index=True)
    album_artwork = Column(String, index=True)
