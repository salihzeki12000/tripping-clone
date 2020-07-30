    from ..models import db
from ..models.AminitiesModel import Aminities
from ..models.PropertyModel import Property
from ..models.LocationModel import Location
from ..models.RoomDetailsModel import RoomDetails
import json
import datetime
from flask import jsonify 


def search_uisng_filter(data):
    try:
        location = data('location')
        check_in = data('check_in')
        check_out = data('check_out')
        free_cancellation = data('free_cancellation')
        sort = data('sort') 
        rating = data('rating')
        price = data('price')
        bedroom = data('bedroom')
        guest = data('guest')
        aminities = data('aminities')

        data = []
        
        query = '''SELECT * FROM property AS hh JOIN location AS ll ON hh.id=ll.property_id 
                JOIN room_details AS rr ON hh.id=rr.property_id 
                JOIN aminities AS aa ON hh.id=aa.property_id
                WHERE (ll.country="%s" OR ll.state="%s" OR ll.city="%s") '''%(location,location,location)

        # res = db.session.execute(query)
        # return jsonify({'result': [dict(row) for row in res]})

        if free_cancellation:
            free_cancellation = int(free_cancellation)
            query = query + 'AND hh.free_cancellation=%d'%(free_cancellation)
        
        
        if bedroom or guest:
            bedroom = int(bedroom)
            guest = int(guest)
            query = query + ' AND rr.bedroom = %d AND rr.guest = %d '%(bedroom ,guest)
        else:
            query = query + ' AND rr.bedroom <= %d AND rr.guest <=%d'%(1,2)

        if aminities:
            aminities = aminities.split(',')

            query = query + ' AND aa.%s=1'%(aminities[0])
            
            for i in range(1,len(aminities)-1):
                query = query + ' AND aa.%s=1'%(aminities[i])
            
        if price:
            price = price.split(',')
            low,high = int(price[0]),int(price[1])

            query = query + ' AND rr.price >= %d AND rr.price <= %d'%(low,high)


        res = db.session.execute(query)
        # return jsonify({'result': [dict(row) for row in res]})

        for i in res:
            rating = db.session.execute('''SELECT AVG(rating) AS rating FROM review where property_id=%d'''%(int(i['id'])))
            rating = float(round(rating.first()[0], 2))

            obj={}
            obj['country'] = i['country']
            obj['state'] = i['state']
            obj['city'] = i['city']
            obj['locality'] = i['locality']
            obj['property_name'] = i['property_name']
            obj['property_id'] = i['id']
            obj['accomodation_type'] = i['accomodation_type']
            obj['area'] = i['area']
            obj['free_cancellation'] = i['free_cancellation']
            obj['bedroom'] = i['bedroom']
            obj['guest'] = i['guest']
            obj['price'] = i['price']
            obj['room_type'] = i['room_type']
            obj['rating'] = rating
            image = json.loads(i['image'])
            obj['image'] = image

            # aminities = {}
            # obj['aminities']['air_conditioning'] = i['air_conditioning']
            # obj['aminities']['internet'] = i['internet']
            # obj['aminities']['kitchen'] = i['kitchen']
            # obj['aminities']['parking'] = i['parking']
            # obj['aminities']['smoking'] = i['smoking']
            # obj['aminities']['no_smoking'] = i['no_smoking']
            # obj['aminities']['pet_allowed'] = i['pet_allowed']
            # obj['aminities']['pool'] = i['pool']
            # obj['aminities']['tv'] = i['tv']

            data.append(obj)
            
            # total_booked_room = db.session.execute('''SELECT COUNT(*),SUM(booked_room) as booked,booking_date
            #     FROM booking WHERE booking_date BETWEEN CAST('%s' as date) 
            #     AND CAST('%s' as date) AND property_id = %d 
            #     AND room_type = '%s'
            #     GROUP BY booking_date,property_id;'''%(start, end, int(i[id])))

        if rating:
            rating = float(rating)
            data = [d for d in data if d['rating'] >= rating]

        return jsonify({'result': [dict(row) for row in data]})
    except Exception as err:
        return json.dumps({'error': True, 'error_name': format(err)})