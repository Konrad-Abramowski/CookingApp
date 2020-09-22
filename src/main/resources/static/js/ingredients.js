document.addEventListener("DOMContentLoaded", showIngredients);

async function showIngredients() {
    let result = [];

    result = await getIngredients();

    let dataArray = [];
    for (let i in result) {
        dataArray.push(result[i]);
    }

    let counter = 1;
    for (let i in dataArray) {
        let trElement = document.createElement("tr");

        let tdElement = document.createElement("td");
        let tdText = document.createTextNode(counter++);
        tdElement.appendChild(tdText);

        let nameTdElement = document.createElement("td");
        let nameTdText = document.createTextNode(dataArray[i].name);
        nameTdElement.appendChild(nameTdText);

        let actionTdElement = document.createElement("td");

        let actionDeleteButtonElement = document.createElement("button");
        actionDeleteButtonElement.className = "btn btn-danger mr-1";
        actionDeleteButtonElement.textContent = "Delete";
        actionTdElement.appendChild(actionDeleteButtonElement);

        let actionUpdateAElement = document.createElement("button");
        actionUpdateAElement.className = "btn btn-success mr-1";
        actionUpdateAElement.textContent = "Edit";
        actionTdElement.appendChild(actionUpdateAElement);

        trElement.appendChild(tdElement);
        trElement.appendChild(nameTdElement);
        trElement.appendChild(actionTdElement);
        document.getElementById("ingredientTableBody").appendChild(trElement);
    }
}

async function getIngredients() {
    const response = await fetch('http://localhost:8080/ingredients', {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'
        }
    })
    return response.json();
}