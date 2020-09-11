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

            let nameTdElement = document.createElement("td");
            let nameTdText = document.createTextNode(dataArray[i].name);
            nameTdElement.appendChild(nameTdText);

            trElement.appendChild(thElement);
            trElement.appendChild(nameTdElement);
            document.getElementById("ingredientTableBody").appendChild(trElement);
        }
    })