from flask import Blueprint


auth = Blueprint('auth',__name__)
search = Blueprint('search',__name__)


from . import Auth
from . import Search