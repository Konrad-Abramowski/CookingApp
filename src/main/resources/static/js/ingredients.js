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

            let tdElement = document.createElement("td");
            let tdText = document.createTextNode(counter++);
            tdElement.appendChild(tdText);

            let nameTdElement = document.createElement("td");
            let nameTdText = document.createTextNode(dataArray[i].name);
            nameTdElement.appendChild(nameTdText);

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
            trElement.appendChild(actionTdElement);
            document.getElementById("ingredientTableBody").appendChild(trElement);
        }
    })