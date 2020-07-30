from ..models import db
from ..models.BookingModel import Booking
import json
import datetime
from flask import jsonify 
import razorpay
import hmac
import hashlib
import random
from twilio.rest import Client
from threading import Timer
import time


otp = random.randint(1000,9999)
# change the otp after some time using therading
def change_otp(*args):
    global otp
    otp = random.randint(1000,9999)
    return otp

r = Timer(60.0,change_otp)


# create otp message
def get_mobile_otp(no):
    r.start()

    account_sid = "ACca1b6a88ec9fe84c5fafb1c7476d3453"
    auth_token = "460a0d10053eaa2c4ba870dc187e4243"

    client = Client(account_sid, auth_token)

    client.messages.create(
        body="Your Tripping verification code is: %s"%(str(otp)),
        from_="+13016059121",
        to="+"+"%s"%(no)
    )

    return 'otp sent'


# verify otp 
def varify_mobile_otp(no):
    global otp

    if otp == int(no):
        return 'verified'
    else:
        return 'you have entered wrong otp'

# sending booking msg 
def send_booking_msg(data,property_name):
    order_id = data['razorpay_order_id']
    amount = int(data['amount'])
    guest = int(data['guest'])
    check_in = datetime.datetime.strptime(data['booking_date'][0], "%Y-%m-%d")
    check_out = datetime.datetime.strptime(data['booking_date'][1], "%Y-%m-%d")
    
    account_sid = "ACca1b6a88ec9fe84c5fafb1c7476d3453"
    auth_token = "460a0d10053eaa2c4ba870dc187e4243"

    client = Client(account_sid, auth_token)

    client.messages.create(
        body="Your Tripping.com booking is confirmed: \
            order id =%s, amount paid = %d, guest=%d, \
            check_in = %s , check_out=%s"%(order_id, amount,guest,check_in,check_out ),
        from_="+13016059121",
        to="+919545847906"
    )
    return 'message sent'



# razorpay validateion functions
# generate the order id
def order_id(booking_data):
    client = razorpay.Client(auth=("rzp_test_deyJ8kZP9d4HEh", "wzbh6WZvPXOY2MUsjD4uaZ8T"))
    
    res = client.order.create(data=booking_data)

    return json.dumps(res)

# validate the signature
def varification(validate_data):
    secret = 'wzbh6WZvPXOY2MUsjD4uaZ8T'
    secret_key = bytes(secret, 'utf-8')
    msg = bytes(validate_data['razorpay_order_id'] + "|" + validate_data['razorpay_payment_id'], 'utf-8')
    dig = hmac.new(key=secret_key,msg=msg,digestmod=hashlib.sha256)
    generated_signature = dig.hexdigest()

    start = datetime.datetime.strptime(validate_data['booking_date'][0], "%Y-%m-%d")
    end = datetime.datetime.strptime(validate_data['booking_date'][1], "%Y-%m-%d")
    date_diff =  (end-start).days
    booking_date = datetime.datetime.strptime(validate_data['booking_date'][0], "%Y-%m-%d")

    if generated_signature == validate_data['razorpay_signature']:
        for i in range(int(date_diff)):
            book = Booking(
                property_id=validate_data['property_id'],
                total_guest=validate_data['guest'],
                booking_date=booking_date + datetime.timedelta(days=i),
                amount_paid=validate_data['amount'],
                order_id=validate_data['razorpay_order_id'],
                payment_id=validate_data['razorpay_payment_id'],
                is_cancelled=0
            )

            db.session.add(book)
            db.session.commit()
        
        property_name = db.session.execute('''SELECT property_name 
                    FROM property WHERE id=%d'''%(int(validate_data['property_id']))).first()
        time.sleep(1)
        send_booking_msg(validate_data, property_name)

        return{
            "status":"success",
            "message":"payment successfull"
        }
    else:
        return {
            "status":"failiure",
            "message":"payment unsuccessfull"
        }