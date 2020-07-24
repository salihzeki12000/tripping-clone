from . import db
from .UsersModel import Users

class UserOAuth(db.Model):
    __table__name = 'user_OAuth'
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey(Users.id))
    provider = db.Column(db.String(100))
    provider_id = db.Column(db.String(100))
    access_token = db.Column(db.String(256))
    image_url = db.Column(db.String(256))
    expired_in = db.Column(db.String(100))
        