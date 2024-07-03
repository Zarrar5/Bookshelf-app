from config import db

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), unique=False, nullable = False )
    author = db.Column(db.String(200), unique=False, nullable=False)
    genre = db.Column(db.String(120), unique=False, nullable=False)
    notes = db.Column(db.Text, nullable=True)
    rating = db.Column(db.Double, nullable=False)

    def to_json(self):
        return{
        "id":self.id,
        "title":self.title,
        "author":self.author,
        "genre":self.genre,
        "notes":self.notes,
        "rating":self.rating
    }