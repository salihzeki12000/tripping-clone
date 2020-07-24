from . import db


class RoomDetails(db.Model):
    __table__name = 'room_details'
    id = db.Column(db.Integer, primary_key = True)
    area = db.Column(db.String(100))
    rating = db.Column(db.Float)
    room_type = db.Column(db.String(100))
   