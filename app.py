from flask import Flask, render_template, request, redirect

import sqlite3 as sq

app = Flask(__name__)



@app.route('/')
def index():
    return render_template('main.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/show')
def show():
    return render_template('show.html')

@app.route('/add')
def add():
    return render_template('add.html')

@app.route('/categories')
def categories():
    return render_template('categories.html')

@app.route('/export')
def export():
    return render_template('export.html')




@app.route("/api/notes")
def get_notes():
    db = sq.connect("data.db")
    cursor = db.cursor()
    cursor.execute("SELECT * FROM notes")
    data = []

    for row in cursor:
        data.append({
            "id": row[0],
            "content": row[1],
            "lat": row[2],
            "lng": row[3]
        })
    db.close()
    return data
    
@app.post("/notes")
def add_note():
    content = request.form.get("content")
    lat = request.form.get("lat")
    lng = request.form.get("lng")
    print(content, lat, lng)
    db = sq.connect("data.db")
    cursor = db.cursor()
    cursor.execute("INSERT INTO notes (content, lat, lng) VALUES (?, ?, ?)", (content, lat, lng))
    db.commit()
    db.close()
    return redirect("/")

app.run(debug=True)