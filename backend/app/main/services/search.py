from ..models import db
from ..models.AminitiesModel import Aminities
from ..models.PropertyModel import Property
from ..models.LocationModel import Location
from ..models.RoomDetailsModel import RoomDetails
import json
import datetime
from flask import jsonify 
import math

## function for pagination
def pagination(page, per_page, total):
    total_pages = math.ceil(total/per_page)
    prev_page_end = (page-1) * per_page
    cur_page_end = page * per_page

    return [prev_page_end,cur_page_end,total_pages]


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
        page = data("page",default=1,type=int)
        per_page = data("per_page", default=6,type=int)
        
        data = []
        
        query = '''SELECT * FROM property AS pp JOIN location AS ll ON pp.id=ll.property_id 
                JOIN room_details AS rr ON pp.id=rr.property_id 
                JOIN aminities AS aa ON pp.id=aa.property_id
                WHERE (ll.country="%s" OR ll.state="%s" OR ll.city="%s") '''%(location,location,location)
        # res = db.session.execute(query)
        # return jsonify({'result': [dict(row) for row in res]})

        if free_cancellation:
            free_cancellation = int(free_cancellation)
            query = query + ' AND pp.free_cancellation=%d'%(free_cancellation)
        
        if bedroom and guest:
            bedroom = int(bedroom)
            guest = int(guest)
            query = query + ' AND rr.total_room = %d AND rr.guest = %d '%(bedroom ,guest)
    
        if aminities:
            aminities = aminities.split(',')
            for i in aminities:
                query = query + ' AND aa.%s=true'%(i)
        
        if price:
            price = price.split(',')
            low,high = int(price[0]),int(price[1])

            query = query + ' AND rr.price >= %d AND rr.price <= %d'%(low,high)


        res = db.session.execute(query)

        for i in res:
            rating = db.session.execute('''SELECT AVG(rating) AS rating FROM review where property_id=%d'''%(int(i['property_id']))).first()
            
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
            obj['bedroom'] = i['total_room']
            obj['guest'] = i['guest']
            obj['price'] = i['price']
            obj['latitude'] = i['lati']
            obj['longitude'] = i['longi']
            if rating[0] is not None:
                rating = float(round(rating[0], 2))
                obj['rating'] = rating
            else:
                obj['rating'] = 0
            image = json.loads(i['image'])
            obj['image'] = image

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
            if i['pet_allowed']:
                obj['aminities']['pet_allowed'] = i['pet_allowed']
            if i['pool']:
                obj['aminities']['pool'] = i['pool']
            if i['tv']:
                obj['aminities']['tv'] = i['tv']
            data.append(obj)
    

        if rating:
            rating = float(rating)
            data = [d for d in data if d['rating'] >= rating]

        total = len(data)
        res = pagination(page,per_page,total)
        data = data[res[0]:res[1]]
        
        return json.dumps({'result': data, "total_pages":res[2],"curr_page":page})
    except KeyError as err:
                return json.dumps({'error': True, 'message': format(err)})
    except TypeError as err:
                return json.dumps({'error': True, 'message': format(err)})
    except NameError as err:
                return json.dumps({'error': True, 'message': format(err)})
    except Exception as err:
        return json.dumps({'error': True, 'message': format(err)})


            # total_booked_room = db.session.execute('''SELECT COUNT(*),SUM(booked_room) as booked,booking_date
            #     FROM booking WHERE booking_date BETWEEN CAST('%s' as date) 
            #     AND CAST('%s' as date) AND property_id = %d 
            #     AND room_type = '%s'
            #     GROUP BY booking_date,property_id;'''%(start, end, int(i[id])))


def send_all_location(location):
    try:
        query = '''SELECT pp.property_name,rr.price,ll.lati,ll.longi 
                    FROM property AS pp JOIN location AS ll ON pp.id=ll.property_id 
                    JOIN room_details AS rr ON pp.id=rr.property_id 
                    WHERE (ll.country="%s" OR ll.state="%s" OR ll.city="%s")'''%(location,location,location)
        res = db.session.execute(query)

        data = []
        for i in res:
            obj = {}
            obj['property_name'] = i['property_name']
            obj['price'] = i['price']
            obj['latitude'] = i['lati']
            obj['longitude'] = i['longi']
            data.append(obj)
        return json.dumps({'result':data})
    except Exception as err:
        return json.dumps({'error': True, 'message': format(err)})
        