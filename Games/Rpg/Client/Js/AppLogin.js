//Definition of username,password,and color are at where it detects if localstorage username is undefined or not
function Login() {
	if (issingleplayer) return;

	//const socket = io("42.241.255.248:8081");
	const socket = io("localhost:8081");//CHANGE THIS TO PRODUCTION

	socket.once("connect", () => {
		console.log("connected with server");

		socket.emit("login", {
			username: username,
			password: password,
			color: color
		});
	});

	// socket.once("connect_error", () => {
	// 	document.getElementById("ServerDown").style.display = "inherit";
	// });

	socket.once("error", (e) => {
		if (e == 'nac') {
			dev(1)
		}
	})

	socket.once("delete", () => {
		console.log('succesfully logged in');
	});
}