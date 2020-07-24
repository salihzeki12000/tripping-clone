from . import db


class BedroomPrice(db.Model):
    __table__name = 'bedroom_price'
    id = db.Column(db.Integer, primary_key = True)
    bedroom = db.Column(db.Integer)
    guest = db.Column(db.Integer)
    price = db.Column(db.Integer)
   