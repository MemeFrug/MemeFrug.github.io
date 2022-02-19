if (window.localStorage == undefined) {
    while (window.localStorage == undefined) {
        alert("Your browser does not support localStorage, therefore cannot save, please switch browsers")
    }
}

// let _Save = {
//     saveData: {
//         // ["LoadinAnimSeen"]: false,
//     },
//     Save: () => {
//         window.localStorage.setItem("StoryGameSaveData", JSON.stringify(_Save.saveData))
//     },
//     Load: () => {
//         const saveData = window.localStorage.getItem("StoryGameSaveData")
//         if (!saveData) {
//             console.log("No Save Found, Creating a new save");
//             _Save.Save()
//             _Save.Load()
//         } else {
//             console.log("Save Found, Overiting Save Object");
//             _Save.saveData = JSON.parse(saveData)
//         }
//     },
//     UpdateSave: (Variable, Value, CreateNew) => {
//         if (CreateNew) {
//             if (typeof(Variable) !== "string"){
//                 console.error("Variable Parameter is Not A String");
//                 return false
//             }

//             _Save.saveData[Variable] = Value
//             return true
//         }
//         if (typeof(Variable) !== "string"){
//             console.error("Variable Parameter is Not A String");
//             return false
//         }
//         if (_Save.saveData[Variable] == undefined) {
//             console.error("Variable Parameter Does not exist in saveData");
//             return false
//         }
//         _Save.saveData[Variable] = Value
//         return true
//     }
// }