from flask import Flask, g, request, render_template
from flask_babel import Babel, _


app = Flask(__name__)


class Config:
    """ Configuration for Babel """
    LANGUAGES = ['en', 'fr']
    DEFAULT_LOCALE = 'en'
    TIMEZONE = 'UTC'


app.config.from_object(Config)
babel = Babel(app)
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """ Function to retrieve user based on URL parameter 'login_as'"""
    user_id = request.args.get('login_as', type=int)
    if user_id and user_id in users:
        return users[user_id]
    return None


@app.before_request
def before_request():
    """  Before request function to set user globally """
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


@app.route('/')
def index():
    """ Define the route """
    return render_template('6-index.html')


if __name__ == '__main__':
    app.run(debug=True)
