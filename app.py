import flask
from flask.ext.sqlalchemy import SQLAlchemy

app = flask.Flask(__name__)
app.config.from_pyfile('settings.py')
db = SQLAlchemy(app)
#posts = db.relationship('Post', backref='author', lazy='dynamic')
#user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Deck(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    cards = db.relationship('Card', backref='deck', lazy='dynamic')
    

class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column('card_id', db.Integer, db.ForeignKey("card.id"), nullable=False)   


class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String)
    deck_id = db.Column(db.Integer, db.ForeignKey('deck.id'), nullable=False)  
    answers= db.relationship('Answer', backref='card', lazy='dynamic')

app   = flask.Flask(__name__)
app.config['DEBUG'] = True

@app.route('/')
def root():
    return 'Salut'

db.create_all()
if __name__ == '__main__':
    app.run(port=8080)
