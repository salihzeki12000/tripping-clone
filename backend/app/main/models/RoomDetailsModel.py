from . import db
from .HotelsModel import Hotels

class RoomDetails(db.Model):
    __table__name = 'room_details'
    id = db.Column(db.Integer, primary_key = True)
    hotel_id = db.Column(db.Integer, db.ForeignKey(Hotels.id))
    area = db.Column(db.String(100), nullable=False)
    room_type = db.Column(db.String(100))
    bedroom = db.Column(db.Integer)
    total_room = db.Column(db.Integer)
    bathroom = db.Column(db.Integer)
    price = db.Column(db.Integer)
    guest = db.Column(db.Integer)
   