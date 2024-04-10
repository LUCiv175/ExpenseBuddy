from flask import Flask, render_template, request, redirect

import sqlite3 as sq

app = Flask(__name__)



@app.route("/")
def hello_world():
    return render_template("main.html")

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