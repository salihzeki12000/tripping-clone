from . import search
from ..services.search import *
from flask import request
import json


@search.route('/')
def search_home():
    return 'search home'


@search.route('/s')
def Search_data():
    
    res = search_uisng_filter(request.args.get)

    return res