//Onload

//const socket = io("42.241.255.248:8081");
	const socket = io("localhost:8081", {});

window.onload = () => {
	socket.emit('ping')
	socket.on("disconnect", () => {
		document.getElementById("sk-chase").style.display = 'inherit';
		document.getElementById('SIO').style.display = 'inherit'
		document.getElementById('Login').disabled = true
		document.getElementById('CA').disabled = true
	});
	socket.once('pong', () => {
		document.getElementById("sk-chase").style.display = 'none';
		document.getElementById('CTS').style.display = 'none'
		document.getElementById('Login').disabled = false
		document.getElementById('CA').disabled = false
	})
	socket.io.on('reconnect_error', () => {
		document.getElementById("sk-chase").style.display = 'inherit';
		document.getElementById('SIO').style.display = 'inherit'
		document.getElementById('CTS').style.display = 'none'
	})
	socket.io.on("reconnect", () => {
		document.getElementById("sk-chase").style.display = 'none';
		document.getElementById('SIO').style.display = 'none'
		document.getElementById('Login').disabled = false
		document.getElementById('CA').disabled = false
	  });
}

//Functions for the Fourm
function a() {
	whatclicked = 1;
}
function b() {
	whatclicked = 0;
} 


let whatclicked;

function StartGame() {
	document.getElementsByName("submit").disabled = "true";
	document.getElementById("nac").style.display = "none";
	document.getElementById("aca").style.display = "none";

	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	const color2 = [...color.children].find((c) => c.checked).value;

	if (socket.connected) {
		console.log("connected with server");

		if (whatclicked == 1) {
			socket.emit("signup", {
				username: username,
				password: password,
				color: color2
			});
		} else {
			socket.emit("login", {
				username: username,
				password: password,
				color: color2
			});
		}	
	}

	socket.on("delete", () => {
		localStorage.setItem("usernameRPG", username);
		localStorage.setItem("passwordRPG", password);
		localStorage.setItem("colorRPG", color2);
		localStorage.setItem("isSinglePlayerRPG", false)
		socket.disconnect();
		window.location.reload();
	});

	socket.on("error", (e) => {
		//If There is an error
		if (e == "nac") {
			document.getElementById("nac").style.display = "inherit";
		}
		if (e == "aca") {
			document.getElementById("aca").style.display = "inherit";
		}
		if (e == "ali") {
			document.getElementById("ali").style.display = "inherit";
		}
		console.log("Recieved an error");
		document.getElementsByName("submit").disabled = "false";
		socket.disconnect();
	});
}
