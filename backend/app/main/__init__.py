from flask import Flask
from flask_cors import CORS 
from config import app_config
from .models import db
from flask_migrate import Migrate
from .routes import auth as auth_blueprint
from .routes import search as search_blueprint


def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    app.config.from_object(app_config[config_name])
    app.config.from_pyfile("config.py")

    app.register_blueprint(auth_blueprint, url_prefix="/auth")
    app.register_blueprint(search_blueprint, url_prefix="/search")

    db.init_app(app)
    migrate = Migrate(app, db)

    return app
