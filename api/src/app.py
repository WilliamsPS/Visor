from flask import Flask
from flask_cors import CORS  # Importa la extensión CORS

from config import config
from routers import Aire

app = Flask(__name__)
CORS(app)  # Configura CORS para la aplicación Flask

def page_not_found(error):
    return "<h1>404 Not Found page</h1>", 404

if __name__ == '__main__':
    app.config.from_object(config['development'])

    # Blueprints
    app.register_blueprint(Aire.main, url_prefix='/api')

    # Error handlers
    app.register_error_handler(404, page_not_found)
    app.run(port=5505)
