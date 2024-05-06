const slid = document.getElementById('slider');
const loadCards = () =>{
    fetch('/getCategorie')
    .then(response => response.json())
    .then(categorie => {
        let count = 1
        categorie.forEach(element => {
            //console.log(element)
            var nuovoElementoDiv = document.createElement("div");
            nuovoElementoDiv.id = "slide-" + count++;
            nuovoElementoDiv.className = "boxing";
            var titolo = document.createElement("div");
            titolo.className = "titles";
            titolo.textContent = element[1];
            const icona = document.createElement("div");
            icona.className = "icons";
            icona.innerHTML = element[3];
            var testoCategoria = document.createElement("div");
            testoCategoria.className = "categorytext";
            testoCategoria.textContent = element[2];
            // Aggiunngi qui la parte necessaria per le icone
            nuovoElementoDiv.appendChild(titolo);
            nuovoElementoDiv.appendChild(icona);
            nuovoElementoDiv.appendChild(testoCategoria);
            // Aggiungi qui i append necessari per le icone
            slid.appendChild(nuovoElementoDiv)
   
        });
    })
    .catch(error => {
        console.error('Si è verificato un errore durante il recupero delle categorie:', error);
    });
}








