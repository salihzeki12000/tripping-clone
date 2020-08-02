from . import db
from .PropertyModel import Property


class Location(db.Model):
    __table__name = 'location'
    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(
        db.Integer, db.ForeignKey(Property.id), unique=True
        )
    country = db.Column(db.String(100))
    state = db.Column(db.String(100))
    city = db.Column(db.String(100))
    locality = db.Column(db.String(255))
    longi = db.Column(db.Float(precision='10,6'))
    lati = db.Column(db.Float(precision='10,6'))
