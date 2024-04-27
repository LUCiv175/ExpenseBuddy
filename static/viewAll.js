const recentExpense = document.getElementById('recentExpense');
const graph = document.getElementById('graph');
const details = document.getElementById('details');
const buttonViewAll = document.getElementById('viewAllBtn');

const viewAll = () => {
    recentExpense.classList.toggle('active');
    graph.classList.toggle('active');
    details.classList.toggle('active');
    //remove all the elements from the table in recentExpense
    const table = document.getElementById('tableBox');
    table.innerHTML = '';
    if (!recentExpense.classList.contains('active')){
        buttonViewAll.innerHTML = 'View All';
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
    else{
        buttonViewAll.innerHTML = 'Close';
    fetch('/viewAll')
    .then(response => response.json())
    .then(dati => {
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
            table.appendChild(tr);
        })
    })}
}
        