import flask
from flask import jsonify

app   = flask.Flask(__name__)
app.config['DEBUG'] = True

@app.route('/')
def root():
    return 'Salut'

if __name__ == '__main__':
    app.run(port=8080)
