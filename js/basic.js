const table = document.getElementById("table");

async function getData() {
    const url = "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
    const dataPromise = await fetch(url);
    const dataJSON = await dataPromise.json();

    const municipality = dataJSON.dataset.dimension.Alue.category.label;
    const population = dataJSON.dataset.value;
    const keys = Object.keys(municipality);

    keys.forEach((key, index) => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td"); 
        let td2 = document.createElement("td");

        td1.innerText = municipality[key];
        td2.innerText = population[index];
        tr.appendChild(td1);
        tr.appendChild(td2);

        table.appendChild(tr);
    });
}

getData();
