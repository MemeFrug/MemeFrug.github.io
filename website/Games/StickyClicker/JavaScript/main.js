//Unshow Elements
document.getElementById("Unshown1").style.display = "none"
document.getElementById("DEBT").style.display = "none"
document.getElementById("DEBT2").style.display = "none"
var BuyPaperAuto = document.getElementById("autobuypaper")
BuyPaperAuto.style.display = "none"

//RandomInt
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

    //Buttons and detecting when clicked
var BuyPaperBut = document.getElementById("autobuy");
BuyPaperBut.addEventListener('click', toggleWireBuyer);

var buypaperbut = document.getElementById("buypaper");
buypaperbut.addEventListener('click', buypaper);

var stickybut = document.getElementById("stickynotesbut");
stickybut.addEventListener('click', addstickynotes);

var marketinglvlbut = document.getElementById("marketingbut");
marketinglvlbut.addEventListener('click', marketing);

var autosnippersbut = document.getElementById("autosnippers1");
autosnippersbut.addEventListener('click', autosnippers);

var adsbut = document.getElementById("adupgrade");
adsbut.addEventListener('click', adsbuy)

let Shown1 = false;
    //Stickyness
var stickynessbut = document.getElementById("stickyness");

    //UI Variables
var priceofnotesid = document.getElementById("priceofnotes");
var totalnotesid = document.getElementById("notes");
var unsoldstickynotesid = document.getElementById("unsoldstickynotes");
var amtofmoneyid = document.getElementById("money");
var marketinglvlid = document.getElementById("marketingamount");
var autosnipperid = document.getElementById("autosnippersamt");
var stickynessid = document.getElementById("stickynessid");
var paperid = document.getElementById("amountofpaper");
var papercosts = document.getElementById("howmuchpapercosts");
var treeskilled = document.getElementById("amount of trees killed");
var column2 = document.getElementById("column2");
var autopaperid = document.getElementById("autobuypaperonoroff");
var adsid = document.getElementById("amountofads")

//Variables for clicker
let hasboughtAds = 0; //False
let adscost = 6; //Dollars
let adsamount = 0;

let hasboughtwireBuyer = 0;
let wireBuyerStatus = 0;

let isindebt = false;
let isoverdue = false;

let treeskilledamt = 0.1;

let paperamt = 1000; //Cm
let paperamteachbuy = 1000;
let papercost = 0.20;//Dollar

let stickynesscost = 5;//Dollars
let stickynesslvl = 0;

let autosnipperslvl = 0;
let autosnipperscost = 1; //Dollar
let autosnippersspeed = 3000;//Seconds
let autosnipperstrue = true;

let marketingcost = 0.30; //Cents
let marketinglvl = 0;
let marketingspeed = 5000;

let amountofmoney = 0;
let priceofnotes = 0.05; //cents

let unsoldstickynotes = 0;
let totalmadenotes = 0;

let isindarkmode = false;

let AmountofIntervals = 0;

function setspeed(speedofsell) {
    AmountofIntervals = AmountofIntervals + 1;
    let setspeed1 = setInterval(sellnotes, speedofsell)
    clearInterval(setspeed1)
    setspeed1 = setInterval(sellnotes, speedofsell)
}

//Functions for clicker

//Saving/Loading

if (localStorage.getItem("saveGame") != null) {
    console.log('Found save file')
    load();
} else {
    console.log('There is no Save File')
    save()
    console.log('Created one')
    setspeed(marketingspeed)
}

//Saving
function save() {

    var projectsUses = [];
    var projectsActive = [];

for (var i = 0; i < projects.length; i++) {

    projectsUses[i] = projects[i].uses;

}

for (var i = 0; i < activeProjects.length; i++) {

    projectsActive[i] = activeProjects[i].id;

}

    console.log('Saving Session');
    let saveGame = {
        isindebt: isindebt,
        isoverdue: isoverdue,
        hasboughtwireBuyer: hasboughtwireBuyer,
            wireBuyerStatus: wireBuyerStatus,
            amountofmoney: amountofmoney,
            unsoldstickynotes: unsoldstickynotes,
            treeskilledamt: treeskilledamt,
            marketinglvl: marketinglvl,
            marketingcost: marketingcost,
            totalmadenotes: totalmadenotes,
            stickynesscost: stickynesscost,
            stickynesslvl: stickynesslvl,
            autosnipperslvl: autosnipperslvl,
            autosnipperscost: autosnipperscost,
            autosnippersspeed: autosnippersspeed,
            paperamt: paperamt,
        papercost: papercost,
        hasboughtAds: hasboughtAds,
        adscost: adscost,
        adsamount: adsamount,
        marketingspeed: marketingspeed,
        paperamteachbuy: paperamteachbuy
    }

    localStorage.setItem("isindarkmode", JSON.stringify(isindarkmode));

    localStorage.setItem("saveGame", JSON.stringify(saveGame));
    localStorage.setItem("saveProjectsUses", JSON.stringify(projectsUses));
    localStorage.setItem("saveProjectsActive", JSON.stringify(projectsActive));
        //LoadProjects


    
}
//Loading
function load() {
        console.log('Loading Save')

        var isindarkmodeload = eval(localStorage.getItem("isindarkmode"))
        var loadGame = JSON.parse(localStorage.getItem("saveGame"));
        var loadProjectsUses = JSON.parse(localStorage.getItem("saveProjectsUses"));
        var loadProjectsActive = JSON.parse(localStorage.getItem("saveProjectsActive"));
        //Setting Variables

        hasboughtwireBuyer = loadGame.hasboughtwireBuyer;
        wireBuyerStatus = loadGame.wireBuyerStatus;
        amountofmoney = loadGame.amountofmoney;
        unsoldstickynotes = loadGame.unsoldstickynotes;
        treeskilledamt = loadGame.treeskilledamt;
        marketinglvl = loadGame.marketinglvl;
        marketingcost = loadGame.marketingcost;
        totalmadenotes = loadGame.totalmadenotes;
        stickynesscost = loadGame.stickynesscost;
        stickynesslvl = loadGame.stickynesslvl;
        autosnipperslvl = loadGame.autosnipperslvl;
        autosnipperscost = loadGame.autosnipperscost;
        autosnippersspeed = loadGame.autosnippersspeed;
        paperamt = loadGame.paperamt;
        papercost = loadGame.papercost;
        isindarkmode = isindarkmodeload;
    hasboughtAds = loadGame.hasboughtAds;
    adscost = loadGame.adscost;
    adsamount = loadGame.adsamount;
    marketingspeed = loadGame.marketingspeed;
    paperamteachbuy = loadGame.paperamteachbuy;

        //Fixing up ui and gameplay elements
        if (hasboughtAds == 1) {
            document.getElementById("adupgradeshow").style.display = "inherit"
            if (adscost == null) {
                adsbut.textContent = 'MAX'
                adscost = Infinity
            } else {
                adsbut.textContent = '$' + adscost;
            }
        }

        if (hasboughtwireBuyer == 1) {
            document.getElementById("autobuypaper").style.display = "inherit"
            if (wireBuyerStatus == 1) {
                autopaperid.innerHTML = "ON";
            } else {
                autopaperid.innerHTML = "OFF";
            }
        }

        for (var i = 0; i < (stickynesslvl / 10); i++) {
            console.log('updating price of notes ' + (i + 1) + ' times')
            priceofnotes = priceofnotes + 0.02
            priceofnotesid.textContent = priceofnotes.toFixed(2)
        }

        if (stickynesscost == null) {
            stickynessbut.textContent = 'MAX'
            stickynesscost = Infinity
        } else {
            stickynessbut.textContent = '$' + stickynesscost
        }

        if (isindarkmode == true) {
            document.body.classList.toggle("dark-mode")
        }

        if (marketingcost == null) {
            marketinglvlbut.textContent = 'MAX'
        } else {
            marketinglvlbut.textContent = '$' + marketingcost.toFixed(2)
        }

        for (let i = 0; i < autosnipperslvl; i++) {
            setTimeout(function () {
                console.log('enabled ' + (i + 1) + ' times')
                setInterval(autosnippersmain, autosnippersspeed)
            }, getRndInteger(100, 3000))
        }

        for (let i = 0; i < marketinglvl; i++) {
            setTimeout(function () {
                console.log('set speed ' + (i + 1) + ' times')
                setspeed(marketingspeed)
            }, getRndInteger(100, 3000))
        }

        for (var i = 0; i < projects.length; i++) {

            projects[i].uses = loadProjectsUses[i];

        }

        for (var i = 0; i < projects.length; i++) {

            if (loadProjectsActive.indexOf(projects[i].id) >= 0) {
                LoadProjects(projects[i])
                activeProjects.push(projects[i]);
            }

        }

        //Refreshing UI elements
    refreshIntervals();
        refresh();
    }

// Slow Loop (mainly for saving)

var saveTimer = 0;

window.setInterval(function () {

    // Auto-Save

    saveTimer++;
    if (saveTimer >= 250) {
        save()
        saveTimer = 0;
    }


}, 100);

//Refreshes Content for UI variables
function refresh() {
    //Normal Elements
    priceofnotesid.textContent = priceofnotes.toFixed(2)
    totalnotesid.textContent = totalmadenotes;
    unsoldstickynotesid.textContent = unsoldstickynotes;
    amtofmoneyid.textContent = amountofmoney.toFixed(2)
    marketinglvlid.textContent = marketinglvl;
    autosnipperid.textContent = autosnipperslvl;
    stickynessid.textContent = stickynesslvl;
    paperid.textContent = paperamt;
    papercosts.textContent = '$' + papercost.toFixed(2);
    treeskilled.textContent = treeskilledamt.toFixed(1);
    adsid.textContent = adsamount;

    //Buttons
    autosnippersbut.textContent = '$' + autosnipperscost
}

function reset() {
    localStorage.removeItem("saveGame");
    localStorage.removeItem("saveProjectsUses");
    localStorage.removeItem("saveProjectsActive");
    location.reload();
}

    //End of Save/Load

function refreshIntervals() {
    setTimeout(function () {
        for (var i = 0; i < AmountofIntervals; i++) {
            clearInterval(sellnotes)
        }
    }, getRndInteger(100, 3000))
    setTimeout(function() {
        for (var i = 0; i < AmountofIntervals; i++) {
            setInterval(sellnotes, marketingspeed)
        }
    }, getRndInteger(100, 3000))
}

function adsbuy() {
    if (adsamount >= 10) {
        console.log("At maximun amount of ads")
        amountofmoney = amountofmoney - adscost
        adscost = Infinity
        adsbut.textContent = 'MAX';
        adsamount = adsamount + 1;
        adsid.textContent = adsamount;
        //Effects
        marketingspeed = marketingspeed - 100
        refreshIntervals()
    }
    if (adsamount < 10) {
        console.log("Bought an ad")
        amountofmoney = amountofmoney - adscost
        adscost = adscost + 5
        adsbut.textContent = '$' + adscost;
        adsamount = adsamount + 1;
        adsid.textContent = adsamount;
        //Effects
        marketingspeed = marketingspeed - 100
        refreshIntervals()
    }

}

    function buypaper() {
        amountofmoney = amountofmoney - papercost
        paperamt = paperamt + paperamteachbuy;
        paperid.textContent = paperamt
        treeskilledamt = treeskilledamt + (paperamteachbuy/10000);
        treeskilled.textContent = treeskilledamt.toFixed(1)
    }

    //Autosnippers
    function autosnippers() {
        if (autosnipperslvl >= 100) {
            autosnipperslvl = autosnipperslvl + 1;
            amountofmoney = amountofmoney - autosnipperscost
            autosnipperid.textContent = autosnipperslvl
            autosnipperscost = autosnipperscost * 2;
            autosnippersbut.textContent = '$' + autosnipperscost
            setInterval(autosnippersmain, autosnippersspeed)
        }

        if (autosnipperslvl < 100) {
            autosnipperslvl = autosnipperslvl + 1;
            amountofmoney = amountofmoney - autosnipperscost
            autosnipperid.textContent = autosnipperslvl
            autosnipperscost = autosnipperscost + 2;
            autosnippersbut.textContent = '$' + autosnipperscost
            setInterval(autosnippersmain, autosnippersspeed)

        }
    }

    function autosnippersmain() {
        if (autosnipperstrue == true) {
            unsoldstickynotes = unsoldstickynotes + 1
            totalmadenotes = totalmadenotes + 1
            unsoldstickynotesid.textContent = unsoldstickynotes
            totalnotesid.textContent = totalmadenotes
            paperamt = paperamt - 10
            paperid.textContent = paperamt
        } else {
            console.log('Dont have enough paper')
        }
    }

    //DETECTING IF REQUIREMENTS MEET
    setInterval(function UPDATE() {
        //Marketing lvl
        if (amountofmoney >= marketingcost) {
            marketinglvlbut.disabled = false;
        }
        if (amountofmoney < marketingcost) {
            marketinglvlbut.disabled = true;
        }
        //Autosnippers lvl
        if (amountofmoney >= autosnipperscost) {
            autosnippersbut.disabled = false;
        }
        if (amountofmoney < autosnipperscost) {
            autosnippersbut.disabled = true;
        }
        if (amountofmoney >= stickynesscost) {
            stickynessbut.disabled = false;
        }
        //Stickyness lvl
        if (amountofmoney < stickynesscost) {
            stickynessbut.disabled = true;
        }
        //UpdateMoney
        amtofmoneyid.textContent = amountofmoney.toFixed(2)
        //EndofUpdateMoney

        //Check the Amount of paper
        if (amountofmoney >= papercost) {
            buypaperbut.disabled = false;
        }
        if (amountofmoney < papercost) {
            buypaperbut.disabled = true;
        }

        //Checks if got enough paper
        if (paperamt <= 0) {
            stickybut.disabled = true;
            autosnipperstrue = false
        }
        if (paperamt > 0) {
            stickybut.disabled = false;
            autosnipperstrue = true
        }

        //Updating if DEBT
        if (amountofmoney < papercost & paperamt <= 0) {
            buypaperbut.disabled = false;
        }
        if (amountofmoney < 0) {
            document.getElementById("DEBT").style.display = "inherit"
            isindebt = true;
        }
        if (isindebt == true & amountofmoney >= 0) {
            isindebt = false;
            document.getElementById("DEBT").style.display = "none"
        }

        //IsinDarkMode
        var element = document.body;
        if (element.classList == "dark-mode") {
            isindarkmode = true;
        } else {
            isindarkmode = false;
        }

        //Checking if low amount of sticky notes for price of paper
        let onlydonce = false
        let onlydonce2 = false;
        if (totalmadenotes >= 300 && onlydonce == false) {
            papercost = 0.40;
            papercosts.textContent = '$' + papercost.toFixed(2)

        }
        if (onlydonce2 == false && totalmadenotes >= 1000) {
            papercost = 1;
            papercosts.textContent = '$' + papercost.toFixed(2)
        }

        //if overused paper
        if (paperamt < 0) {
            document.getElementById("DEBT2").style.display = "inherit"
            isoverdue = true;
        }
        if (isoverdue == true & paperamt >= 0) {
            isoverdue = false;
            document.getElementById("DEBT2").style.display = "none"
        }

        if (wireBuyerStatus == 1 && paperamt <= 0) {
            buypaper()
        }

        //If has enought money
        if (amountofmoney >= adscost) {
            adsbut.disabled = false;
        } else {
            adsbut.disabled = true;
        }

        manageProjects();

    }, 10)

    //AutoBuyPaper
    function toggleWireBuyer() {
        if (wireBuyerStatus == 1) {
            wireBuyerStatus = 0;
            autopaperid.innerHTML = "OFF";
        } else {
            wireBuyerStatus = 1;
            autopaperid.innerHTML = "ON";
        }
    }
    var blinkCounter = 0

    //BLINK
    function blink(element) {

        {
            var handle = setInterval(function () { toggleVisibility(element) }, 30);
        }

        function toggleVisibility(element) {
            blinkCounter = blinkCounter + 1;

            if (blinkCounter >= 12) {
                clearInterval(handle);
                blinkCounter = 0;
                element.style.visibility = "visible";
            } else {
                if (element.style.visibility != "hidden") {
                    element.style.visibility = "hidden";
                } else {
                    element.style.visibility = "visible";
                }
            }
        }

    }

    function manageProjects() {

        for (var i = 0; i < projects.length; i++) {
            if (projects[i].trigger() && (projects[i].uses > 0)) {
                LoadProjects(projects[i]);
                projects[i].uses = projects[i].uses - 1;
                activeProjects.push(projects[i]);
            }
        }


        for (var i = 0; i < activeProjects.length; i++) {
            if (activeProjects[i].cost()) {
                activeProjects[i].element.disabled = false;
            } else {
                activeProjects[i].element.disabled = true;
            }
        }
    }

    //LoadProjects
    function LoadProjects(Project1) {
        Project1.element = document.createElement("button");
        Project1.element.setAttribute("id", Project1.id);

        Project1.element.onclick = function () { Project1.effect() };

        Project1.element.setAttribute("class", "projectButton");
        ProjectsListTop.appendChild(Project1.element, ProjectsListTop.firstChild);

        var span = document.createElement("span");
        span.style.fontWeight = "bold";
        Project1.element.appendChild(span);

        var title = document.createTextNode(Project1.Title);
        span.appendChild(title);

        var cost = document.createTextNode(Project1.priceTag);
        Project1.element.appendChild(cost);

        var div = document.createElement("div");
        Project1.element.appendChild(div);

        var description = document.createTextNode(Project1.Description);
        Project1.element.appendChild(description);

        blink(Project1.element)
    }

    setInterval(function checkforcolumn2() {
        if (totalmadenotes >= 900) {
            column2.style.display = 'inherit'
            clearInterval(checkforcolumn2)
        }
    }, 1000)

    var shown1var = setInterval(checkshown1, 500);
    function checkshown1() {
        if (totalmadenotes >= 200) {
            Shown1 = true
        }
        if (Shown1 == true) {
            //Buttons
            stickynessbut.addEventListener('click', Stickyness);
            document.getElementById("Unshown1").style.display = "inherit"
            //clearCheck
            clearInterval(shown1var)
        }
    }

    //Stickyness
    function Stickyness() {
        if (stickynesslvl < 100) {
            priceofnotes = priceofnotes + 0.02
            priceofnotesid.textContent = priceofnotes.toFixed(2)
            stickynesslvl = stickynesslvl + 10
            amountofmoney = amountofmoney - stickynesscost
            stickynesscost = stickynesscost + 5
            stickynessbut.textContent = '$' + stickynesscost
            stickynessid.textContent = stickynesslvl
        }
        if (stickynesslvl >= 100) {
            stickynesscost = Infinity
            stickynessbut.textContent = 'MAX'
            stickynessid.textContent = stickynesslvl
        }
    }

    //MARKETING
    function marketing() {
        if (marketinglvl >= 40 && marketinglvl < 100) {
            marketinglvl = marketinglvl + 1;
            amountofmoney = amountofmoney - marketingcost;
            marketinglvlid.textContent = marketinglvl;
            setspeed(marketingspeed)
            marketingcost = marketingcost + 3.30;
            marketinglvlbut.textContent = '$' + marketingcost.toFixed(2)
        }
        if (marketinglvl >= 11 && marketinglvl < 40) {
            marketinglvl = marketinglvl + 1;
            amountofmoney = amountofmoney - marketingcost;
            marketinglvlid.textContent = marketinglvl;
            setspeed(marketingspeed)
            marketingcost = marketingcost + 1.30;
            marketinglvlbut.textContent = '$' + marketingcost.toFixed(2)
        }
        if (marketinglvl < 11) {
            marketinglvl = marketinglvl + 1;
            amountofmoney = amountofmoney - marketingcost;
            marketinglvlid.textContent = marketinglvl;
            setspeed(marketingspeed)
            marketingcost = marketingcost + 0.80;
            marketinglvlbut.textContent = '$' + marketingcost.toFixed(2)
        }
        if (marketinglvl >= 100) {
            marketinglvl = marketinglvl + 1;
            amountofmoney = amountofmoney - marketingcost;
            marketinglvlid.textContent = marketinglvl;
            marketingcost = Infinity;
            marketinglvlbut.textContent = 'MAX'
        }
    }

    //Add sticky notes
    function addstickynotes() {
        totalmadenotes = totalmadenotes + 1;
        totalnotesid.textContent = totalmadenotes
        unsoldstickynotes = unsoldstickynotes + 1;
        unsoldstickynotesid.textContent = unsoldstickynotes
        paperamt = paperamt - 10;
        paperid.textContent = paperamt
    }

    //sell notes
    function sellnotes() {
        if (unsoldstickynotes > 0) {
            unsoldstickynotes = unsoldstickynotes - 1;
            unsoldstickynotesid.textContent = unsoldstickynotes
            amountofmoney = amountofmoney + priceofnotes
        }
    }
    //Money
    function addmoney(amount) {
        amountofmoney = amountofmoney + amount
}
