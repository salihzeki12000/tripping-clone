from ..models import db
from ..models.AminitiesModel import Aminities
from ..models.HotelsModel import Hotels
from ..models.LocationModel import Location
from ..models.RoomDetailsModel import RoomDetails
import json
import datetime
from flask import jsonify 


def search_uisng_filter(data):
    try:
        location = data('location')
        free_cancellation = data('free_cancellation')
        sort = data('sort') 
        rating = data('rating')
        price = data('price')
        bedroom = data('bedroom')
        guest = data('guest')
        aminities = data('aminities')

        data = []
        
        query = '''SELECT * FROM hotels AS hh JOIN location AS ll ON hh.id=ll.hotel_id 
                JOIN room_details AS rr ON hh.id=rr.hotel_id 
                JOIN aminities AS aa ON hh.id=aa.hotel_id
                WHERE (ll.country="%s" OR ll.state="%s" OR ll.city="%s") '''%(location,location,location)
    
        # return jsonify({'result': [dict(row) for row in res]})

        if free_cancellation:
            free_cancellation = int(free_cancellation)

            query = query + 'AND hh.free_cancellation=%d'%(free_cancellation)
        
        
        if bedroom or guest:
            bedroom = int(bedroom)
            guest = int(guest)
            query = query + ' AND (rr.bedroom BETWEEN %d AND %d) OR (rr.guest BETWEEN %d AND %d) '%(bedroom-1,bedroom+1,guest-1,guest+1)
        else:
            query = query + ' AND (rr.bedroom) <= %d AND (rr.guest) <=%d'%(2,2)

        if aminities:
            aminities = aminities.split(',')

            query = query + 'AND aa.%s=1'%(aminities[0])
            
            for i in range(1,len(aminities)-1):
                query = query + ' AND aa.%s=1'%(aminities[i])
            

        if price:
            price = price.split(',')
            low,high = int(price[0]),int(price[1])
        
            data = [d for d in data if d['price'] >= low and d['price'] <= high]
        
        
        res = db.session.execute(query)
        res1 = db.session.execute('''SELECT DISTINCT(hh.id),AVG(review.rating) AS rating 
                                FROM hotels AS hh JOIN review ON hh.id=review.hotel_id GROUP BY(hh.id)''')


        for i,j in zip(res,res1):
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
            rate = j['rating']
            obj['rating'] = float(round(rate,2))
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
                
            # obj['sort'] = i['room_type']
            image = json.loads(i['image'])
            obj['image'] = image
            data.append(obj)


        if rating:
            rating = float(rating)
            data = [d for d in data if d['rating'] > rating]

        return jsonify({'result': [dict(row) for row in data]})
    except Exception as err:
        return json.dumps({'error': True, 'error_name': format(err)})