document.addEventListener("DOMContentLoaded", showRecipes);

async function showRecipes() {
    let result = [];

    result = await getRecipes();

    let dataArray = [];
    for (let i in result) {
        dataArray.push(result[i]);
    }

    let counter = 1;
    let deleteOnClick;
    let viewOnClick;
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

        let ingredientsTdElement = document.createElement("td");

        let ingredientsUlElement = document.createElement("ul");
        ingredientsUlElement.className = "list-group ingredients-ul";

        let recipe = [];
        recipe = await getRecipe(dataArray[i].id);
        for (let j in recipe) {
            let ingredientsLiElement = document.createElement("li");
            ingredientsLiElement.className = "list-group-item d-flex justify-content-between align-items-center";
            ingredientsLiElement.textContent = recipe[j].INGREDIENT_NAME;
            let ingredientSpanElement = document.createElement("span");
            ingredientSpanElement.className = "badge badge-primary badge-pill";
            ingredientSpanElement.textContent = recipe[j].NUMBER + recipe[j].UNIT;
            ingredientsLiElement.appendChild(ingredientSpanElement);
            ingredientsUlElement.appendChild(ingredientsLiElement);
        }
        ingredientsTdElement.appendChild(ingredientsUlElement);


        let actionTdElement = document.createElement("td");

        let actionDeleteButtonElement = document.createElement("button");
        actionDeleteButtonElement.className = "btn btn-danger mr-1";
        actionDeleteButtonElement.textContent = "Delete";
        actionDeleteButtonElement.onclick = deleteOnClick = () => deleteRecipe(dataArray[i].id);
        actionTdElement.appendChild(actionDeleteButtonElement);

        let actionUpdateButtonElement = document.createElement("button");
        actionUpdateButtonElement.className = "btn btn-success mr-1";
        actionUpdateButtonElement.textContent = "Edit";
        actionTdElement.appendChild(actionUpdateButtonElement);

        let actionViewButtonElement = document.createElement("button");
        actionViewButtonElement.className = "btn btn-primary mr-1";
        actionViewButtonElement.textContent = "View";
        actionViewButtonElement.onclick = viewOnClick = () => $("#viewRecipeModal").modal('show');

        actionTdElement.appendChild(actionViewButtonElement);


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

