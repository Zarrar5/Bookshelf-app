from flask import Flask, jsonify, request
from flask_cors import CORS
from config import app, db
from models import Book

CORS(app)  

@app.route("/books", methods=["GET"])
def get_books():
    books = Book.query.all()
    json_books = list(map(lambda x: x.to_json(), books))
    return jsonify({"books": json_books})

@app.route("/create_book", methods=["POST"])
def create_book():
    try:
        data = request.json

        required_fields = ["title", "author", "genre", "rating"]

        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error", f'Missing required field: {field}'}),400
            
            title = data.get("title")
            author = data.get("author")
            genre = data.get("genre")
            notes = data.get("notes")
            rating = data.get("rating")

            new_book = Book(title=title, author=author, genre=genre, notes=notes, rating=rating)
            db.session.add(new_book)
            db.session.commit()

            return jsonify(new_book.to_json()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error", str(e)}), 500

@app.route("/update_book/<int:book_id>", methods=["PATCH"])
def update_book(book_id):
 try:
        book = Book.query.get_or_404(book_id)
        data = request.json

        if 'title' in data:
            book.title = data['title']
        if 'author' in data:
            book.author = data['author']
        if 'genre' in data:
            book.genre = data['genre']
        if 'notes' in data:
            book.notes = data['notes']
        if 'rating' in data:
            book.rating = data['rating']
        db.session.commit()

        return jsonify(book.to_json()), 200

 except Exception as e:
        return jsonify({'error': str(e)}), 500
 
@app.route("/delete_book/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
    book = Book.query.get(book_id)

    if not book:
        return jsonify({"message": "Book not found"}), 404
    
    db.session.delete(book)
    db.session.commit()

    return jsonify({"message": "Book deleted!"}), 200
    

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)


