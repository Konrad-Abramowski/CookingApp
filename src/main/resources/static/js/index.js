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
    const root = document.getElementById('recipeList')
    const recipes = (await postIngredients()).sort(compareMISSING_INGREDIENTS)
    const orderKeyEnum = (key) => {
        switch (key.toLowerCase()) {
            case 'ingredient':
                return 'ingredient_name'
            case 'amount':
                return 'number'
            case 'unit':
                return 'unit'
            default:
                throw Error('Bad order key')
        }
    }

    /* Clear previous recipes */
    while (root.firstChild) {
        root.firstChild.remove()
    }

    /* Build new recipes */
    for (const recipeData of recipes) {
        /* Parse response data */
        const dataOrderKeys = ['Ingredient', 'Amount', 'Unit']
        const mealData = recipeData[recipeData.length - 1]
        const ingredients = [...recipeData]
        ingredients.pop()

        /* Container */
        const recipeContainer = document.createElement('div')
        recipeContainer.className = 'col-sm-4'

        /* Card */
        const recipeCard = document.createElement('div')
        recipeCard.className = 'card overflow-auto p-2 m-1'

        /* Heading */
        const headingElement = document.createElement('h4')
        headingElement.className = 'card-title text-center font-weight-bold'
        headingElement.textContent = mealData.RECIPE_NAME
        recipeCard.appendChild(headingElement)

        /* Ingredients table */
        const tableElement = document.createElement('table')
        tableElement.className = 'table'
        recipeCard.appendChild(tableElement)

        /* Table head */
        const theadElement = document.createElement('thead')
        const theadTrElement = document.createElement('tr')

        tableElement.appendChild(theadElement)
        theadElement.appendChild(theadTrElement)

        /* Titles */
        for (const headingText of dataOrderKeys) {
            const theadIngredientThElement = document.createElement('th')

            theadIngredientThElement.scope = 'col'
            theadIngredientThElement.textContent = headingText

            theadTrElement.appendChild(theadIngredientThElement)
        }

        /* Table body */
        const tbodyElement = document.createElement('tbody')
        tableElement.appendChild(tbodyElement)

        /* Build ingredients */
        for (const ingredient of ingredients) {
            const ingredientRow = document.createElement('tr')
            for (const value of dataOrderKeys) {
                const tableDataElement = document.createElement('td')
                tableDataElement.textContent = String(ingredient[orderKeyEnum(value).toUpperCase()])
                ingredientRow.appendChild(tableDataElement)
            }
            tbodyElement.appendChild(ingredientRow)
        }

        /* Additional content */
        const additionalContentConfig = [{
            tag: 'h5',
            className: 'font-weight-bold',
            content: 'Description'
        }, {
            tag: 'p',
            className: 'card-text',
            content: mealData.RECIPE_PREPARATION
        }, {
            tag: 'h5',
            className: 'font-weight-bold',
            content: 'MISSING INGREDIENTS: '+ mealData.MISSING_INGREDIENTS
        }]
        for (const config of additionalContentConfig) {
            const additionalElement = document.createElement(config.tag)
            additionalElement.className = config.className
            additionalElement.textContent = config.content
            recipeCard.appendChild(additionalElement)
            recipeContainer.appendChild(recipeCard)
        }

        root.appendChild(recipeContainer)
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

