const ctx = document.getElementById('myChart');
const loadCards = () =>{
    fetch('/totalExpensesYearly')
    .then(response => response.json())
    .then(dati => {
        const content = document.getElementById('cardBox');
        const card = document.createElement('div');
        card.className = 'card';
        const div = document.createElement('div');
        const numbers = document.createElement('div');
        numbers.className = 'numbers';
        numbers.innerHTML = dati[0] +'€';
        const cardName = document.createElement('div');
        cardName.className = 'cardName';
        cardName.innerHTML = 'Totale Spesa Annuale';
        div.appendChild(numbers);
        div.appendChild(cardName);
        card.appendChild(div);
        const iconBox = document.createElement('div');
        iconBox.className = 'iconBox';
        const icon = document.createElement('ion-icon');
        icon.setAttribute('name', 'calendar-outline');
        iconBox.appendChild(icon);
        card.appendChild(iconBox);
        content.appendChild(card);
    })
    fetch('/totalExpensesMonthly')
    .then(response => response.json())
    .then(dati => {
        const content = document.getElementById('cardBox');
        const card = document.createElement('div');
        card.className = 'card';
        const div = document.createElement('div');
        const numbers = document.createElement('div');
        numbers.className = 'numbers';
        numbers.innerHTML = dati[0] +'€';
        const cardName = document.createElement('div');
        cardName.className = 'cardName';
        cardName.innerHTML = 'Totale Spesa Mensile';
        div.appendChild(numbers);
        div.appendChild(cardName);
        card.appendChild(div);
        const iconBox = document.createElement('div');
        iconBox.className = 'iconBox';
        const icon = document.createElement('ion-icon');
        icon.setAttribute('name', 'calendar-outline');
        iconBox.appendChild(icon);
        card.appendChild(iconBox);
        content.appendChild(card);
    })
    fetch('/totalExpenses')
    .then(response => response.json())
    .then(dati => {
        const content = document.getElementById('cardBox');
        const card = document.createElement('div');
        card.className = 'card';
        const div = document.createElement('div');
        const numbers = document.createElement('div');
        numbers.className = 'numbers';
        numbers.innerHTML = dati[0]  +'€';
        const cardName = document.createElement('div');
        cardName.className = 'cardName';
        cardName.innerHTML = 'Totale Spese';
        div.appendChild(numbers);
        div.appendChild(cardName);
        card.appendChild(div);
        const iconBox
            = document.createElement('div');
        iconBox.className = 'iconBox';
        const icon = document.createElement('ion-icon');
        icon.setAttribute('name', 'cash-outline');
        iconBox.appendChild(icon);
        card.appendChild(iconBox);
        content.appendChild(card);
    }
    )
    fetch('/numberExpenses')
    .then(response => response.json())
    .then(dati => {
        const content = document.getElementById('cardBox');
        const card = document.createElement('div');
        card.className = 'card';
        const div = document.createElement('div');
        const numbers = document.createElement('div');
        numbers.className = 'numbers';
        numbers.innerHTML = dati[0];
        const cardName = document.createElement('div');
        cardName.className = 'cardName';
        cardName.innerHTML = 'N° Spese';
        div.appendChild(numbers);
        div.appendChild(cardName);
        card.appendChild(div);
        const iconBox = document.createElement('div');
        iconBox.className = 'iconBox';
        const icon = document.createElement('ion-icon');
        icon.setAttribute('name', 'bag-outline');
        iconBox.appendChild(icon);
        card.appendChild(iconBox);
        content.appendChild(card);
    })
    
}
const loadTable = () =>{
    fetch('/lastExpenses')
    .then(response => response.json())
    .then(dati => {
        const content = document.getElementById('tableBox');
        dati.forEach(expense => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.innerHTML = expense[0];
            tr.appendChild(td1);
            const td2 = document.createElement('td');
            td2.innerHTML = expense[1] + '€';
            tr.appendChild(td2);
            const td3 = document.createElement('td');
            td3.innerHTML = expense[2];
            tr.appendChild(td3);
            const td4 = document.createElement('td');
            td4.innerHTML = expense[3];
            tr.appendChild(td4);
            content.appendChild(tr);
        })
    })
}




const loadDashboard = () =>{
    fetch('/expensebyCategories')
    .then(response => response.json())
    .then(dati => {
        loadCards();
        loadTable();
        const data = {
            labels: dati.map(item => item[0]),
            datasets: [{
                label: 'Spese per Categoria',
                data: dati.map(item => item[1]),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)'
                ]
            }]
        };
        new Chart(ctx, {
            type: 'polarArea',
            data: data,
            options: {}
        });
    })
}

