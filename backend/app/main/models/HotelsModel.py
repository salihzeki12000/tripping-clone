from . import db
from .RoomDetailsModel import RoomDetails
import datetime


class Hotels(db.Model):
    __table__name = 'hotels'
    id = db.Column(db.Integer, primary_key = True)
    hotel_name = db.Column(db.String(255))
    room_details = db.Column(db.Integer, db.ForeignKey(RoomDetails.id), unique=True)
    image = db.Column(db.JSON)
    accomodation_type = db.Column(db.String(100))
    free_cancellation = db.Column(db.Boolean, default=False, nullable=False)
    deleted = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
   