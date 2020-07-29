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


def order_id(booking_data):
    client = razorpay.Client(auth=("rzp_test_sG3R7ERqPCjPFP", "m2wOH1ArN9WIuwu65PmkJCpX"))
    
    res = client.order.create(data=booking_data)

    return json.dumps(res)


def varification(validate_data):
    secret = 'm2wOH1ArN9WIuwu65PmkJCpX'
    secret_key = bytes(secret, 'utf-8')
    msg = bytes(validate_data['razorpay_order_id'] + "|" + validate_data['razorpay_payment_id'], 'utf-8')
    dig = hmac.new(key=secret_key,msg=msg,digestmod=hashlib.sha256)
    generated_signature = dig.hexdigest()
    if generated_signature == validate_data['razorpay_signature']:
        return{
            "status":"success",
            "message":"payment successfull"
        }
    else:
        return {
            "status":"failiure",
            "message":"payment unsuccessfull"
        }



otp = random.randint(1000,9999)

def change_otp(*args):
    global otp
    otp = random.randint(1000,9999)
    return otp

r = Timer(60.0,change_otp)

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

def varify_mobile_otp(no):
    global otp

    if otp == int(no):
        return 'verified'
    else:
        return 'you have entered wrong otp'


def send_booking_msg(data):
    order_id = data['order_id']
    amount = data['amount']
    
    account_sid = "ACca1b6a88ec9fe84c5fafb1c7476d3453"
    auth_token = "460a0d10053eaa2c4ba870dc187e4243"

    client = Client(account_sid, auth_token)

    client.messages.create(
        body="Your Tripping.com booking is confirmed: order_id =%s, amount = %d"%(str(otp), amount),
        from_="+13016059121",
        to="+"+"%s"%(no)
    )

    return 'message sent'
