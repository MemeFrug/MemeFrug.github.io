
//These are the Projects (or infomation for main.js)
//THis is the template
//var project*num* = {
//  id: "",
//  Title: "",
//  uses:1,
//  cost: function() {return },
//  trigger: function() {return },
//  Description: "",
//  priceTag: " ($ )"
//  effect: function () {

//  }
//}

console.log('Loaded Projects File')

//Variables
var projects = [];
var activeProjects = [];

//AUTOBUY
var project1 = {
    id: "projectButton1",
    Title: "AutoBuy",
    uses: 1,
    cost: function() {return amountofmoney >= 5},
    trigger: function() {return totalmadenotes>=900},
    Description: "Makes a button to turn on and off autobuy for paper",
    priceTag: " ($5)",
    effect: function () {
        amountofmoney = amountofmoney - 5
        amtofmoneyid.textContent = amountofmoney;

        //effects
        hasboughtwireBuyer = 1; // True
        document.getElementById("autobuypaper").style.display = "inherit"

        project1.element.parentNode.removeChild(project1.element);
        var index = activeProjects.indexOf(project1);
        activeProjects.splice(index, 1);
    }

}

projects.push(project1)

var project2 = {
    id: "projectButton2",
    Title: "Tv PartnerShip",
    uses: 1,
    cost: function() {return amountofmoney >= 6 },
    trigger: function() {return marketinglvl >= 13 },
    Description: "Buy Ads to speed up Sells from marketing",
    priceTag: " ($6)",
    effect: function () {
        amountofmoney = amountofmoney - 6;

        //effects
        hasboughtAds = 1; //True
        document.getElementById("adupgradeshow").style.display = "inherit"

        project2.element.parentNode.removeChild(project2.element);
        var index = activeProjects.indexOf(project2);
        activeProjects.splice(index, 1);
    }
}

projects.push(project2)

var project3 = {
    id:'projectButton3',
    Title:'Good Deals',
    uses: 1,
    cost: function() {return paperamt >= 10000},
    trigger: function() {return totalmadenotes >= 1000 },
    Description: "Increase the amount of paper you get for the same price",
    priceTag: " (10000 paper)",
    effect: function () {
        paperamt = paperamt - 10000
        paperid.textContent = paperamt

        paperamteachbuy = paperamteachbuy + 2000

        project3.element.parentNode.removeChild(project3.element);
        var index = activeProjects.indexOf(project3);
        activeProjects.splice(index, 1);
    }
}

projects.push(project3)