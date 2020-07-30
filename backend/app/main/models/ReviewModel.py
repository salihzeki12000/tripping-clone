from . import db
from .PropertyModel import Property
from .UsersModel import Users

class Review(db.Model):
    __table__name = 'review'
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(Users.id))
    property_id = db.Column(db.Integer, db.ForeignKey(Property.id))
    rating = db.Column(db.Integer)
    review = db.Column(db.String(500))
    reviewed_at = db.Column(db.DateTime)