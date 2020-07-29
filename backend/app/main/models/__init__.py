from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from . import UsersModel
from . import UserOAuthModel
from . import RoomDetailsModel
from . import LocationModel
from . import HotelsModel
from . import AminitiesModel
from . import ReviewModel