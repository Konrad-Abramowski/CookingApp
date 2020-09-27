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
    for (let i in dataArray) {
        console.log(dataArray);
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
            ingredientSpanElement.textContent = recipe[j].NUMBER + " " + recipe[j].UNIT;
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
        actionViewButtonElement.onclick = viewOnClick = async () => {
            document.getElementById("viewRecipeModalName").textContent = dataArray[i].name;
            document.getElementById("viewRecipeModalBody").innerHTML = "";

            const recipe = await getRecipe(dataArray[i].id);

            let divElement = document.createElement("div");

            let tableElement = document.createElement("table");
            tableElement.className = "table";

            let theadElement = document.createElement("thead");

            let theadTrElement = document.createElement("tr");

            let theadIngredientThElement = document.createElement("th");
            let theadIngredientThText = document.createTextNode("Ingredient");
            theadIngredientThElement.scope = "col";
            theadIngredientThElement.appendChild(theadIngredientThText);

            let theadAmountThElement = document.createElement("th");
            let theadAmountThText = document.createTextNode("Amount");
            theadAmountThElement.scope = "col";
            theadAmountThElement.appendChild(theadAmountThText);

            let theadUnitThElement = document.createElement("th");
            let theadUnitThEText = document.createTextNode("Unit");
            theadUnitThElement.scope = "col";
            theadUnitThElement.appendChild(theadUnitThEText);

            let tbodyElement = document.createElement("tbody");

            for (let i in recipe) {
                    let trElement = document.createElement("tr");

                    let ingredientTdElement = document.createElement("td");
                    let ingredientTdText = document.createTextNode(recipe[i].INGREDIENT_NAME);
                    ingredientTdElement.appendChild(ingredientTdText);

                    let amountTdElement = document.createElement("td");
                    let amountTdText = document.createTextNode(recipe[i].NUMBER);
                    amountTdElement.appendChild(amountTdText);

                    let unitTdElement = document.createElement("td");
                    let unitTdText = document.createTextNode(recipe[i].UNIT);
                    unitTdElement.appendChild(unitTdText);

                    trElement.appendChild(ingredientTdElement);
                    trElement.appendChild(amountTdElement);
                    trElement.appendChild(unitTdElement);
                    tbodyElement.appendChild(trElement);

            }

            let descriptionH5Element = document.createElement("h5");
            descriptionH5Element.className = "font-weight-bold";
            let descriptionH5Text = document.createTextNode("Description");
            descriptionH5Element.appendChild(descriptionH5Text);


            let descriptionPElement = document.createElement("p");
            descriptionPElement.className = "card-text";
            let pText = document.createTextNode(recipe[0].RECIPE_PREPARATION);
            descriptionPElement.appendChild(pText);

            let descriptionDivElement = document.createElement("div");
            descriptionDivElement.className = "text-left";

            theadTrElement.appendChild(theadIngredientThElement);
            theadTrElement.appendChild(theadAmountThElement);
            theadTrElement.appendChild(theadUnitThElement);
            theadElement.appendChild(theadTrElement);
            tableElement.appendChild(theadElement);
            tableElement.appendChild(tbodyElement);
            divElement.appendChild(tableElement);
            descriptionDivElement.appendChild(descriptionH5Element);
            descriptionDivElement.appendChild(descriptionPElement);
            divElement.appendChild(descriptionDivElement);
            document.getElementById("viewRecipeModalBody").appendChild(divElement);

            $("#viewRecipeModal").modal('show');
        }

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

async function deleteRecipe(id) {

    await fetch('http://localhost:8080/recipes/' + id, {
        'method': 'DELETE',
        'headers': {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (response.ok) {
            document.getElementById("recipeTableBody").innerHTML = "";
            showRecipes();
        } else {
            throw new Error('Something went wrong');
        }
    }).catch((error) => {
        $("#errorDeleteRecipeModal").modal('show');
    });
}
