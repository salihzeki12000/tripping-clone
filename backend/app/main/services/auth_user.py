from ..models import db
from ..models.Users import Users
import json
import datetime
import jwt
from instance.config import SECRET_KEY


def signup_user(data):
    try:
        email = data['email']
        password = data['password']
    except Exception as err:
        return json.dumps({'error': True, 'error_found': format(err)})

    try:
        if data is not None:
            user = Users(
                email=data['email'],
                password=data['password']
            )
            db.session.add(user)
            db.session.commit()
            return json.dumps(
                {'error': False, 'message': 'signup successfully'}
            )
    except Exception as err:
        return {'error': True, 'error_found': format(err)}


def login_user(data):
    try:
        email = data['email']
        password = data['password']
    except Exception as err:
        return json.dumps({'error': True, 'error_found': format(err)})

    try:
        data = Users.query.filter(Users.email == email).first()
        flag = 0
        if data is not None:
            if data.password == password:
                obj = {
                    "email": data.email,
                    "created_at": str(datetime.datetime.utcnow()),
                    "expire_at": str(datetime.datetime.utcnow()
                                 + datetime.timedelta(days=1))
                }

            encode_jwt = jwt.encode(obj, SECRET_KEY)

            return json.dumps({"error": False, "token": encode_jwt.decode(),
                               "message": "Logged in successfully"})
        else:
            return json.dumps({"error": True,
                               "message":"You have entered the wrong password"})
    except Exception as err:
        return {'error': True, 'error_found': format(err)}
