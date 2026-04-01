from pydantic import BaseModel


class VinylRecordBase(BaseModel):
    artist: str
    album_artist: str
    album: str
    year: int
    genre: list[str]
    record_label: str
    format: str
    condition: str
    album_artwork: str
