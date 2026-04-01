from database import SessionLocal
from models import VinylRecords

records_data = [
    {"artist": "The Beatles", "album_artist": "The Beatles", "album": "Abbey Road", "year": 1969, "genre": ["Rock", "Pop"], "record_label": "Apple Records", "format": "LP", "condition": "Mint", "album_artwork": "abbey_road.jpg"},
    {"artist": "Pink Floyd", "album_artist": "Pink Floyd", "album": "The Dark Side of the Moon", "year": 1973, "genre": ["Progressive Rock"], "record_label": "Harvest", "format": "LP", "condition": "Near Mint", "album_artwork": "dark_side.jpg"},
    {"artist": "Michael Jackson", "album_artist": "Michael Jackson", "album": "Thriller", "year": 1982, "genre": ["Pop", "R&B"], "record_label": "Epic Records", "format": "LP", "condition": "Mint", "album_artwork": "thriller.jpg"},
    {"artist": "Led Zeppelin", "album_artist": "Led Zeppelin", "album": "Led Zeppelin IV", "year": 1971, "genre": ["Hard Rock"], "record_label": "Atlantic Records", "format": "LP", "condition": "Very Good", "album_artwork": "zeppelin_iv.jpg"},
    {"artist": "Fleetwood Mac", "album_artist": "Fleetwood Mac", "album": "Rumours", "year": 1977, "genre": ["Pop Rock", "Soft Rock"], "record_label": "Warner Bros", "format": "LP", "condition": "Mint", "album_artwork": "rumours.jpg"},
    {"artist": "Queen", "album_artist": "Queen", "album": "A Night at the Opera", "year": 1975, "genre": ["Rock"], "record_label": "EMI", "format": "LP", "condition": "Near Mint", "album_artwork": "night_opera.jpg"},
    {"artist": "The Rolling Stones", "album_artist": "The Rolling Stones", "album": "Exile on Main St.", "year": 1972, "genre": ["Rock", "Blues"], "record_label": "Rolling Stones Records", "format": "LP", "condition": "Good", "album_artwork": "exile.jpg"},
    {"artist": "David Bowie", "album_artist": "David Bowie", "album": "Ziggy Stardust", "year": 1972, "genre": ["Glam Rock"], "record_label": "RCA", "format": "LP", "condition": "Mint", "album_artwork": "ziggy.jpg"},
    {"artist": "Nirvana", "album_artist": "Nirvana", "album": "Nevermind", "year": 1991, "genre": ["Grunge", "Alternative Rock"], "record_label": "DGC Records", "format": "LP", "condition": "Mint", "album_artwork": "nevermind.jpg"},
    {"artist": "Radiohead", "album_artist": "Radiohead", "album": "OK Computer", "year": 1997, "genre": ["Alternative Rock", "Art Rock"], "record_label": "Parlophone", "format": "LP", "condition": "Near Mint", "album_artwork": "ok_computer.jpg"},
    {"artist": "Prince", "album_artist": "Prince", "album": "Purple Rain", "year": 1984, "genre": ["Pop", "Rock", "R&B"], "record_label": "Warner Bros", "format": "LP", "condition": "Mint", "album_artwork": "purple_rain.jpg"},
    {"artist": "Miles Davis", "album_artist": "Miles Davis", "album": "Kind of Blue", "year": 1959, "genre": ["Jazz", "Modal Jazz"], "record_label": "Columbia", "format": "LP", "condition": "Very Good Plus", "album_artwork": "kind_of_blue.jpg"},
    {"artist": "Jimi Hendrix", "album_artist": "Jimi Hendrix", "album": "Are You Experienced", "year": 1967, "genre": ["Psychedelic Rock"], "record_label": "Track Records", "format": "LP", "condition": "Good Plus", "album_artwork": "are_you_experienced.jpg"},
    {"artist": "Bob Dylan", "album_artist": "Bob Dylan", "album": "Highway 61 Revisited", "year": 1965, "genre": ["Folk Rock"], "record_label": "Columbia", "format": "LP", "condition": "Near Mint", "album_artwork": "highway_61.jpg"},
    {"artist": "Stevie Wonder", "album_artist": "Stevie Wonder", "album": "Songs in the Key of Life", "year": 1976, "genre": ["Soul", "Funk"], "record_label": "Motown", "format": "LP", "condition": "Mint", "album_artwork": "songs_key_life.jpg"},
    {"artist": "AC/DC", "album_artist": "AC/DC", "album": "Back in Black", "year": 1980, "genre": ["Hard Rock"], "record_label": "Albert Productions", "format": "LP", "condition": "Very Good", "album_artwork": "back_in_black.jpg"},
    {"artist": "Metallica", "album_artist": "Metallica", "album": "Master of Puppets", "year": 1986, "genre": ["Thrash Metal"], "record_label": "Elektra", "format": "LP", "condition": "Near Mint", "album_artwork": "master_puppets.jpg"},
    {"artist": "U2", "album_artist": "U2", "album": "The Joshua Tree", "year": 1987, "genre": ["Rock"], "record_label": "Island Records", "format": "LP", "condition": "Mint", "album_artwork": "joshua_tree.jpg"},
    {"artist": "Guns N' Roses", "album_artist": "Guns N' Roses", "album": "Appetite for Destruction", "year": 1987, "genre": ["Hard Rock"], "record_label": "Geffen", "format": "LP", "condition": "Good", "album_artwork": "appetite.jpg"},
    {"artist": "Beastie Boys", "album_artist": "Beastie Boys", "album": "Licensed to Ill", "year": 1986, "genre": ["Hip Hop"], "record_label": "Def Jam", "format": "LP", "condition": "Very Good Plus", "album_artwork": "licensed_ill.jpg"},
    {"artist": "A Tribe Called Quest", "album_artist": "A Tribe Called Quest", "album": "The Low End Theory", "year": 1991, "genre": ["Hip Hop", "Jazz Rap"], "record_label": "Jive Records", "format": "LP", "condition": "Mint", "album_artwork": "low_end_theory.jpg"},
    {"artist": "Kendrick Lamar", "album_artist": "Kendrick Lamar", "album": "To Pimp a Butterfly", "year": 2015, "genre": ["Hip Hop", "Jazz"], "record_label": "Aftermath", "format": "LP", "condition": "Mint Sealed", "album_artwork": "pimp_butterfly.jpg"},
    {"artist": "Daft Punk", "album_artist": "Daft Punk", "album": "Discovery", "year": 2001, "genre": ["Electronic", "House"], "record_label": "Virgin Records", "format": "LP", "condition": "Near Mint", "album_artwork": "discovery.jpg"},
    {"artist": "Massive Attack", "album_artist": "Massive Attack", "album": "Mezzanine", "year": 1998, "genre": ["Trip Hop"], "record_label": "Circa", "format": "LP", "condition": "Very Good", "album_artwork": "mezzanine.jpg"},
    {"artist": "Portishead", "album_artist": "Portishead", "album": "Dummy", "year": 1994, "genre": ["Trip Hop"], "record_label": "Go! Beat", "format": "LP", "condition": "Mint", "album_artwork": "dummy.jpg"},
    {"artist": "OutKast", "album_artist": "OutKast", "album": "Aquemini", "year": 1998, "genre": ["Hip Hop"], "record_label": "LaFace", "format": "LP", "condition": "Near Mint", "album_artwork": "aquemini.jpg"},
    {"artist": "Nas", "album_artist": "Nas", "album": "Illmatic", "year": 1994, "genre": ["Hip Hop"], "record_label": "Columbia", "format": "LP", "condition": "Mint", "album_artwork": "illmatic.jpg"},
    {"artist": "Wu-Tang Clan", "album_artist": "Wu-Tang Clan", "album": "Enter the Wu-Tang", "year": 1993, "genre": ["Hip Hop"], "record_label": "Loud Records", "format": "LP", "condition": "Good Plus", "album_artwork": "enter_wu_tang.jpg"},
    {"artist": "The Notorious B.I.G.", "album_artist": "The Notorious B.I.G.", "album": "Ready to Die", "year": 1994, "genre": ["Hip Hop"], "record_label": "Bad Boy", "format": "LP", "condition": "Near Mint", "album_artwork": "ready_to_die.jpg"},
    {"artist": "Jay-Z", "album_artist": "Jay-Z", "album": "Reasonable Doubt", "year": 1996, "genre": ["Hip Hop"], "record_label": "Roc-A-Fella", "format": "LP", "condition": "Mint", "album_artwork": "reasonable_doubt.jpg"},
    {"artist": "Dr. Dre", "album_artist": "Dr. Dre", "album": "The Chronic", "year": 1992, "genre": ["G-Funk", "Hip Hop"], "record_label": "Death Row", "format": "LP", "condition": "Very Good Plus", "album_artwork": "chronic.jpg"},
    {"artist": "Snoop Dogg", "album_artist": "Snoop Dogg", "album": "Doggystyle", "year": 1993, "genre": ["G-Funk", "Hip Hop"], "record_label": "Death Row", "format": "LP", "condition": "Near Mint", "album_artwork": "doggystyle.jpg"},
    {"artist": "Tom Petty", "album_artist": "Tom Petty and the Heartbreakers", "album": "Damn the Torpedoes", "year": 1979, "genre": ["Rock", "Heartland Rock"], "record_label": "MCA", "format": "LP", "condition": "Good", "album_artwork": "damn_torpedoes.jpg"},
    {"artist": "Bruce Springsteen", "album_artist": "Bruce Springsteen", "album": "Born to Run", "year": 1975, "genre": ["Rock"], "record_label": "Columbia", "format": "LP", "condition": "Very Good", "album_artwork": "born_to_run.jpg"},
    {"artist": "Neil Young", "album_artist": "Neil Young", "album": "Harvest", "year": 1972, "genre": ["Folk Rock"], "record_label": "Reprise", "format": "LP", "condition": "Mint", "album_artwork": "harvest.jpg"},
    {"artist": "Eagles", "album_artist": "Eagles", "album": "Hotel California", "year": 1976, "genre": ["Rock"], "record_label": "Asylum", "format": "LP", "condition": "Near Mint", "album_artwork": "hotel_california.jpg"},
    {"artist": "Talking Heads", "album_artist": "Talking Heads", "album": "Remain in Light", "year": 1980, "genre": ["New Wave", "Post-Punk"], "record_label": "Sire", "format": "LP", "condition": "Mint", "album_artwork": "remain_light.jpg"},
    {"artist": "The Clash", "album_artist": "The Clash", "album": "London Calling", "year": 1979, "genre": ["Punk Rock", "New Wave"], "record_label": "CBS", "format": "LP", "condition": "Good Plus", "album_artwork": "london_calling.jpg"},
    {"artist": "Joy Division", "album_artist": "Joy Division", "album": "Unknown Pleasures", "year": 1979, "genre": ["Post-Punk"], "record_label": "Factory", "format": "LP", "condition": "Very Good", "album_artwork": "unknown_pleasures.jpg"},
    {"artist": "New Order", "album_artist": "New Order", "album": "Power, Corruption & Lies", "year": 1983, "genre": ["New Wave", "Synth-Pop"], "record_label": "Factory", "format": "LP", "condition": "Mint", "album_artwork": "pctl.jpg"},
    {"artist": "Depeche Mode", "album_artist": "Depeche Mode", "album": "Violator", "year": 1990, "genre": ["Synth-Pop"], "record_label": "Mute", "format": "LP", "condition": "Near Mint", "album_artwork": "violator.jpg"},
    {"artist": "The Cure", "album_artist": "The Cure", "album": "Disintegration", "year": 1989, "genre": ["Gothic Rock", "Post-Punk"], "record_label": "Fiction", "format": "LP", "condition": "Very Good Plus", "album_artwork": "disintegration.jpg"},
    {"artist": "Sonic Youth", "album_artist": "Sonic Youth", "album": "Daydream Nation", "year": 1988, "genre": ["Noise Rock", "Alternative"], "record_label": "Enigma Records", "format": "LP", "condition": "Good", "album_artwork": "daydream_nation.jpg"},
    {"artist": "Pixies", "album_artist": "Pixies", "album": "Doolittle", "year": 1989, "genre": ["Alternative Rock"], "record_label": "4AD", "format": "LP", "condition": "Mint", "album_artwork": "doolittle.jpg"},
    {"artist": "The Smiths", "album_artist": "The Smiths", "album": "The Queen Is Dead", "year": 1986, "genre": ["Indie Rock"], "record_label": "Rough Trade", "format": "LP", "condition": "Very Good", "album_artwork": "queen_is_dead.jpg"},
    {"artist": "Cocteau Twins", "album_artist": "Cocteau Twins", "album": "Heaven or Las Vegas", "year": 1990, "genre": ["Dream Pop", "Ethereal Wave"], "record_label": "4AD", "format": "LP", "condition": "Near Mint", "album_artwork": "heaven_las_vegas.jpg"},
    {"artist": "My Bloody Valentine", "album_artist": "My Bloody Valentine", "album": "Loveless", "year": 1991, "genre": ["Shoegaze", "Noise Pop"], "record_label": "Creation", "format": "LP", "condition": "Mint Sealed", "album_artwork": "loveless.jpg"},
    {"artist": "Aphex Twin", "album_artist": "Aphex Twin", "album": "Selected Ambient Works 85-92", "year": 1992, "genre": ["Ambient", "Techno"], "record_label": "Apollo", "format": "LP", "condition": "Very Good", "album_artwork": "saw.jpg"},
    {"artist": "Boards of Canada", "album_artist": "Boards of Canada", "album": "Music Has the Right to Children", "year": 1998, "genre": ["Ambient", "IDM"], "record_label": "Warp", "format": "LP", "condition": "Mint", "album_artwork": "boc_mhra.jpg"},
    {"artist": "Gorillaz", "album_artist": "Gorillaz", "album": "Demon Days", "year": 2005, "genre": ["Alternative Rock", "Hip Hop"], "record_label": "Parlophone", "format": "LP", "condition": "Near Mint", "album_artwork": "demon_days.jpg"},
    {"artist": "Arctic Monkeys", "album_artist": "Arctic Monkeys", "album": "Whatever People Say I Am", "year": 2006, "genre": ["Indie Rock", "Post-Punk"], "record_label": "Domino", "format": "LP", "condition": "Mint", "album_artwork": "arctic_debut.jpg"},
]

def seed_database():
    db = SessionLocal()
    try:
        # Check if records already exist
        existing_count = db.query(VinylRecords).count()
        if existing_count > 0:
            print(f"Database already has {existing_count} records. Skipping seed.")
            return
        
        for record_data in records_data:
            record = VinylRecords(**record_data)
            db.add(record)
        
        db.commit()
        print(f"Successfully added {len(records_data)} records to the database!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
