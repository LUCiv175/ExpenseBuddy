

const franco = () => {
fetch('/utenti')
.then(response => response.json())
.then(data => console.log(data))
}

const loadCategories = () => {
fetch('/getCategorie')
.then(response => response.json())
.then(data => {
    const content = document.getElementById('categoriesBlock');
    console.log(data);
    data.forEach(category => {
        console.log(category);
        const div = document.createElement('div');
        div.className = 'categoriesTitle';
        const p = document.createElement('p');
        p.innerHTML = category[1];
        div.appendChild(p);
        content.appendChild(div);
        const div2 = document.createElement('div');
        div2.className = 'categoriesContents';
        const p2 = document.createElement('p');
        p2.innerHTML = category[2];
        div2.appendChild(p2);
        content.appendChild(div2);
    })
})}
