fetch('http://localhost:8080/ingredients')
    .then(result => result.json())
    .then(data => {
        console.log(data)
        let dataArray = [];
        for(let i in data){
            dataArray.push(data[i]);
        }
        console.log(dataArray);

        for(let i in dataArray){
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


