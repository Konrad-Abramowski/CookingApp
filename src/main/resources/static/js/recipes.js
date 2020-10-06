document.addEventListener("DOMContentLoaded", showRecipes);

document.getElementById("addRecipeSaveButton").onclick = addRecipeOnClick = async () => {
    await fetch('http://localhost:8080/recipes', {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*'
        },
        'body': JSON.stringify({
            "name": document.getElementById("addRecipeName").value,
            "preparation": document.getElementById("addRecipeDescription").value
        })
    })
        .then(response => response.json())
        .then((data) => {
            let id = data.id;
            const checkedIngredients = {
                ids: Array.prototype.slice
                    .call(document.querySelectorAll('input:checked[type="checkbox"]')).map((ingredient) => ingredient.id)
            }

            console.log(checkedIngredients.ids)

            for (let i of checkedIngredients.ids) {
                console.log(i)
                const select = document.getElementById(i + "unit")
                let unit = select.options[select.selectedIndex].value
                console.log(unit)
                let number = document.getElementById(i + "number").value;

                fetch('http://localhost:8080/recipes/' + id + '?unit=' + unit + '&number=' + number + '&ingredientId=' + i, {
                    'method': 'POST',
                    'headers': {
                        'Content-Type': 'application/json'
                    }
                })
            }
        });
    location.reload()
};

$('#addRecipeModal').on('shown.bs.modal', async function () {
    document.getElementById("ingredientList").innerHTML = "";

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
    let theadAmountThText = document.createTextNode("Unit");
    theadAmountThElement.scope = "col";
    theadAmountThElement.appendChild(theadAmountThText);

    let theadUnitThElement = document.createElement("th");
    let theadUnitThEText = document.createTextNode("Number");
    theadUnitThElement.scope = "col";
    theadUnitThElement.appendChild(theadUnitThEText);

    let tbodyElement = document.createElement("tbody");
    tbodyElement.id = "addIngredientsTBody";

    theadTrElement.appendChild(theadIngredientThElement);
    theadTrElement.appendChild(theadAmountThElement);
    theadTrElement.appendChild(theadUnitThElement);
    theadElement.appendChild(theadTrElement);
    tableElement.appendChild(theadElement);
    divElement.appendChild(tableElement);

    document.getElementById("ingredientList").appendChild(divElement);

    const ingredients = await getIngredients();

    for (let i in ingredients) {

        let trElement = document.createElement("tr");

        let ingredientTdElement = document.createElement("td");
        let ingredientListLabelElement = document.createElement("label");
        ingredientListLabelElement.htmlFor = ingredients[i].id;
        ingredientListLabelElement.className = "mr-2";
        ingredientListLabelElement.textContent = ingredients[i].name;

        let ingredientListInputElement = document.createElement("input");
        ingredientListInputElement.type = "checkbox";
        ingredientListInputElement.id = ingredients[i].id;
        ingredientListInputElement.className = "custom-checkbox";
        ingredientTdElement.appendChild(ingredientListLabelElement);
        ingredientTdElement.appendChild(ingredientListInputElement);

        let amountTdElement = document.createElement("td");
        amountTdElement.style.width = "6rem";
        let ingredientListSelectElement = document.createElement("select");
        ingredientListSelectElement.className = "browser-default custom-select mx-1";
        ingredientListSelectElement.id = ingredients[i].id + "unit";

        let unitOption = document.createElement("option");
        unitOption.selected = "";
        unitOption.text = "Unit";

        let unitOptionG = document.createElement("option");
        unitOptionG.text = "G";
        unitOptionG.value = "G";

        let unitOptionDAG = document.createElement("option");
        unitOptionDAG.text = "DAG";
        unitOptionDAG.value = "DAG";

        let unitOptionKG = document.createElement("option");
        unitOptionKG.text = "KG";
        unitOptionKG.value = "KG";

        let unitOptionML = document.createElement("option");
        unitOptionML.text = "ML";
        unitOptionML.value = "ML";

        let unitOptionL = document.createElement("option");
        unitOptionL.text = "L";
        unitOptionL.value = "L";


        ingredientListSelectElement.appendChild(unitOption);
        ingredientListSelectElement.appendChild(unitOptionG);
        ingredientListSelectElement.appendChild(unitOptionDAG);
        ingredientListSelectElement.appendChild(unitOptionKG);
        ingredientListSelectElement.appendChild(unitOptionML);
        ingredientListSelectElement.appendChild(unitOptionL);
        amountTdElement.appendChild(ingredientListSelectElement);

        let unitTdElement = document.createElement("td");
        let ingredientListNumberInputElement = document.createElement("input");
        ingredientListNumberInputElement.type = "text";
        unitTdElement.style.width = "8rem";
        ingredientListNumberInputElement.placeholder = "Number";
        ingredientListNumberInputElement.className = "form-control"
        ingredientListNumberInputElement.id = ingredients[i].id + "number";
        unitTdElement.appendChild(ingredientListNumberInputElement);

        trElement.appendChild(ingredientTdElement);
        trElement.appendChild(amountTdElement);
        trElement.appendChild(unitTdElement);
        tbodyElement.appendChild(trElement);
    }
    tableElement.appendChild(tbodyElement);

});

async function getIngredients() {
    const response = await fetch('http://localhost:8080/ingredients', {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json'
        }
    })
    return response.json();
}

async function showRecipes() {
    let result = [];

    result = await getRecipes();

    let dataArray = [];
    for (let i in result) {
        dataArray.push(result[i]);
    }

    let counter = 1;
    let deleteOnClick;
    let editOnClick;
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
        descriptionTdElement.className = "overflow-auto";
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
        actionUpdateButtonElement.onclick = editOnClick = () => showUpdateRecipeModal(dataArray[i].id);
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

async function showUpdateRecipeModal(id) {

    document.getElementById("updateIngredientList").innerHTML = "";

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
    let theadAmountThText = document.createTextNode("Unit");
    theadAmountThElement.scope = "col";
    theadAmountThElement.appendChild(theadAmountThText);

    let theadUnitThElement = document.createElement("th");
    let theadUnitThEText = document.createTextNode("Number");
    theadUnitThElement.scope = "col";
    theadUnitThElement.appendChild(theadUnitThEText);

    let tbodyElement = document.createElement("tbody");
    tbodyElement.id = "addIngredientsTBody";

    theadTrElement.appendChild(theadIngredientThElement);
    theadTrElement.appendChild(theadAmountThElement);
    theadTrElement.appendChild(theadUnitThElement);
    theadElement.appendChild(theadTrElement);
    tableElement.appendChild(theadElement);
    divElement.appendChild(tableElement);

    document.getElementById("updateIngredientList").appendChild(divElement);

    const ingredients = await getIngredients();

    for (let i in ingredients) {

        let trElement = document.createElement("tr");

        let ingredientTdElement = document.createElement("td");
        let ingredientListLabelElement = document.createElement("label");
        ingredientListLabelElement.htmlFor = ingredients[i].id;
        ingredientListLabelElement.className = "mr-2";
        ingredientListLabelElement.textContent = ingredients[i].name;

        let ingredientListInputElement = document.createElement("input");
        ingredientListInputElement.type = "checkbox";
        ingredientListInputElement.id = ingredients[i].id;
        ingredientListInputElement.className = "custom-checkbox";
        ingredientTdElement.appendChild(ingredientListLabelElement);
        ingredientTdElement.appendChild(ingredientListInputElement);

        let amountTdElement = document.createElement("td");
        amountTdElement.style.width = "6rem";
        let ingredientListSelectElement = document.createElement("select");
        ingredientListSelectElement.className = "browser-default custom-select mx-1";
        ingredientListSelectElement.id = ingredients[i].id + "unit";

        let unitOption = document.createElement("option");
        unitOption.selected = "";
        unitOption.text = "Unit";

        let unitOptionG = document.createElement("option");
        unitOptionG.text = "G";
        unitOptionG.value = "G";

        let unitOptionDAG = document.createElement("option");
        unitOptionDAG.text = "DAG";
        unitOptionDAG.value = "DAG";

        let unitOptionKG = document.createElement("option");
        unitOptionKG.text = "KG";
        unitOptionKG.value = "KG";

        let unitOptionML = document.createElement("option");
        unitOptionML.text = "ML";
        unitOptionML.value = "ML";

        let unitOptionL = document.createElement("option");
        unitOptionL.text = "L";
        unitOptionL.value = "L";


        ingredientListSelectElement.appendChild(unitOption);
        ingredientListSelectElement.appendChild(unitOptionG);
        ingredientListSelectElement.appendChild(unitOptionDAG);
        ingredientListSelectElement.appendChild(unitOptionKG);
        ingredientListSelectElement.appendChild(unitOptionML);
        ingredientListSelectElement.appendChild(unitOptionL);
        amountTdElement.appendChild(ingredientListSelectElement);

        let unitTdElement = document.createElement("td");
        let ingredientListNumberInputElement = document.createElement("input");
        ingredientListNumberInputElement.type = "text";
        unitTdElement.style.width = "8rem";
        ingredientListNumberInputElement.placeholder = "Number";
        ingredientListNumberInputElement.className = "form-control"
        ingredientListNumberInputElement.id = ingredients[i].id + "number";
        unitTdElement.appendChild(ingredientListNumberInputElement);

        trElement.appendChild(ingredientTdElement);
        trElement.appendChild(amountTdElement);
        trElement.appendChild(unitTdElement);
        tbodyElement.appendChild(trElement);
    }
    tableElement.appendChild(tbodyElement);

    $("#updateRecipeModal").modal('show');

    let recipeToUpdate = await getRecipe(id);

    // fill the modal

    document.getElementById("updateRecipeName").value = recipeToUpdate[0].RECIPE_NAME

    document.getElementById("updateRecipeDescription").value = recipeToUpdate[0].RECIPE_PREPARATION

    for(let i of recipeToUpdate){
        if( document.getElementById(i.INGREDIENT_ID)){
            document.getElementById(i.INGREDIENT_ID).checked = true
        }
        if( document.getElementById(i.INGREDIENT_ID + "unit")){
            console.log(i.UNIT)
            document.getElementById(i.INGREDIENT_ID + "unit").value = i.UNIT
        }
        if( document.getElementById(i.INGREDIENT_ID + "number")){
            document.getElementById(i.INGREDIENT_ID + "number").value = i.NUMBER
        }
    }

    document.getElementById("updateRecipeSaveButton").onclick = updateRecipeOnClick = () => updateRecipe(id);

}

async function updateRecipe(id) {

    const allIngredients = await getIngredients();

    let ingredientsToUpdate = [];

    for(let i of allIngredients){
        if( document.getElementById(i.id)){
            if(document.getElementById(i.id).checked){
                let ingredientToUpdate ={
                    id: i.id,
                    unit: document.getElementById(i.id + "unit").value,
                    number: parseInt(document.getElementById(i.id + "number").value)
                }
               ingredientsToUpdate.push(ingredientToUpdate);
            }
        }
    }

    await fetch('http://localhost:8080/recipes/' + id, {
        'method': 'PUT',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            "recipe_info": {
                "name": document.getElementById("updateRecipeName").value,
                "preparation": document.getElementById("updateRecipeDescription").value
            },
            "ingredients": ingredientsToUpdate
        })
    }).then((response) => {
        if (response.ok) {
            $("#updateRecipeModal").modal('hide');
            location.reload()
        }
    });
}
