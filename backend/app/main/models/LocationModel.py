from . import db
import datetime


class Location(db.Model):
    __table__name = 'location'
    id = db.Column(db.Integer, primary_key = True)
    country = db.Column(db.String(100))
    state = db.Column(db.String(100))
    district = db.Column(db.String(100))
    locality = db.Column(db.String(255))