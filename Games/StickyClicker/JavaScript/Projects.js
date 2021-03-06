console.log("Loaded Projects File");
var projects = [],
    activeProjects = [],
    project1 = {
        id: "projectButton1",
        Title: "AutoBuy",
        uses: 1,
        cost: function () {
            return amountofmoney >= 5;
        },
        trigger: function () {
            return totalmadenotes >= 900;
        },
        Description: "Makes a button to turn on and off autobuy for paper",
        priceTag: " ($5)",
        effect: function () {
            (amountofmoney -= 5), (amtofmoneyid.textContent = amountofmoney), (hasboughtwireBuyer = 1), (document.getElementById("autobuypaper").style.display = "inherit"), project1.element.parentNode.removeChild(project1.element);
            var e = activeProjects.indexOf(project1);
            activeProjects.splice(e, 1);
        },
    };
projects.push(project1);
var project2 = {
    id: "projectButton2",
    Title: "Tv PartnerShip",
    uses: 1,
    cost: function () {
        return amountofmoney >= 6;
    },
    trigger: function () {
        return marketinglvl >= 13;
    },
    Description: "Buy Ads to speed up Sells from marketing",
    priceTag: " ($6)",
    effect: function () {
        (amountofmoney -= 6), (hasboughtAds = 1), (document.getElementById("adupgradeshow").style.display = "inherit"), project2.element.parentNode.removeChild(project2.element);
        var e = activeProjects.indexOf(project2);
        activeProjects.splice(e, 1);
    },
};
projects.push(project2);
var project3 = {
    id: "projectButton3",
    Title: "Good Deals",
    uses: 1,
    cost: function () {
        return paperamt >= 1e4;
    },
    trigger: function () {
        return totalmadenotes >= 1e3;
    },
    Description: "Increase the amount of paper you get for the same price",
    priceTag: " (10000 paper)",
    effect: function () {
        (paperamt -= 1e4), (paperid.textContent = paperamt), (paperamteachbuy += 2e3), project3.element.parentNode.removeChild(project3.element);
        var e = activeProjects.indexOf(project3);
        activeProjects.splice(e, 1);
    },
};
projects.push(project3);
var project4 = {
    id: "projectButton4",
    Title: "This Makes the game Fun",
    uses: 1,
    cost: function () {
        return amountofmoney >= 100000;
    },
    trigger: function () {
        return totalmadenotes >= 1e3;
    },
    Description: "yes",
    priceTag: " (100000 money)",
    effect: function () {
        (paperamt -= 1e4), (paperid.textContent = paperamt), (paperamteachbuy += 2e3), project4.element.parentNode.removeChild(project4.element);
        var e = activeProjects.indexOf(project4);
        activeProjects.splice(e, 1);
    },
};
projects.push(project4);
