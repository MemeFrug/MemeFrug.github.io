let username = "";

function Save(time) {
    const PastData = localStorage.getItem("MidgitJumperTimes");
    let NewData = JSON.parse(PastData);
    if (NewData != null) {
        for (let i = 0; i < NewData.length; i++) {
            if (NewData[i].username == username) {
                NewData[i].time = time
                break;
            }else if (i == NewData.length - 1){
                NewData.push({username: username, time: time});
                break;
            }
        }

    } else {
        NewData = [
            {
                "username": username,
                "time": time
            }
        ];
    }

    localStorage.setItem("MidgitJumperTimes", JSON.stringify(NewData));
}

function LoadData() {
    return localStorage.getItem("MidgitJumperTimes");
}