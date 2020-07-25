from . import db
from .HotelsModel import Hotels


class Location(db.Model):
    __table__name = 'location'
    id = db.Column(db.Integer, primary_key = True)
    hotel_id = db.Column(db.Integer, db.ForeignKey(Hotels.id), unique=True)
    country = db.Column(db.String(100))
    state = db.Column(db.String(100))
    city = db.Column(db.String(100))
    locality = db.Column(db.String(255))