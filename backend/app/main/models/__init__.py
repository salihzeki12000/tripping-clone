from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from . import UsersModel
from . import UserOAuthModel
from . import RoomDetailsModel
from . import RoomDetailsBedroomPriceRelation
from . import LocationModel
from . import HotelsModel
from . import BedroomPriceModel
from . import AminitiesModel
