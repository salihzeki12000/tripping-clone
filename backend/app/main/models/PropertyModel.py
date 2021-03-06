from . import db
import datetime


class Property(db.Model):
    __table__name = 'property'
    id = db.Column(db.Integer, primary_key=True)
    property_name = db.Column(db.String(255))
    image = db.Column(db.JSON)
    description = db.Column(db.String(500))
    accomodation_type = db.Column(db.String(100))
    free_cancellation = db.Column(db.Boolean, default=False, nullable=False)
    deleted = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())
