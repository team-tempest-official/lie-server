import flask
from flask.ext.sqlalchemy import SQLAlchemy

app = flask.Flask(__name__)
app.config.from_pyfile('settings.py')
db = SQLAlchemy(app)


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String)


app   = flask.Flask(__name__)
app.config['DEBUG'] = True

@app.route('/')
def root():
    return 'Salut'

db.create_all()
if __name__ == '__main__':
    app.run(port=8080)
