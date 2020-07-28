from ..models import db
from ..models.AminitiesModel import Aminities
from ..models.HotelsModel import Hotels
from ..models.LocationModel import Location
from ..models.RoomDetailsModel import RoomDetails
import json
import datetime
from flask import jsonify 


def get_image_data(hotel_id):
    try:
        hotel_id = int(hotel_id)
        data = []
        
        query = '''select image from hotels where id=%d '''%(hotel_id)
        res = db.session.execute(query)
        
        for i in res:
            image = json.loads(i.image)

        return jsonify({'result': image})  
    except Exception as err:
        return json.dumps({'error': True, 'error_name': format(err)})


def get_basic_data(hotel_id,room_type):
    try:
        hotel_id = int(hotel_id)
        query = '''SELECT * FROM hotels AS hh JOIN location AS ll ON hh.id=ll.hotel_id 
                JOIN room_details AS rr ON hh.id=rr.hotel_id 
                JOIN aminities AS aa ON hh.id=aa.hotel_id
                WHERE hh.id = %d'''%(hotel_id)
        
        res = db.session.execute(query)
        res1 = db.session.execute('''SELECT AVG(review.rating) AS rating 
                                FROM hotels AS hh JOIN review ON hh.id=review.hotel_id WHERE hh.id=%d'''%(hotel_id))
        
        data = []
        for i,j in zip(res,res1):
            obj={}
            obj['country'] = i['country']
            obj['state'] = i['state']
            obj['city'] = i['city']
            obj['locality'] = i['locality']
            obj['hotel_name'] = i['hotel_name']
            obj['hotel_id'] = i['hotel_id']
            obj['description'] = i['description']
            obj['accomodation_type'] = i['accomodation_type']
            obj['area'] = i['area']
            obj['free_cancellation'] = i['free_cancellation']
            obj['bedroom'] = i['bedroom']
            obj['guest'] = i['guest']
            obj['price'] = i['price']
            rate = j['rating']
            obj['rating'] = float(round(rate,2))
            obj['room_type'] = i['room_type']
            obj['aminities'] = {}

            obj['aminities']['air_conditioning'] = i['air_conditioning']
            obj['aminities']['internet'] = i['internet']
            obj['aminities']['kitchen'] = i['kitchen']
            obj['aminities']['parking'] = i['parking']
            obj['aminities']['smoking'] = i['smoking']
            obj['aminities']['no_smoking'] = i['no_smoking']
            obj['aminities']['pet_allowed'] = i['pet_allowed']
            obj['aminities']['pool'] = i['pool']
            obj['aminities']['tv'] = i['tv']
        
            image = json.loads(i['image'])
            obj['image'] = image
            data.append(obj)
        return jsonify({'result': [dict(row) for row in data]})
    except Exception as err:
        return json.dumps({'error': True, 'error_name': format(err)})


def get_review_data(hotel_id):
    try:
        hotel_id = int(hotel_id)
        
        reviews = db.session.execute('''SELECT rr.review,rr.rating FROM hotels AS hh 
                                JOIN review AS rr ON hh.id=rr.hotel_id WHERE hh.id=%d'''%(hotel_id))
        
        return jsonify({'result': [dict(row) for row in reviews]}) 
    except Exception as err:
        return json.dumps({'error': True, 'error_name': format(err)})


def get_recommendation_data(hotel_id,room_type):
    try:
        hotel_id = int(hotel_id)
        
        query = '''SELECT rr.price,ll.state,rr.room_type
                FROM hotels AS hh JOIN location AS ll ON hh.id=ll.hotel_id 
                JOIN room_details AS rr ON hh.id=rr.hotel_id
                WHERE hh.id = %d and room_type="%s"'''%(hotel_id,room_type)
        res = db.session.execute(query)

        state, price = "",0
        for i in res:
            state = i.state
            price = i.price
        
        query1 = '''SELECT hh.id,hh.image,hh.hotel_name,rr.room_type,rr.bedroom,rr.price
                FROM hotels AS hh JOIN location AS ll ON hh.id=ll.hotel_id 
                JOIN room_details AS rr ON hh.id=rr.hotel_id
                WHERE rr.price < %d  OR ll.state = "%s"'''%(price,state)
        res1 = db.session.execute(query1)

        data = []
        for i in res1:
            obj={}
            obj['hotel_name'] = i['hotel_name']
            obj['hotel_id'] = i['id']
            obj['bedroom'] = i['bedroom']
            obj['price'] = i['price']
            obj['room_type'] = i['room_type']
            image = json.loads(i['image'])
            obj['image'] = image
            data.append(obj)
        return  jsonify({'result': [dict(row) for row in data]})

    except Exception as err:
        return json.dumps({'error': True, 'error_name': format(err)})
