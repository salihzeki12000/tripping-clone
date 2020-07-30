from flask import Blueprint


auth = Blueprint('auth',__name__)
search = Blueprint('search',__name__)
entity = Blueprint('entity',__name__)
booking = Blueprint('booking',__name__)

from . import Auth
from . import Search
from . import Entity
from . import Booking