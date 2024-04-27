import hashlib
from flask import Flask, render_template, request, redirect, session
from flask_session import Session
import sqlite3 as sq

app = Flask(__name__)


app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)



@app.route('/')
def index():
    return render_template('main2.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/home')
def home():
    if 'user' in session:
        return render_template('home.html')
    else:
        return redirect("/login")

@app.route('/profile')
def profile():
    if 'user' not in session:
        return redirect("/login")
    else:
        return render_template('profile.html')

@app.route('/show')
def show():
    if 'user' not in session:
        return redirect("/login")
    else:
        return render_template('grafico.html')

@app.route('/add')
def add():
    if 'user' not in session:
        return redirect("/login")
    else:
        return render_template('add.html')

@app.route('/categories')
def categories():
    if 'user' not in session:
        return redirect("/login")
    else:
        return render_template('categories.html')

@app.route('/export')
def export():
    if 'user' not in session:
        return redirect("/login")
    else:
       return render_template('export.html')


@app.route("/expensebyCategories", methods=['GET'])
def get_expense_by_categories():
    if 'user' not in session:
        return {"status": "error"}
    else:
        id = session['user']
        db = sq.connect("data.db")
        cursor = db.cursor()
        query = "SELECT c.nome, SUM(s.valore) FROM spesa s JOIN categoria c ON c.id=s.fkCategoria WHERE s.fkUtente=" + str(id) + " GROUP BY c.nome;"
        cursor.execute(query)
        data = cursor.fetchall()
        db.close()
        return data


@app.route("/loginForm", methods=['POST'])
def loginForm():
    data = request.json
    email = data["email"]
    password = data["password"]
    db = sq.connect("data.db")
    cursor = db.cursor()
    password = hashlib.sha256(password.encode()).hexdigest()
    cursor.execute("SELECT * FROM utente WHERE email = ? AND passwordUtente = ?", (email, password))
    data = cursor.fetchall()
    db.close()
    if len(data) > 0:
        session['user'] = data[0][0]
        return {"status": "ok"}
    else:
        return {"status": "error"}
    
@app.route("/addExpense", methods=['POST'])
def addExpense():
    if 'user' not in session:
        return {"status": "error"}
    else:
        data = request.json
        nome = data["nome"]
        costo = data["costo"]
        categoria = data["categoria"]
        date = data["date"]
        id = session['user']
        db = sq.connect("data.db")
        cursor = db.cursor()
        cursor.execute("INSERT INTO spesa (nome, valore, dataSpesa, fkCategoria, fkUtente) VALUES (?, ?, ?, ?, ?)", (nome, costo, date, categoria, id))
        db.commit()
        db.close()
        return {"status": "ok"}
    
@app.route("/registerForm", methods=['POST'])
def registerForm():
    data = request.json
    username = data["name"]
    password = data["password"]
    email = data["email"]
    db = sq.connect("data.db")
    cursor = db.cursor()
    password = hashlib.sha256(password.encode()).hexdigest()
    cursor.execute("INSERT INTO utente (nomeUtente, passwordUtente, email) VALUES (?, ?, ?)", (username, password, email))
    db.commit()
    db.close()
    return {"status": "ok"}

@app.route("/totalExpensesMonthly", methods=['GET'])
def get_total_expense_monthly():
    if 'user' not in session:
        return {"status": "error"}
    else:
        id = session['user']
        db = sq.connect("data.db")
        cursor = db.cursor()
        query = "SELECT ROUND(SUM(valore), 2) FROM spesa WHERE fkUtente=" + str(id) + " and STRFTIME('%m-%Y', CURRENT_DATE) = STRFTIME('%m-%Y', dataSpesa);"
        cursor.execute(query)
        data = cursor.fetchall()
        db.close()
    return data

@app.route("/totalExpensesYearly", methods=['GET'])
def get_total_expense_yearly():
    if 'user' not in session:
        return {"status": "error"}
    else:
        id = session['user']
        db = sq.connect("data.db")
        cursor = db.cursor()
        query = "SELECT ROUND(SUM(valore), 2) FROM spesa WHERE fkUtente=" + str(id) + " and STRFTIME('%Y', CURRENT_DATE) = STRFTIME('%Y', dataSpesa);"
        cursor.execute(query)
        data = cursor.fetchall()
        db.close()
    return data

@app.route("/totalExpensesbyYearandMonth", methods=['GET'])
def get_total_expense_by_year_and_month():
    if 'user' not in session:
        return {"status": "error"}
    else:
        id = session['user']
        db = sq.connect("data.db")
        cursor = db.cursor()
        query = "Select STRFTIME('%m', dataSpesa) as mese, STRFTIME('%Y', dataSpesa) as anno,  ROUND(SUM(valore), 2) as totale from spesa where fkUtente=" + str(id) + " group by anno, mese;"
        cursor.execute(query)
        data = cursor.fetchall()
        db.close()
        return data



@app.route("/totalExpenses", methods=['GET'])
def get_total_expense():
    if 'user' not in session:
        return {"status": "error"}
    else:
        id = session['user']
        db = sq.connect("data.db")
        cursor = db.cursor()
        query = "SELECT ROUND(SUM(valore), 2) FROM spesa WHERE fkUtente=" + str(id) + ";"
        cursor.execute(query)
        data = cursor.fetchall()
        db.close()
        return data

@app.route("/numberExpenses", methods=['GET'])
def get_number_expense():
    if 'user' not in session:
        return {"status": "error"}
    else:
        id = session['user']
        db = sq.connect("data.db")
        cursor = db.cursor()
        query = "SELECT COUNT(*) FROM spesa WHERE fkUtente=" + str(id) + ";"
        cursor.execute(query)
        data = cursor.fetchall()
        db.close()
        return data

@app.route("/lastExpenses", methods=['GET'])
def get_last_expense():
    if 'user' not in session:
        return {"status": "error"}
    else:
        id = session['user']
        db = sq.connect("data.db")
        cursor = db.cursor()
        query = "SELECT spesa.nome, valore, dataSpesa, c.nome FROM spesa join categoria c on c.id=spesa.fkCategoria WHERE spesa.fkUtente="+str(id)+" ORDER BY dataSpesa DESC LIMIT 7;"
        cursor.execute(query)
        data = cursor.fetchall()
        db.close()
        print(id)
        return data

@app.route("/getCategorie", methods=['GET'])
def get_categorie():
    db = sq.connect("data.db")
    cursor = db.cursor()
    cursor.execute("SELECT * FROM categoria")
    data = cursor.fetchall()
    db.close()
    return data

@app.route("/logout", methods=['GET'])
def logout():
    session.pop('user', None)
    return redirect("/login")

app.run(debug=True)