function dev(a) {
	switch (a) {
		case 1:
            localStorage.removeItem("usernameRPG");
            localStorage.removeItem("passwordRPG");
            localStorage.removeItem("colorRPG");
			localStorage.removeItem("isSinglePlayerRPG")
			window.location.reload();
			break;
	}
}

function singleplayer(username = 'undefined', password = 'undefined', color = 'blue') {
	localStorage.setItem("usernameRPG", username.toString())
	localStorage.setItem("passwordRPG", password.toString())
	localStorage.setItem("colorRPG", color.toString())
	localStorage.setItem("isSinglePlayerRPG", true)
	window.location.reload()
}