from . import db
from .HotelsModel import Hotels
from .UsersModel import Users

class Booking(db.Model):
    __table__name = 'booking'
    id = db.Column(db.Integer, primary_key = True)
    hotel_id = db.Column(db.String(255))
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    booked_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    booked_room = db.Column(db.Integer)
    amount_paid = db.Column(db.Integer)
    is_cancelled = db.Column(db.Boolean)
   