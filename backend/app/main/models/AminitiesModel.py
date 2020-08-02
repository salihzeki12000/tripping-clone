from . import db
from .PropertyModel import Property


class Aminities(db.Model):
    __table__name = 'aminities'
    id = db.Column(db.Integer, primary_key=True)

    property_id = db.Column(
        db.Integer, db.ForeignKey(Property.id), unique=True
        )

    pool = db.Column(db.Boolean)
    internet = db.Column(db.Boolean)
    tv = db.Column(db.Boolean)
    parking = db.Column(db.Boolean)
    air_conditioning = db.Column(db.Boolean)
    kitchen = db.Column(db.Boolean)
    pet_allowed = db.Column(db.Boolean)
    smoking = db.Column(db.Boolean)
