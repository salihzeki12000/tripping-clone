from . import db
from .RoomDetailsModel import RoomDetails

class Aminities(db.Model):
    __table__name = 'aminities'
    id = db.Column(db.Integer, primary_key = True)
    room_id = db.Column(db.Integer, db.ForeignKey(RoomDetails.id), unique=True)
    pool = db.Column(db.Boolean)
    internet = db.Column(db.Boolean)
    tv = db.Column(db.Boolean)
    parking = db.Column(db.Boolean)
    air_conditioning = db.Column(db.Boolean)
    kitchen = db.Column(db.Boolean)
    pet_allowed = db.Column(db.Boolean)
    smoking = db.Column(db.Boolean)
    no_smoking = db.Column(db.Boolean)
