from . import auth
from ..services.auth_user import *
from flask import request
import json


@auth.route('/')
def auth_home():
    return 'auth home'


@auth.route('/signup', methods=['POST'])
def signup():
    
    res = signup_user(request.json)

    return res


@auth.route('/login', methods=['POST'])
def login():
    
    res = login_user(request.json)

    return res