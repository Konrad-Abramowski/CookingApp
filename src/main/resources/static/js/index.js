fetch('http://localhost:8080/ingredients')
    .then(result => result.json())
    .then(data => {
        let dataArray = [];
        for (let i in data) {
            dataArray.push(data[i]);
        }
        for (let i in dataArray) {
            let divElement = document.createElement("div");
            let inputElement = document.createElement("input");
            inputElement.type = "checkbox";
            inputElement.class = "custom-checkbox";
            inputElement.id = dataArray[i].id;
            let labelElement = document.createElement("label");
            let labelText = document.createTextNode(dataArray[i].name);
            labelElement.appendChild(labelText);
            divElement.appendChild(inputElement);
            divElement.appendChild(labelElement);
            document.getElementById("ingredientsForm").appendChild(divElement);
        }
    })


async function postIngredients() {
    const data = {
        ids: Array.prototype.slice
            .call(document.querySelectorAll('input:checked[type="checkbox"]')).map((inputElement) => inputElement.id)
    }
    const response = await fetch('http://localhost:8080/recipes/find', {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(data)
    })
    return response.json();
}

async function showAvailableRecipes() {
    document.getElementById("recipeList").innerHTML = "";
    let recipes = [];
    recipes = await postIngredients();
    console.log(recipes);
    recipes.sort(compareMISSING_INGREDIENTS);
    console.log(recipes);
    for (let i in recipes) {
        let divElement = document.createElement("div");
        divElement.className = "col-sm-4";

        let innerDivElement = document.createElement("div");
        innerDivElement.className = "card overflow-auto p-2 m-2";

        let h4Element = document.createElement("h4");
        h4Element.className = "card-title text-center font-weight-bold";
        let h4Text = document.createTextNode(recipes[i][recipes[i].length - 1].RECIPE_NAME);
        h4Element.appendChild(h4Text);

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

        for (let j in recipes[i]) {

        }

        for (let j in recipes[i]) {
            if (j != recipes[i].length - 1) {
                let trElement = document.createElement("tr");

                let ingredientTdElement = document.createElement("td");
                let ingredientTdText = document.createTextNode(recipes[i][j].INGREDIENT_NAME);
                ingredientTdElement.appendChild(ingredientTdText);

                let amountTdElement = document.createElement("td");
                let amountTdText = document.createTextNode(recipes[i][j].NUMBER);
                amountTdElement.appendChild(amountTdText);

                let unitTdElement = document.createElement("td");
                let unitTdText = document.createTextNode(recipes[i][j].UNIT);
                unitTdElement.appendChild(unitTdText);

                trElement.appendChild(ingredientTdElement);
                trElement.appendChild(amountTdElement);
                trElement.appendChild(unitTdElement);
                tbodyElement.appendChild(trElement);
            }
        }
        let descriptionH5Element = document.createElement("h5");
        descriptionH5Element.className = "font-weight-bold";
        let descriptionH5Text = document.createTextNode("Description");
        descriptionH5Element.appendChild(descriptionH5Text);


        let descriptionPElement = document.createElement("p");
        descriptionPElement.className = "card-text";
        let pText = document.createTextNode(recipes[i][recipes[i].length - 1].RECIPE_PREPARATION);
        descriptionPElement.appendChild(pText);

        let missingIngredientsH5Element = document.createElement("h5");
        missingIngredientsH5Element.className = "font-weight-bold";
        let missingIngredientsH5Text = document.createTextNode("Missing ingredients: " + recipes[i][recipes[i].length - 1].MISSING_INGREDIENTS);
        missingIngredientsH5Element.appendChild(missingIngredientsH5Text);

        innerDivElement.appendChild(h4Element);
        theadTrElement.appendChild(theadIngredientThElement);
        theadTrElement.appendChild(theadAmountThElement);
        theadTrElement.appendChild(theadUnitThElement);
        theadElement.appendChild(theadTrElement);
        tableElement.appendChild(theadElement);
        tableElement.appendChild(tbodyElement);
        innerDivElement.appendChild(tableElement);
        innerDivElement.appendChild(descriptionH5Element);
        innerDivElement.appendChild(descriptionPElement);
        innerDivElement.appendChild(missingIngredientsH5Element);
        divElement.appendChild(innerDivElement);

        document.getElementById("recipeList").appendChild(divElement);
    }
}

function compareMISSING_INGREDIENTS(a, b) {
    if (a[a.length - 1].MISSING_INGREDIENTS < b[b.length - 1].MISSING_INGREDIENTS) {
        return -1
    }
    if (b[b.length - 1].MISSING_INGREDIENTS > a[a.length - 1].MISSING_INGREDIENTS) {
        return 1
    }
    return 0
}

