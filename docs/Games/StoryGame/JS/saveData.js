if (window.localStorage == undefined) {
    while (window.localStorage == undefined) {
        alert("Your browser does not support localStorage, therefore cannot save, for a better experience please switch browsers")
    }
}

let save = {
    Save: () => {
        window.localStorage.setItem("StoryGameSaveData", JSON.stringify(save.saveData))
    },
    Load: () => {
        const saveData = window.localStorage.getItem("StoryGameSaveData")
        if (!saveData) {
            console.log("No Save Found, Creating a new save");
            save.Load()
        } else {
            save.saveData = JSON.parse(saveData)
        }
    },
    saveData: {
        LoadinAnimSeen: false,
    }
}