from . import db
from .PropertyModel import Property

class RoomDetails(db.Model):
    __table__name = 'room_details'
    id = db.Column(db.Integer, primary_key = True)
    property_id = db.Column(db.Integer, db.ForeignKey(Property.id))
    area = db.Column(db.String(100), nullable=False)
    total_room = db.Column(db.Integer)
    bathroom = db.Column(db.Integer)
    price = db.Column(db.Integer)
    guest = db.Column(db.Integer)
   