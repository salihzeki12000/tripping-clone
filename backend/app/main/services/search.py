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
    country = data('country')
    state = data('state')
    city = data('city')
    free_cancellation = data('free_cancellation')
    sort = data('sort') 
    rating = data('rating')
    price = data('price')
    bedroom = data('bedroom')
    guest = data('guest')
    aminities = data('aminities')


    data = []
    if country or state or city:
        if country and state and city:
            res = db.session.execute('''SELECT * FROM hotels AS hh JOIN location AS ll ON hh.id=ll.hotel_id JOIN room_details AS rr ON hh.room_details=rr.id JOIN room_details_bedroom_price AS dd ON rr.id=dd.room_details_id JOIN bedroom_price AS bb ON dd.bedroom_price_id=bb.id JOIN aminities AS aa On rr.id=aa.room_id WHERE country="%s" AND state="%s" AND city="%s";'''%(country,state,city))
        elif country and state:
            res = db.session.execute('''SELECT * FROM hotels AS hh JOIN location AS ll ON hh.id=ll.hotel_id JOIN room_details AS rr ON hh.room_details=rr.id JOIN room_details_bedroom_price AS dd ON rr.id=dd.room_details_id JOIN bedroom_price AS bb ON dd.bedroom_price_id=bb.id JOIN aminities AS aa On rr.id=aa.room_id WHERE country="%s" AND state="%s";'''%(country,state))
        elif country and city:
            res = db.session.execute('''SELECT * FROM hotels AS hh JOIN location AS ll ON hh.id=ll.hotel_id JOIN room_details AS rr ON hh.room_details=rr.id JOIN room_details_bedroom_price AS dd ON rr.id=dd.room_details_id JOIN bedroom_price AS bb ON dd.bedroom_price_id=bb.id JOIN aminities AS aa On rr.id=aa.room_id WHERE country="%s" AND city="%s";'''%(country,city))
        elif country:
            res = db.session.execute('''SELECT * FROM hotels AS hh JOIN location AS ll ON hh.id=ll.hotel_id JOIN room_details AS rr ON hh.room_details=rr.id JOIN room_details_bedroom_price AS dd ON rr.id=dd.room_details_id JOIN bedroom_price AS bb ON dd.bedroom_price_id=bb.id JOIN aminities AS aa On rr.id=aa.room_id WHERE country="%s";'''%(country))
        elif state:
            res = db.session.execute('''SELECT * FROM hotels AS hh JOIN location AS ll ON hh.id=ll.hotel_id JOIN room_details AS rr ON hh.room_details=rr.id JOIN room_details_bedroom_price AS dd ON rr.id=dd.room_details_id JOIN bedroom_price AS bb ON dd.bedroom_price_id=bb.id JOIN aminities AS aa On rr.id=aa.room_id WHERE state="%s";'''%(state))
        elif city:
            res = db.session.execute('''SELECT * FROM hotels AS hh JOIN location AS ll ON hh.id=ll.hotel_id JOIN room_details AS rr ON hh.room_details=rr.id JOIN room_details_bedroom_price AS dd ON rr.id=dd.room_details_id JOIN bedroom_price AS bb ON dd.bedroom_price_id=bb.id JOIN aminities AS aa On rr.id=aa.room_id WHERE country="%s";'''%(city))

        for i in res:
            obj={}
            obj['country'] = i['country']
            obj['state'] = i['state']
            obj['city'] = i['city']
            obj['locality'] = i['locality']
            obj['hotel_name'] = i['hotel_name']
            obj['hotel_id'] = i['hotel_id']
            obj['accomodation_type'] = i['accomodation_type']
            obj['area'] = i['area']
            obj['free_cancellation'] = i['free_cancellation']
            obj['bedroom'] = i['bedroom']
            obj['guest'] = i['guest']
            obj['price'] = i['price']
            obj['rating'] = i['rating']
            obj['aminities'] = {}

            if i['air_conditioning']:
                obj['aminities']['air_conditioning'] = i['air_conditioning']
            if i['internet']:
                obj['aminities']['internet'] = i['internet']
            if i['kitchen']:
                obj['aminities']['kitchen'] = i['kitchen']
            if i['parking']:
                obj['aminities']['parking'] = i['parking']
            if i['smoking']:
                obj['aminities']['smoking'] = i['smoking']
            if i['no_smoking']:
                obj['aminities']['no_smoking'] = i['no_smoking']
            if i['pet_allowed']:
                obj['aminities']['pet_allowed'] = i['pet_allowed']
            if i['pool']:
               obj['aminities']['pool'] = i['pool']
            if i['tv']:
                obj['aminities']['tv'] = i['tv']
                
            obj['sort'] = i['room_type']
            obj['image'] = i['image']
            data.append(obj)

    if free_cancellation:
        free_cancellation = int(free_cancellation)
        data = [d for d in data if d['free_cancellation'] == free_cancellation]

    if rating:
        rating = float(rating)
        data = [d for d in data if d['rating'] >= rating]

    if bedroom or guest:
        if bedroom and guest:
            bedroom = int(bedroom)
            guest = int(guest)
            data = [d for d in data if d['bedroom'] == bedroom and d['guest'] == guest]
        elif bedroom:
            bedroom = int(bedroom)
            data = [d for d in data if d['bedroom'] == bedroom]
        elif guest:
            guest = int(guest)
            data = [d for d in data if d['guest'] == guest]

    if sort:
        data = [d for d in data if d['sort'] == sort]

    if price:
        price = price.split(',')
        low,high = int(price[0]),int(price[1])
    
        data = [d for d in data if d['price'] >= low and d['price'] <= high]


    
    if aminities:
        aminities = aminities.split(',')

        for i in aminities:
            data = [d for d in data if d['aminities'][i] == 1]

    return jsonify({'result': [dict(row) for row in data]})

    # return json.dumps(data)
    # def filter_data(variable): 
    #     if variable['free_cancellation'] == 1:
    #         return True
    #     else: 
    #         return False
    # data = filter(filter_data,data)
    # return json.dumps(data)