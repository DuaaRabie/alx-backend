from flask import Flask, g, request, render_template
from flask_babel import Babel, _
import pytz
from datetime import datetime
from babel import Locale
from babel.dates import format_datetime


app = Flask(__name__)


class Config:
    """ Configuration for Babel """
    LANGUAGES = ['en', 'fr']
    DEFAULT_LOCALE = 'en'
    TIMEZONE = 'UTC'


app.config.from_object(Config)
babel = Babel(app)

# Mock user database
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """ Function to retrieve user based on URL parameter 'login_as' """
    user_id = request.args.get('login_as', type=int)
    if user_id and user_id in users:
        return users[user_id]
    return None


@app.before_request
def before_request():
    """ Before request function to set user globally """
    user = get_user()
    g.user = user


@babel.localeselector
def get_locale():
    """ Locale selector function """
    # 1. Locale from URL parameter
    locale = request.args.get('locale')

    # 2. Locale from user settings
    if not locale and g.user and g.user['locale']:
        locale = g.user['locale']

    # 3. Locale from request headers
    if not locale:
        locale = request.accept_languages.best_match(app.config['LANGUAGES'])

    # 4. Default locale if none of the above
    return locale or app.config['DEFAULT_LOCALE']


@babel.timezoneselector
def get_timezone():
    """ Timezone selector function """
    # 1. Timezone from URL parameter
    timezone = request.args.get('timezone')

    # 2. Timezone from user settings
    if not timezone and g.user and g.user['timezone']:
        timezone = g.user['timezone']

    # 3. Validate timezone or default to UTC
    try:
        if timezone:
            pytz.timezone(timezone)  # Validate the timezone
        else:
            timezone = app.config['TIMEZONE']
    except pytz.exceptions.UnknownTimeZoneError:
        timezone = app.config['TIMEZONE']  # Default to UTC if invalid

    return timezone


@app.route('/')
def index():
    """ Define the route """
    # Get the current time in the selected time zone
    tz = pytz.timezone(get_timezone())
    current_time = datetime.now(tz)
    locale_get = g.get('locale', app.config['DEFAULT_LOCALE'])
    formatted_time = format_datetime(current_time, locale=locale_get)
    return render_template('8-index.html', current_time=formatted_time)


if __name__ == '__main__':
    app.run(debug=True)
