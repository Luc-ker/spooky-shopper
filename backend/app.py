from flask import Flask, flash, redirect, render_template, request, session, g, jsonify
import sqlite3


app = Flask(__name__)
app.config['DATABASE'] = 'database.db'  # Path to your SQLite database

# Function to connect to the database
def get_db():
    if 'db' not in g:  # `g` is a special object in Flask that persists across a request
        g.db = sqlite3.connect(app.config['DATABASE'])
        g.db.row_factory = sqlite3.Row  # Optional: rows as dictionaries for easy access
    return g.db

# Function to close the database connection
@app.teardown_appcontext
def close_db(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def execute(query, args=(), one=False):
    db = get_db()
    cur = db.execute(query, args)
    rv = cur.fetchall()
    cur.close()
    db.commit()
    return (rv[0] if rv else None) if one else rv


@app.route('/', methods=["POST"])
def ItemLocation():
    item = request.form.get("item")
    all_items = execute("SELECT name FROM items")
    if item not in all_items:
        return jsonify("Sorry, This item is not availabe in the store")
    else:
        return jsonify(execute("SELECT price, aisle_number, row, column FROM items"))