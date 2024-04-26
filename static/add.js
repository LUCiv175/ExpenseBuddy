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
