from . import db

class RoomDetailsBedroomPrice(db.Model):
    __table__name = 'room_details_bedroom_price'
    id = db.Column(db.Integer, primary_key = True)
    room_details_id = db.Column(db.Integer, db.ForeignKey(RoomDetails.id))
    bedroom_price_id = db.Column(db.Integer, db.ForeignKey(BedroomPrice.id))