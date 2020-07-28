from . import booking
from ..services.book import *
from flask import request
import json


@booking.route('/')
def auth_home():
    return 'auth home'


@booking.route('/',methods=['POST'])
def book_room():
    return 'auth home'