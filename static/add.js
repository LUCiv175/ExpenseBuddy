let inputDate;
let inputCosto;

const loadCategories = () => {
    fetch('/getCategorie')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('categoria');
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category[0];
                option.text = category[1];
                select.appendChild(option);
            });
        }); 
        if (localStorage.getItem('inputDate') && localStorage.getItem('inputCosto')){
            inputDate = localStorage.getItem('inputDate');
            inputCosto = localStorage.getItem('inputCosto');
        }
    if (inputDate && inputCosto) {
        document.getElementById('data').value = inputDate;
        document.getElementById('costo').value = inputCosto;
        document.getElementById('data').readOnly = true;
        document.getElementById('costo').readOnly = true;
        localStorage.removeItem('inputDate');
        localStorage.removeItem('inputCosto');
    }
    
}

const form = document.getElementById('form');
if (form) {
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //console.log(form);
    const formData = new FormData(form);
    const file = formData.get('file');
    formData.append('file', file); // Aggiungi il file all'oggetto FormData
    fetch('/scanPhoto', {
        method: 'POST',
        body: formData // Invia l'intero oggetto FormData come corpo della richiesta
    })
    .then(response => response.json())
    .then(dati => {
        if(dati.status === 'error'){
            alert("Errore nella lettura del file");
            return;
        }
        inputDate = dati.date;
        inputCosto = dati.totalAmount;
        localStorage.setItem('inputDate', inputDate);
        localStorage.setItem('inputCosto', inputCosto);
        window.location.href = '/add';
    });
});
}

const addForm = document.querySelector("#addForm");
addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.querySelector("#nome").value;
    const costo = document.querySelector("#costo").value;
    const categoria = document.querySelector("#categoria").value;
    const date = document.querySelector("#data").value;
    

    const res = await fetch("/addExpense", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, categoria, costo, date}),
    });

    const data = await res.json();
    if (data.status === "ok") {
        window.location.href = "/home";
    } else {
        alert(data.message);
    }
});
const inputData = document.querySelector("#data")
var today = new Date().toISOString().split('T')[0];
  
  // Imposta la data massima come quella odierna
  inputData.max = today;