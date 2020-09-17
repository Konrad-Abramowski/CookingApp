document.addEventListener("DOMContentLoaded", showRecipes);

async function showRecipes() {
    let result = [];

    result = await getRecipes();

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


        let descriptionTdElement = document.createElement("td");
        let descriptionTdText = document.createTextNode(dataArray[i].preparation);
        descriptionTdElement.appendChild(descriptionTdText);

        let recipe = [];
        recipe = await getRecipe(dataArray[i].id);
        console.log(recipe);
        for (let j in recipe){
            recipe[j].INGREDIENT_NAME
        }

        let ingredientsTdElement = document.createElement("td");

        let actionTdElement = document.createElement("td");

        let actionDeleteAElement = document.createElement("a");
        actionDeleteAElement.className = "badge badge-danger p-2 mr-1";
        actionDeleteAElement.text = "Delete";
        actionTdElement.appendChild(actionDeleteAElement);

        let actionPElement = document.createElement("p");
        actionPElement.textContent = "|";
        actionPElement.className = "d-inline font-weight-bold";
        actionTdElement.appendChild(actionPElement);

        let actionUpdateAElement = document.createElement("a");
        actionUpdateAElement.className = "badge badge-success p-2 ml-1";
        actionUpdateAElement.text = "Edit";
        actionTdElement.appendChild(actionUpdateAElement);


        trElement.appendChild(tdElement);
        trElement.appendChild(nameTdElement);
        trElement.appendChild(descriptionTdElement);
        trElement.appendChild(ingredientsTdElement);
        trElement.appendChild(actionTdElement);
        document.getElementById("recipeTableBody").appendChild(trElement);
    }
}

async function getRecipe(id) {
    const response = await fetch('http://localhost:8080/recipes/' + id, {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'
        }
    })
    return response.json();
}

async function getRecipes() {
    const response = await fetch('http://localhost:8080/recipes', {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'
        }
    })
    return response.json();
}

