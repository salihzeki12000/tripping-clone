from . import db


class Users(db.Model):
    __table__name = 'users'
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    
