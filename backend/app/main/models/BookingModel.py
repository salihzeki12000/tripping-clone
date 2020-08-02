from . import db
from .PropertyModel import Property
from .UsersModel import Users
import datetime


class Booking(db.Model):
    __table__name = 'booking'
    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.Integer, db.ForeignKey(Property.id))
    booked_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    total_guest = db.Column(db.Integer)
    booking_date = db.Column(db.DateTime)
    amount_paid = db.Column(db.Integer)
    order_id = db.Column(db.String(255))
    payment_id = db.Column(db.String(255))
    is_cancelled = db.Column(db.Boolean)
