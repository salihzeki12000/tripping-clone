from ..models import db
import json
import datetime
from flask import jsonify


def get_basic_data(property_id):
    try:
        property_id = int(property_id)
        query = '''SELECT * FROM property AS pp
                 JOIN location AS ll ON pp.id=ll.property_id
                 JOIN room_details AS rr ON pp.id=rr.property_id
                 JOIN aminities AS aa ON pp.id=aa.property_id
                 WHERE pp.id = %d''' % (property_id)

        res = db.session.execute(query)
        rating = db.session.execute(
            '''SELECT AVG(rating) AS rating
                 FROM review where property_id = %d''' % (property_id)).first()

        data = []
        for i in res:
            obj = {}
            obj['country'] = i['country']
            obj['state'] = i['state']
            obj['city'] = i['city']
            obj['locality'] = i['locality']
            obj['property_name'] = i['property_name']
            obj['property_id'] = i['property_id']
            obj['description'] = i['description']
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
            obj['aminities']['air_conditioning'] = i['air_conditioning']
            obj['aminities']['internet'] = i['internet']
            obj['aminities']['kitchen'] = i['kitchen']
            obj['aminities']['parking'] = i['parking']
            obj['aminities']['smoking'] = i['smoking']
            obj['aminities']['pet_allowed'] = i['pet_allowed']
            obj['aminities']['pool'] = i['pool']
            obj['aminities']['tv'] = i['tv']

            data.append(obj)
        return json.dumps({'result': data})
    except Exception as err:
        return json.dumps({'error': True, 'message': format(err)})


def get_review_data(property_id):
    try:
        property_id = int(property_id)

        reviews = db.session.execute(
            '''SELECT rating,review,reviewed_at,first_name
                 FROM review JOIN users ON review.user_id=users.id
                 WHERE review.property_id = %d''' % (property_id))
        return jsonify({'result': [dict(row) for row in reviews]})

    except Exception as err:
        return json.dumps({'error': True, 'message': format(err)})


def get_recommendation_data(property_id):
    try:
        property_id = int(property_id)

        query = '''SELECT ll.city,rr.price,rr.guest
         FROM property AS pp JOIN location AS ll ON pp.id=ll.property_id
         JOIN room_details AS rr ON pp.id=rr.property_id
         JOIN aminities AS aa ON pp.id=aa.property_id
         WHERE pp.id = %d''' % (property_id)

        res = db.session.execute(query).first()

        city, price, guest = res[0], res[1], res[2]

        query1 = '''SELECT pp.property_name, pp.id, rr.total_room,
                 rr.price, pp.image,ll.city
                 FROM property AS pp
                 JOIN location AS ll ON pp.id = ll.property_id
                 JOIN room_details AS rr ON pp.id = rr.property_id
                 WHERE rr.price < %d AND guest = %d
                 AND ll.city = "%s"''' % (price, guest, city)
        res1 = db.session.execute(query1)

        data = []
        for i in res1:
            obj = {}
            obj['property_name'] = i['property_name']
            obj['property_id'] = i['id']
            obj['total_room'] = i['total_room']
            obj['price'] = i['price']
            obj['city'] = i['city']
            image = json.loads(i['image'])
            obj['image'] = image
            data.append(obj)
        return json.dumps({'result': data})
    except Exception as err:
        return json.dumps({'error': True, 'message': format(err)})


def check_available_dates(data):
    try:
        property_id = data('property_id')
        check_in = data('check_in')
        check_out = data('check_out')

        query1 = '''SELECT guest from room_details
         WHERE property_id = %d''' % (int(property_id))
        rooms = db.session.execute(query1).first()

        if check_in and check_out:
            start = datetime.datetime.strptime(check_in, "%Y-%m-%d")
            end = datetime.datetime.strptime(check_out, "%Y-%m-%d")
            date_diff = (end-start).days

            if date_diff > 31:
                return json.dumps({
                    'error': True,
                    'message': 'Sorry ,we are only accepting \
                    booking for one month only'})
            elif date_diff > 0:
                query = '''SELECT booking_date FROM booking
                         WHERE booking_date BETWEEN CAST('%s' as date)
                         AND CAST('%s' as date) AND property_id = %d
                         GROUP BY booking_date,property_id;''' % (
                            check_in, check_out, int(property_id))

                booking_date = db.session.execute(query).fetchall()

                block_dates = []
                for i in booking_date:
                    block_dates.append(i[0].strftime('%d-%m-%Y'))

                if len(block_dates) > 0:
                    return json.dumps({
                        'error': True,
                        "block_dates": block_dates,
                        'guest': rooms[0],
                        'message': 'property is not available \
                        for choosen dates'})
                else:
                    return json.dumps({
                        'error': False, 'message': 'property is available'})
        # return jsonify({'result': [dict(row) for row in booking_date]})
            else:
                return json.dumps({
                    'error': True, 'message': 'Please select valid date'})
        else:
            curr_date = datetime.date.today().strftime("%Y-%m-%d")
            last_date = datetime.date.today() + datetime.timedelta(days=31)
            last_date = last_date.strftime("%Y-%m-%d")

            query = '''SELECT booking_date FROM booking
                         WHERE booking_date BETWEEN CAST('%s' as date)
                         AND CAST('%s' as date) AND property_id = %d
                         GROUP BY booking_date,property_id;''' % (
                            curr_date, last_date, int(property_id))
            booking_date = db.session.execute(query).fetchall()

            block_dates = []
            for i in booking_date:
                block_dates.append(i[0].strftime('%d-%m-%Y'))

            if len(block_dates) > 0:
                return json.dumps({
                    'error': True, "block_dates": block_dates,
                    'guest': rooms[0],
                    'message': 'property is not available for choosen dates'})
            else:
                return json.dumps({
                    'error': False, 'message': 'property is available'})

            # return jsonify({'result': [dict(row) for row in booking_date]})
            return 'res'
    except Exception as err:
        return json.dumps({'error': True, 'message': format(err)})
