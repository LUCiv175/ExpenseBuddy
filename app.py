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

@app.route('/home2')
def home2():
    return render_template('home2.html')




@app.route("/utenti", methods=['GET'])
def get_notes():
    db = sq.connect("data.db")
    cursor = db.cursor()
    cursor.execute("SELECT * FROM utente")
    data = cursor.fetchall()
    db.close()
    return data

@app.route("/expensebyCategories", methods=['GET'])
def get_expense_by_categories():
    db = sq.connect("data.db")
    cursor = db.cursor()
    cursor.execute("SELECT c.nome, SUM(e.valore) as total_expense FROM categoria c JOIN spesa e ON c.id = e.fkCategoria WHERE STRFTIME('%m-%Y', CURRENT_DATE) = STRFTIME('%m-%Y', e.dataSpesa) GROUP BY c.id;")
    data = cursor.fetchall()
    db.close()
    return data


@app.route("/totalExpensesMonthly", methods=['GET'])
def get_total_expense_monthly():
    db = sq.connect("data.db")
    cursor = db.cursor()
    cursor.execute("SELECT ROUND(SUM(valore), 2) FROM spesa WHERE STRFTIME('%m-%Y', CURRENT_DATE) = STRFTIME('%m-%Y', dataSpesa);")
    data = cursor.fetchall()
    db.close()
    return data

@app.route("/totalExpensesYearly", methods=['GET'])
def get_total_expense_yearly():
    db = sq.connect("data.db")
    cursor = db.cursor()
    cursor.execute("SELECT SUM(valore) FROM spesa WHERE STRFTIME('%Y', CURRENT_DATE) = STRFTIME('%Y', dataSpesa);")
    data = cursor.fetchall()
    db.close()
    return data

@app.route("/totalExpenses", methods=['GET'])
def get_total_expense():
    db = sq.connect("data.db")
    cursor = db.cursor()
    cursor.execute("SELECT SUM(valore) FROM spesa;")
    data = cursor.fetchall()
    db.close()
    return data

@app.route("/numberExpenses", methods=['GET'])
def get_number_expense():
    db = sq.connect("data.db")
    cursor = db.cursor()
    cursor.execute("SELECT COUNT(*) FROM spesa;")
    data = cursor.fetchall()
    db.close()
    return data

@app.route("/lastExpenses", methods=['GET'])
def get_last_expense():
    db = sq.connect("data.db")
    cursor = db.cursor()
    cursor.execute("SELECT spesa.nome, valore, dataSpesa, c.nome FROM spesa join categoria c on c.id=spesa.fkCategoria ORDER BY dataSpesa DESC LIMIT 7;")
    data = cursor.fetchall()
    db.close()
    return data

@app.route("/getCategorie", methods=['GET'])
def get_categorie():
    db = sq.connect("data.db")
    cursor = db.cursor()
    cursor.execute("SELECT * FROM categoria")
    data = cursor.fetchall()
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