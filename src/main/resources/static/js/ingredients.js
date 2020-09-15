fetch('http://localhost:8080/ingredients')
    .then(result => result.json())
    .then(data => {
        let dataArray = [];
        for (let i in data) {
            dataArray.push(data[i]);
        }
        console.log(dataArray);
        let counter = 1;
        for (let i in dataArray) {
            let trElement = document.createElement("tr");

            let thElement = document.createElement("th");
            let thText = document.createTextNode(counter++);
            thElement.scope = "row";
            thElement.appendChild(thText);

            let nameThElement = document.createElement("th");
            let nameThText = document.createTextNode(dataArray[i].name);
            nameThElement.appendChild(nameThText);

            let actionThElement = document.createElement("th");

            let actionDeleteAElement = document.createElement("a");
            actionDeleteAElement.className = "badge badge-danger p-2 mr-1";
            actionDeleteAElement.text = "Delete";
            actionThElement.appendChild(actionDeleteAElement);

            let actionUpdateAElement = document.createElement("a");
            actionUpdateAElement.className = "badge badge-success p-2 mr-1";
            actionUpdateAElement.text = "Edit";
            actionThElement.appendChild(actionUpdateAElement);


            trElement.appendChild(thElement);
            trElement.appendChild(nameThElement);
            trElement.appendChild(actionThElement);
            document.getElementById("ingredientTableBody").appendChild(trElement);
        }
    })