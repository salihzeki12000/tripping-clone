import jwt
from instance.config import SECRET_KEY as key
import datetime


def check_auth_token(token):

    decoded_data = jwt.decode(token, key, algorithms=['HS256'])

    if datetime.datetime.strptime(decoded_data["expire_at"],
                                  "%Y-%m-%d %H:%M:%S.%f") \
    < datetime.datetime.utcnow():
        return False, {}
    else:          
        return True, {"first_name": decoded_data["first_name"],
                    "last_name": decoded_data["last_name"],
                    "email": decoded_data["email"]}
                    