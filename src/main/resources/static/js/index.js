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
        divElement.className = "card";
        divElement.style = "width: 18rem";

        let innerDivElement = document.createElement("div");
        innerDivElement.className = "card-body";

        let h5Element = document.createElement("h5");
        h5Element.className = "card-title";
        let h5Text = document.createTextNode(recipes[i][recipes[i].length - 1].RECIPE_NAME);
        h5Element.appendChild(h5Text);

        let ulElement = document.createElement("ul");
        for (let j in recipes[i]) {
            if (j != recipes[i].length - 1) {
                let liElement = document.createElement("li");
                let liText = document.createTextNode(recipes[i][j].INGREDIENT_NAME);
                liElement.appendChild(liText);
                ulElement.appendChild(liElement);
            }
        }
        let pElement = document.createElement("p");
        pElement.className = "card-text";
        let pText = document.createTextNode(recipes[i][recipes[i].length - 1].RECIPE_PREPARATION);
        pElement.appendChild(pText);

        let aElement = document.createElement("a");

        let secondAElement = document.createElement("a");

        innerDivElement.appendChild(h5Element);
        innerDivElement.appendChild(ulElement);
        innerDivElement.appendChild(pElement);
        innerDivElement.appendChild(aElement);
        innerDivElement.appendChild(secondAElement);
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

