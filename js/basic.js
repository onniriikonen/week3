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

async function getEmployment() {
    const url = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
    const employmentPromise = await fetch(url);
    const employmentJSON = await employmentPromise.json();

    const employment = employmentJSON.dataset.value;
    const rows = table.querySelectorAll("tr");

    employment.forEach((value, index) => {
        let td = document.createElement("td"); 

        td.innerText = value;
        rows[index].appendChild(td);
    });
}

function calculate() {
    const rows = table.querySelectorAll("tr");
    
    rows.forEach((row) => {
        const populationCell = row.cells[1];
        const employmentCell = row.cells[2];

        const populationRow = parseFloat(populationCell.innerText);
        const employmentRow = parseFloat(employmentCell.innerText);

        let td = document.createElement("td");
        const percentage = (employmentRow / populationRow * 100).toFixed(2);
        td.innerText = percentage + '%';

        row.appendChild(td);

        if (percentage > 45) {
            row.classList.add("over45");
        } else if (percentage < 25) {
            row.classList.add("under25");
        }
    });
}

async function load() {
    await getData();
    await getEmployment();
    calculate();
}

load();



