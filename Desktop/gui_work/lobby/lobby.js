

var testFuncs = {}
var Events = {}

Events.Subscribe = function (name, func) {
    testFuncs[name] = function (...Args) {
        return func(...Args)
    }
}
Events.Call = function (name, ...Args) {
    console.log(name, Args)
}


const Time_remaining_div = document.getElementById("time_remaining")

let start_time = 0
let time_full = 0
let Time_remaining_interval = null

function UpdateTimeRemaining() {
    let time_remaining = Math.round((time_full - (Date.now() - start_time)) / 1000)
    if (time_remaining < 0) {
        time_remaining = 0
        clearInterval(Time_remaining_interval);
        Time_remaining_interval = null
    }
    Time_remaining_div.innerHTML = time_remaining
}

Events.Subscribe("InitLobby", function (time) {
    start_time = Date.now()
    time_full = time

    UpdateTimeRemaining()
    if (Time_remaining_interval) {
        clearInterval(Time_remaining_interval)
    }
    Time_remaining_interval = setInterval(UpdateTimeRemaining, 1000)
})


const Teams_container_div = document.getElementById("teams_container")

let selected_team = 0
let selected_div = null

Events.Subscribe("RegisterTeam", function (team_id, max_size) {
    let item_container = document.createElement("button")
    item_container.classList.add("grid_item_container")
    item_container.id = "team_" + team_id
    item_container.dataset.max_size = max_size

    item_container.onmouseenter = function () {
        if (selected_div == null) {
            item_container.classList.add("grid_item_hover")
        }
    }

    item_container.onmouseleave = function () {
        if (selected_div != item_container) {
            item_container.classList.remove("grid_item_hover")
        }
    }

    item_container.onclick = function () {
        if (selected_div == item_container) {
            selected_div = null
            selected_team = 0
            return
        }

        if (selected_div) {
            selected_div.classList.remove("grid_item_hover")
        }
        selected_div = item_container
        selected_team = team_id
        item_container.classList.add("grid_item_hover")
    }

    let team_header = document.createElement("div")
    team_header.classList.add("grid_item_header")
    team_header.innerText = "Team " + team_id

    item_container.appendChild(team_header)

    Teams_container_div.appendChild(item_container)
})


let PlayersTeams = {}

Events.Subscribe("PlayerJoinTeam", function (team_id, player_id, player_name) {
    PlayerLeaveTeam(player_id)

    let team_div = document.getElementById("team_" + team_id)
    let player_div = document.createElement("div")
    player_div.classList.add("grid_item_element")
    player_div.id = "teams_team_player_" + player_id
    player_div.innerText = player_name
    team_div.appendChild(player_div)

    if (team_div.children.length - 1 >= team_div.dataset.max_size) {
        team_div.children[0].innerText = "Team " + team_id + " FULL"
    }

    PlayersTeams[player_id] = team_id
})

function PlayerLeaveTeam(player_id) {
    if (PlayersTeams[player_id]) {
        let old_team_id_div = document.getElementById("team_" + PlayersTeams[player_id])
        let ply_element = document.getElementById("teams_team_player_" + player_id)
        old_team_id_div.removeChild(ply_element)

        if (old_team_id_div.children.length - 1 == old_team_id_div.dataset.max_size - 1) {
            old_team_id_div.children[0].innerText = "Team " + PlayersTeams[player_id]
        }

        let team_player_div = document.getElementById("team_player_" + player_id)
        if (team_player_div) {
            team_players_container.removeChild(team_player_div)
        }
    }
}
Events.Subscribe("PlayerLeaveTeam", PlayerLeaveTeam)

const Join_Team_Button = document.getElementById("join_team_btn")
Join_Team_Button.onclick = function () {
    if (selected_team == 0) {
        return
    }
    if (selected_div.children.length - 1 >= selected_div.dataset.max_size) {
        return
    }
    Events.Call("LobbyJoinTeam", selected_team)

    SwitchToMainMenu()
}

let lobby_ready = false

const ready_btn = document.getElementById("ready_btn")
ready_btn.onclick = function () {
    lobby_ready = !lobby_ready
    Events.Call("LobbyReady", lobby_ready)

    if (lobby_ready) {
        ready_btn.classList.add("ready_btn_ready")
    } else {
        ready_btn.classList.remove("ready_btn_ready")
    }
}

const back_button = document.getElementById("back_button")
const teams_window_button = document.getElementById("teams_window_button")
const character_window_button = document.getElementById("character_window_button")

const team_players_container = document.getElementById("team_players_container")
const loadout_container = document.getElementById("loadout_container")

function SwitchToMainMenu() {
    Teams_container_div.classList.add("hidden")
    join_team_btn.classList.add("hidden")
    back_button.classList.add("hidden")

    teams_window_button.classList.remove("hidden")
    character_window_button.classList.remove("hidden")
    team_players_container.classList.remove("hidden")
    loadout_container.classList.remove("hidden")
    ready_btn.classList.remove("hidden")
}
back_button.onclick = SwitchToMainMenu
Events.Subscribe("SwitchToMainMenu", SwitchToMainMenu)

function SwitchToTeamsMenu() {
    Teams_container_div.classList.remove("hidden")
    join_team_btn.classList.remove("hidden")
    back_button.classList.remove("hidden")

    teams_window_button.classList.add("hidden")
    character_window_button.classList.add("hidden")
    team_players_container.classList.add("hidden")
    loadout_container.classList.add("hidden")
    ready_btn.classList.add("hidden")
}
teams_window_button.onclick = SwitchToTeamsMenu

function SwitchToTeamsMenu_RESET() {
    Teams_container_div.classList.remove("hidden")
    join_team_btn.classList.remove("hidden")

    back_button.classList.add("hidden")

    teams_window_button.classList.add("hidden")
    character_window_button.classList.add("hidden")
    team_players_container.classList.add("hidden")
    loadout_container.classList.add("hidden")
    ready_btn.classList.add("hidden")

    let length = Teams_container_div.children.length
    for (let i = 0; i < length; i++) {
        if (Teams_container_div.children[0]) {
            Teams_container_div.removeChild(Teams_container_div.children[0])
        }
    }

    length = team_players_container.children.length
    for (let i = 0; i < length; i++) {
        if (team_players_container.children[0]) {
            team_players_container.removeChild(team_players_container.children[0])
        }
    }

    length = loadout_container.children.length
    for (let i = 0; i < length; i++) {
        if (loadout_container.children[0]) {
            loadout_container.removeChild(loadout_container.children[0])
        }
    }

    ready_btn.classList.remove("ready_btn_ready")
    lobby_ready = false

    PlayersTeams = {}

    selected_team = 0
    selected_div = null
}
Events.Subscribe("LobbyReset", SwitchToTeamsMenu_RESET)

function ShowLoadoutForTeamPlayer(item_container, loadout) {
    let loadout_tbl = JSON.parse(loadout)
    for (let i = 0; i < loadout_tbl.length; i++) {
        let loadout_item = loadout_tbl[i]
        let loadout_item_div = document.createElement("div")
        loadout_item_div.classList.add("grid_item_element")
        loadout_item_div.innerText = loadout_item
        item_container.appendChild(loadout_item_div)
    }
}

Events.Subscribe("RegisterPlayerInTeam", function (player_name, player_id, loadout) {
    let item_container = document.createElement("button")
    item_container.classList.add("flex_item_container")
    item_container.id = "team_player_" + player_id

    let team_player_header = document.createElement("div")
    team_player_header.classList.add("grid_item_header")
    team_player_header.innerText = player_name

    item_container.appendChild(team_player_header)

    ShowLoadoutForTeamPlayer(item_container, loadout)

    team_players_container.appendChild(item_container)
})

Events.Subscribe("UpdateTeamPlayerLoadout", function (player_id, loadout) {
    let team_player_div = document.getElementById("team_player_" + player_id)

    let look_at_id = 0

    let length = team_player_div.children.length // store length into variable or else it will change during loop
    for (let i = 0; i < length; i++) {
        let loadout_item_div = team_player_div.children[look_at_id]
        if (loadout_item_div && loadout_item_div.classList.contains("grid_item_element")) {
            team_player_div.removeChild(loadout_item_div)
        } else {
            look_at_id++
        }
    }

    ShowLoadoutForTeamPlayer(team_player_div, loadout)
})

Events.Subscribe("RemoveTeamPlayer", function (player_id) {
    let team_player_div = document.getElementById("team_player_" + player_id)
    if (team_player_div) {
        team_players_container.removeChild(team_player_div)
    }
})

Events.Subscribe("ResetPlayersInCurrentTeam", function () {
    length = team_players_container.children.length
    for (let i = 0; i < length; i++) {
        if (team_players_container.children[0]) {
            team_players_container.removeChild(team_players_container.children[0])
        }
    }
})

Events.Subscribe("AddLoadoutSelector", function (loadout_part, loadout_slot_json, selected_item) {
    let loadout_slot_tbl = JSON.parse(loadout_slot_json)

    let loadout_slot_container = document.createElement("div")
    loadout_slot_container.classList.add("select_grid_item_container")

    let loadout_slot_header = document.createElement("div")
    loadout_slot_header.classList.add("grid_item_header")
    loadout_slot_header.innerText = loadout_part

    loadout_slot_container.appendChild(loadout_slot_header)

    let loadout_slot_selector = document.createElement("select")
    loadout_slot_selector.classList.add("grid_item_selector")

    loadout_slot_container.appendChild(loadout_slot_selector)

    let selectr = new Selectr(loadout_slot_selector, { searchable: false, customClass: "selectr_custom_styling" })

    for (let i = 0; i < loadout_slot_tbl.length; i++) {
        let loadout_slot_option = loadout_slot_tbl[i]

        /*let loadout_slot_option_element = document.createElement("option")
        loadout_slot_option_element.value = loadout_slot_option
        loadout_slot_option_element.innerText = loadout_slot_option*/

        selectr.add({ value: loadout_slot_option, text: loadout_slot_option });

        if (loadout_slot_option == selected_item) {
            //loadout_slot_option_element.selected = true
            selectr.setValue(loadout_slot_option)
        }

        //loadout_slot_selector.appendChild(loadout_slot_option_element)
    }

    loadout_container.appendChild(loadout_slot_container)

    /*loadout_slot_selector.onchange = function() {
        Events.Call("UpdateLoadoutSlot", loadout_part, loadout_slot_selector.value)
    }*/

    selectr.on('selectr.change', function (option) {
        Events.Call("UpdateLoadoutSlot", loadout_part, option.value)
    });
})

mousePosition = {
    createEvents() {
        document.onmousemove = handleMouseMove;
        function handleMouseMove(event) {
            const mouseOffset = {x:0,y:0}
            const mouseIntensity = {x:-0.01,y:-0.01}

            const mousePos = {
                x: event.pageX * mouseIntensity.x + mouseOffset.x,
                y: event.pageY * mouseIntensity.y + mouseOffset.y
            };

            document.getElementById("body").style.marginLeft = `${mousePos.x}px`
            document.getElementById("body").style.marginTop = `${mousePos.y}px`
            console.log(mousePos);
        }
    }
}

//Smooth Horizontal Scrolling
function horizontalWheel(container) {
    /** Max `scrollLeft` value */
    let scrollWidth;

    /** Desired scroll distance per animation frame */
    let getScrollStep = () => scrollWidth / 50;

    /** Target value for `scrollLeft` */
    let targetLeft;

    let oldTimeStamp = 0
    let deltaTime = 0

    function scrollLeft(timeStamp) {
        deltaTime = (timeStamp - oldTimeStamp) / 1000; //Algorithm To Get DeltaTime
        let beforeLeft = container.scrollLeft;
        let wantDx = getScrollStep();
        let diff = targetLeft - container.scrollLeft;
        let dX = wantDx >= Math.abs(diff) ? diff : Math.sign(diff) * wantDx;

        // Performing horizontal scroll
        container.scrollBy(dX, 0);

        // Break if smaller `diff` instead of `wantDx` was used
        if (dX === diff)
            return;

        // Break if can't scroll anymore or target reached
        if (beforeLeft === container.scrollLeft || container.scrollLeft === targetLeft)
            return;

        requestAnimationFrame(scrollLeft);
    }

    container.addEventListener('wheel', e => {
        e.preventDefault();

        scrollWidth = (container.scrollWidth - container.clientWidth);
        targetLeft = (Math.min(scrollWidth, Math.max(0, container.scrollLeft + e.deltaY)));

        requestAnimationFrame(scrollLeft);
    });
}

//Initialize horizontal team scroll

window.addEventListener('load', () => {
    let list = document.getElementById('team_players_container');
    horizontalWheel(list);
});

mousePosition.createEvents()








function TestFunctions() {
    testFuncs.InitLobby(60000)

    testFuncs.RegisterTeam(1, 4)
    testFuncs.RegisterTeam(2, 10)
    testFuncs.RegisterTeam(3, 4)
    testFuncs.RegisterTeam(4, 4)
    testFuncs.RegisterTeam(5, 4)
    testFuncs.RegisterTeam(6, 4)
    testFuncs.RegisterTeam(7, 4)
    testFuncs.RegisterTeam(8, 4)
    testFuncs.RegisterTeam(9, 4)
    testFuncs.RegisterTeam(10, 4)

    testFuncs.PlayerJoinTeam(1, 1, "Voltaism")
    testFuncs.PlayerJoinTeam(1, 2, "Syed")
    testFuncs.PlayerJoinTeam(1, 3, "Timmy")
    testFuncs.PlayerJoinTeam(1, 7, "Syed2")
    testFuncs.PlayerJoinTeam(1, 8, "Syed3")
    testFuncs.PlayerJoinTeam(2, 10, "Voltaism")
    testFuncs.PlayerJoinTeam(2, 11, "Voltaism")
    testFuncs.PlayerJoinTeam(2, 12, "Voltaism")
    testFuncs.PlayerJoinTeam(2, 14, "Voltaism")
    testFuncs.PlayerJoinTeam(2, 15, "Voltaism")
    testFuncs.PlayerJoinTeam(2, 5, "MemeFrug")
    testFuncs.PlayerJoinTeam(2, 8, "Syed3")
    testFuncs.PlayerJoinTeam(2, 6, "Olivato")
    testFuncs.PlayerJoinTeam(3, 4, "DasDarki")
    testFuncs.PlayerJoinTeam(4, 6, "Olivato")


    testFuncs.RegisterPlayerInTeam("Voltaism", 1, '["AK47", "M1911", "Hammer", "Auto Turret"]')
    testFuncs.RegisterPlayerInTeam("Syed", 2, '["Azd", "M1912", "Knife", "Bio Tracker"]')
    testFuncs.RegisterPlayerInTeam("Olivato", 3, '["Azd", "M1912", "Knife", "Bio Tracker"]')
    testFuncs.RegisterPlayerInTeam("DGS", 4, '["Azd", "M1912", "Knife", "Bio Tracker"]')
    testFuncs.RegisterPlayerInTeam("AF", 5, '["Azd", "M1912", "Knife", "Bio Tracker"]')
    testFuncs.RegisterPlayerInTeam("56", 6, '["Azd", "M1912", "Knife", "Bio Tracker"]')
    testFuncs.RegisterPlayerInTeam("56", 7, '["Azd", "M1912", "Knife", "Bio Tracker"]')
    testFuncs.RemoveTeamPlayer(3)
    testFuncs.UpdateTeamPlayerLoadout(6, '["GZG", "GQ", "GSD", "Auto SG"]')

    testFuncs.AddLoadoutSelector("Primary", '["AK47", "M4A1"]', "AK47")
    testFuncs.AddLoadoutSelector("Secondary", '["SHOTGUN", "UZI"]', "SHOTGUN")
    testFuncs.AddLoadoutSelector("Melee", '["Hammer", "Knife"]', "Hammer")
    testFuncs.AddLoadoutSelector("Special", '["Turret", "Bio Tracker"]', "Bio Tracker")
}

// setTimeout(function() { testFuncs.LobbyReset();  TestFunctions()}, 10000)
TestFunctions()
