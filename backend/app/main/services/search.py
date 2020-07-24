from ..models import db
from ..models.AminitiesModel import Aminities
from ..models.BedroomPriceModel import BedroomPrice
from ..models.HotelsModel import Hotels
from ..models.LocationModel import Location
from ..models.RoomDetailsBedroomPriceRelation import RoomDetailsBedroomPrice
from ..models.RoomDetailsModel import RoomDetails
import json
import datetime
from flask import jsonify 


def search_uisng_filter(data):
    state = data('state')
    country = data('country')
    free_cancellation = data('free_cancellation')
    sort = data('sort') 
    rating = data('rating')
    min_price = data('min_price')
    max_price = data('max_price')
    bedroom = data('bedroom')
    guest = data('guest')

    if free_cancellation == None or rating == None or min_price == None or max_price == None or bedroom == None or guest == None:
        free_cancellation = 1
        rating = 4
        min_price = 500
        max_price = 10000000
        bedroom = 2
        guest = 2

    res = db.session.execute('''SELECT * FROM hotels JOIN location ON hotels.location=location.id JOIN room_details ON hotels.hotel_details=room_details.id JOIN room_details_bedroom_price AS aa ON aa.room_details_id=room_details.id JOIN bedroom_price ON aa.bedroom_price_id=bedroom_price.id WHERE free_cancellation=%d AND country="%s" AND state="%s" OR price >=%d AND price <=%d AND room_type="%s" AND rating=%d  AND bedroom=%d OR guest=%d ;'''%(free_cancellation,country,state,min_price,max_price,sort,rating,bedroom,guest))
    
    return jsonify({'result': [dict(row) for row in res]})
    # data = []
    # for i in res:
    #     obj = {}
    #     obj['hotel_name'] = i['hotel_name']
    #     data.append(obj)

    # return json.dumps(res)
