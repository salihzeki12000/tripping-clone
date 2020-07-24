from ..models import db
from ..models.UsersModel import Users
from ..models.UserOAuthModel import UserOAuth
import json
import datetime
import jwt
from instance.config import SECRET_KEY as key
from ..util.auth_token import check_auth_token


def create_token(first_name,last_name,email,expire_at=""):
    # if expire_at == "":
    #     expire_at =  str(datetime.datetime.utcnow()
    #                         + datetime.timedelta(days=1))
    # else:
    #     expire_at =  str(datetime.datetime.utcnow()
    #                         + datetime.timedelta(days=2))

    obj = {"email": email,
            "first_name":first_name,
            "last_name":last_name,
            "created_at": str(datetime.datetime.utcnow()),
            "expire_at": str(datetime.datetime.utcnow()
                        + datetime.timedelta(days=1))
        }
    encode_jwt = jwt.encode(obj, key, algorithm='HS256')

    return encode_jwt


def signup_from_app(data):
    try:
        first_name = data['first_name']
        last_name = data['last_name']
        email = data['email']
        password = data['password']
        
        if data is not None:
            user = Users(
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=password
            )
            db.session.add(user)
            db.session.commit()

            encode_jwt = create_token(first_name,last_name,email)

            return json.dumps(
                {'error': False, 'message': 'signup successfully',
                'token':encode_jwt.decode()}
            )
        else:
            return json.dumps({"error": True,
                'message':'Please enter valid email and password'})
    except Exception as err:
        return {'error': True, 'error_found': format(err)}


def login_from_app(data):
    try:
        email = data['email']
        password = data['password']

        check_data = Users.query.filter(Users.email == email).first()

        if check_data is not None:
            if check_data.password == None:
                return json.dumps({"error": True,
                'message':'Please change your password'})
            elif check_data.password == password:
                encode_jwt = create_token(check_data.first_name,check_data.last_name,email)

                return json.dumps(
                    {'error': False, 'message': 'login successfully',
                    'token':encode_jwt.decode()}
                )
            else:
                return json.dumps({"error": True,
                'message':'Please enter valid password'})
        else:
            return json.dumps({"error": True,
                'message':'Please enter valid email and password'})
    except Exception as err:
        return {'error': True, 'error_found': format(err)}


def login_from_google(data):
    try:
        first_name = data['first_name']
        last_name = data['last_name']
        email = data['email']
        provider = data['provider']
        provider_id = data['provider_id']
        access_token = data['access_token']
        image_url = data['image_url']
        expired_in = data['expired_in']

    
        check_data = Users.query.filter(Users.email == email).first()

        if email and provider_id:
            if check_data is None:
                user = Users(
                    first_name=first_name,
                    last_name=last_name,
                    email=email
                )
                db.session.add(user)
                db.session.commit()

                get_data = Users.query.filter(Users.email == email).first()

                userAuth = UserOAuth(
                    email=email,
                    user_id=get_data.id,
                    provider=provider,
                    provider_id=provider_id,
                    access_token=access_token,
                    image_url=image_url,
                    expired_in=expired_in,
                )
                db.session.add(userAuth)
                db.session.commit()

                encode_jwt = create_token(first_name,last_name,email,expired_in)

                return json.dumps(
                    {'error': False, 'message': 'login successfully',
                    'token':encode_jwt.decode()}
                )
            elif check_data is not None:
                res = db.session.execute(
                        '''UPDATE user_o_auth SET access_token="%s", \
                        expired_in="%s" WHERE email="%s"''' % (access_token,expired_in,email))
                db.session.commit()

                encode_jwt = create_token(first_name,last_name,email,expired_in)

                return json.dumps(
                    {'error': False, 'message': 'login successfully',
                    'token':encode_jwt.decode()}
                )
            else:
                return json.dumps({"error": True,
                               "message":"You have entered wrong email or password"})
        else:
            return json.dumps({"error": True,
                               "message":"You have entered wrong email or password"})
    except Exception as err:
        return {'error': True, 'error_found': format(err)}


def get_user_info(token):
    state, res = check_auth_token(token)

    if res:
        return json.dumps({'error':False, 'data':res})
    else:
        return json.dumps({'error':True, 'data':res})
