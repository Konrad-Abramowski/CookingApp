document.addEventListener("DOMContentLoaded", showIngredients);

async function showIngredients() {
    let result = [];

    result = await getIngredients();

    let dataArray = [];
    for (let i in result) {
        dataArray.push(result[i]);
    }

    let counter = 1;
    let deleteOnClick;
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
        actionDeleteButtonElement.onclick = deleteOnClick = () => deleteIngredient(dataArray[i].id);
        actionTdElement.appendChild(actionDeleteButtonElement);

        let actionUpdateButtonElement = document.createElement("button");
        actionUpdateButtonElement.className = "btn btn-success mr-1";
        actionUpdateButtonElement.textContent = "Edit";
        actionUpdateButtonElement.onclick = updateOnClick = () => updateIngredient(dataArray[i].id);
        actionTdElement.appendChild(actionUpdateButtonElement);

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

async function deleteIngredient(id) {

    await fetch('http://localhost:8080/ingredients/' + id, {
        'method': 'DELETE',
        'headers': {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if(response.ok){
            document.getElementById("ingredientTableBody").innerHTML = "";
            showIngredients();
        } else{
            throw new Error('Ingredient is being used in some recipe!');
        }
    }).catch((error) => {
        console.log(error);
        $("#errorIngredientModal").modal('show');
    });
}

