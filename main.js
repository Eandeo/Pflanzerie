//function for changing the sun and watering can if selected
function onRadioImgClick(imgType) {
	if (settingsIsClicked === true) {
		setRadioAmount(imgType);
		//hier muss noch der Wert im JSON überschrieben werden.
	}
}

function getRadioValue(imgType) {
	const radioValue = document.querySelector('input[name="' + imgType + 'Amount"]:checked').value;
	console.log("getRadiofunction gets " + radioValue);
	return radioValue;
}
//sets the amount of selected amounts x/5
function setRadioAmount(imgType) {
	const amount = getRadioValue(imgType);

	for (var i = 1; i <= amount; i++) {
		document.getElementById(imgType + "-amount-" + i).classList.add("drinkcardSelected");
		document.getElementById(imgType + "-amount-" + i).classList.remove("drinkcardUnselected");
	}
	for (var i = 5; i > amount; i--) {
		document.getElementById(imgType + "-amount-" + i).classList.replace("drinkcardSelected", "drinkcardUnselected");
	}
	console.log(imgType + "Amount is " + i);
}

//change the symbol of the settings button when clicked + sets the change mode
let settingsIsClicked = false;
function changeSettings() {
	if (!settingsIsClicked) {
		document.getElementById("settings").classList.replace("settingsOn", "settingsClose");
		
		settingsIsClicked = true;
	} else {
		document.getElementById("settings").classList.replace("settingsClose", "settingsOn");
		settingsIsClicked = false;
	}
	const noHover = document.querySelectorAll(".cardRadios");
	noHover.forEach(noHover => {
		noHover.classList.toggle("noHover");
	});
}

function showAddPlantForm(status) {
	/*if (status) {
		document.getElementById("plantForm").classList.remove("plantFormHidden");
		setRadiosToThree();
		console.log("Show add form");
	} else {
		document.getElementById("plantForm").classList.add("plantFormHidden");
	}*/
	
	addNewPlantCard();
}

//Submiting the addPlantForm 
let plantForm = document.getElementById("plantForm");

plantForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const plantName = document.getElementById("plant-name").value;
	const plantRoom = document.getElementById("plant-room").value;
	const plantWater = document.querySelector('input[name="formWaterAmount"]:checked').value;
	const plantLight = document.querySelector('input[name="formLightAmount"]:checked').value;
	const plantDescription = document.getElementById("form-plant-description").value;

	const newPlantdata = {
		"name": plantName,
		"room": plantRoom,
		"waterAmount": plantWater,
		"lightAmount": plantLight,
		"description": plantDescription
	};

	const newPlantJson = JSON.stringify(newPlantdata);
	console.log(newPlantJson);

	e.target.reset();
	document.getElementById("plantForm").classList.add("plantFormHidden");
	
	addNewPlantCard();
	
	//Überschreibt das erste Card "Friedenslilie"
	/*document.getElementById("name").innerHTML = newPlantdata["name"];
	document.getElementById("about").innerHTML = newPlantdata["description"];
	document.getElementById("input-water-amount-" + newPlantdata["waterAmount"]).checked = true;
	setRadioAmount('water');
	document.getElementById("input-light-amount-" + newPlantdata["lightAmount"]).checked = true;
	setRadioAmount('light');
	*/

});



//object for 1st plant
const plant1 = {
	id: 1,
	name: "Friedenslilie",
	room: "Wohnzimmer",
	img: "plants/einblatt.jpg",
	waterAmount: 5,
	lightAmount: 4,
	description: "Das Einblatt ist wegen ihrer kleinen weißen Blüten sehr beliebt. Dieser Pflanze wird in Deutschland auch Scheidenblatt, Friedenslilie, Blattfahne oder Spathiphyllum genannt. Die Spathiphyllum kommt ursprünglich aus Brasilien. Die Pflanzenfamilie ist Araceae."
}
//loads data for 1st plant
document.getElementById("name").innerHTML = plant1["name"];
document.getElementById("about").innerHTML = plant1["description"];
document.getElementById("plantPic").src = "plants/einblatt.jpg";
document.getElementById("input-water-amount-" + plant1["waterAmount"]).checked = true;
setRadioAmount('water');
document.getElementById("input-light-amount-" + plant1["lightAmount"]).checked = true;
setRadioAmount('light');

//sets the watering cans and suns in the newPlantForm to 3/5
function setRadiosToThree(){
	document.getElementById("form-input-water-amount-3").checked = true;
	setRadioAmount('formWater');
	document.getElementById("form-input-light-amount-3").checked = true;
	setRadioAmount('formLight');
}
//adds a new PlantCard --- currently when "addButton" is clicked --- later with form submit
function addNewPlantCard(){
	const card = document.createElement("div");
	card.classList.add("card");
	document.body.appendChild(card);
	
	const cardHeading = document.createElement("div");
	cardHeading.classList.add("card-heading");
	card.appendChild(cardHeading);
	
	const plantName = document.createElement("h2");
	const textPlantName = document.createTextNode("neuePflanze"); //hier später aus Formular laden
	plantName.appendChild(textPlantName);
	cardHeading.appendChild(plantName);
	
	const cardSettings = document.createElement("button");
	cardSettings.classList.add("settingsOn");
	cardSettings.setAttribute("onClick", "changeSettings()");
	cardHeading.appendChild(cardSettings);
	
	const smallCard = document.createElement("div");
	smallCard.classList.add("small-card");
	card.appendChild(smallCard);
	
	const plantPic = document.createElement("img");
	plantPic.src = "plants/standardPlant.jpg" //hier später aus Formular laden
	plantPic.classList.add("cardpics");
	smallCard.appendChild(plantPic);
	
	const waterSunList = document.createElement("ul");
	waterSunList.classList.add("cc-selector");
	waterSunList.classList.add("main-plant-propertys");
	smallCard.appendChild(waterSunList);
	
	const amountRadios = document.createElement("li");
	amountRadios.classList.add("amount-radios");
	waterSunList.appendChild(amountRadios);
	
	const radioDiv = document.createElement("div");
	radioDiv.classList.add("radios");
	amountRadios.appendChild(radioDiv);
	
	for(let i = 1; i<=5; i++){
	const radio = document.createElement("input");
	radio.type ="radio";
	radio.setAttribute("onChange","onRadioImgClick('water')")
	radio.name = "waterAmount";
	radio.id = "input-water-amount-"+i+"-append"
	let aria_label;
	switch(i){
		case "1": aria_label = "sehr wenig Wasser";
		case "2": aria_label = "wenig Wasser";
		case "3": aria_label = "mittel viel Wasser";
		case "4": aria_label = "viel Wasser";
		case "5": aria_label = "sehr viel Wasser";
		break;
	}
	radio.setAttribute("aria-label",aria_label);
	radio.value = i;
	radioDiv.appendChild(radio);
	
	const radioLabel = document.createElement("label");
	radioLabel.id="water-amount-"+i+"-append"
	radioLabel.setAttribute("for", "input-water-amount-"+i+"-append");
	radioLabel.classList.add("wateringCans", "drinkcard-cc", "noHover", "cardRadios");
	radioDiv.appendChild(radioLabel);
	}
	
	
	
	
	
	

	


	
	


}

