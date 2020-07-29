from . import entity
from ..services.entity import *
from flask import request
import json


@entity.route('/')
def entity_home():
    return 'entity home'


@entity.route('/images/<id>')
def get_images(id):
    
    res = get_image_data(id)

    return res


@entity.route('/basic_detail/<id>/<room_type>')
def get_basic_detail(id,room_type):
    
    res = get_basic_data(id,room_type)

    return res

@entity.route('/review/<id>')
def get_review_detail(id):
    
    res = get_review_data(id)

    return res

@entity.route('/recommendation/<id>/<room_type>')
def get_recommendation_detail(id,room_type):
    
    res = get_recommendation_data(id,room_type)

    return res

@entity.route('/check_dates')
def check_availability():
    
    
    res = check_available_dates(request.args.get)

    return res
