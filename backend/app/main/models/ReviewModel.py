from . import db
from .HotelsModel import Hotels
from .UsersModel import Users

class Review(db.Model):
    __table__name = 'review'
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(Users.id))
    hotel_id = db.Column(db.Integer, db.ForeignKey(Hotels.id))
    rating = db.Column(db.Integer)
    review = db.Column(db.String(500))