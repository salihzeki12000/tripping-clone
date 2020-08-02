from . import booking
from ..services.book import *
from flask import request
import json


@booking.route('/')
def booking_home():
    return 'booking home'



@booking.route('/order_id',methods=['POST'])
def payment():

    res = order_id(request.json)

    return res


@booking.route('/varification',methods=['POST'])
def varify_payment():

    res = varification(request.json)

    return res


@booking.route('/get_otp/<no>')
def get_otp(no):

    res = get_mobile_otp(no)

    return res


@booking.route('/varify_otp/<no>')
def varify_otp(no):

    res = varify_mobile_otp(no)

    return res


@booking.route('/booking_msg', methods=['POST'])
def booking_msg():

    res = send_booking_msg(request.json)

    return res

# @booking.route("/send_mail")
# def mails():
#     res = send_email()

#     return res