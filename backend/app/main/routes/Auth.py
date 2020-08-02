from . import auth
from ..services.auth_user import *
from flask import request
import json


@auth.route('/')
def auth_home():
    return 'auth home'


@auth.route('/signup_from_app', methods=['POST'])
def signup_app():

    res = signup_from_app(request.json)

    return res


@auth.route('/login_from_app', methods=['POST'])
def login_app():

    res = login_from_app(request.json)

    return res


@auth.route('/login', methods=['POST'])
def login_user():

    res = login_from_google(request.json)

    return res


@auth.route('/get_user_info')
def get_details_from_token():
    token = request.args.get('auth_token')

    res = get_user_info(token)

    return res
