//Getting Update Details for the Notes Div
var url = "./Updates/Website/updatedetails.txt";
let reader = new FileReader();

fetch(url).then((response) => {
	response.text().then((text) => {
		var Notes = document.getElementById("Notes");
		Notes.innerHTML = Notes.innerHTML + "\n" + text;
	});
});
//------------------
