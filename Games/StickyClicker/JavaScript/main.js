document.getElementById("Unshown1").style.display="none",document.getElementById("DEBT").style.display="none",document.getElementById("DEBT2").style.display="none";var BuyPaperAuto=document.getElementById("autobuypaper");function getRndInteger(e,t){return Math.floor(Math.random()*(t-e+1))+e}BuyPaperAuto.style.display="none";var BuyPaperBut=document.getElementById("autobuy");BuyPaperBut.addEventListener("click",toggleWireBuyer);var buypaperbut=document.getElementById("buypaper");buypaperbut.addEventListener("click",buypaper);var stickybut=document.getElementById("stickynotesbut");stickybut.addEventListener("click",addstickynotes);var marketinglvlbut=document.getElementById("marketingbut");marketinglvlbut.addEventListener("click",marketing);var autosnippersbut=document.getElementById("autosnippers1");autosnippersbut.addEventListener("click",autosnippers);var adsbut=document.getElementById("adupgrade");adsbut.addEventListener("click",adsbuy);let Shown1=!1;var stickynessbut=document.getElementById("stickyness"),priceofnotesid=document.getElementById("priceofnotes"),totalnotesid=document.getElementById("notes"),unsoldstickynotesid=document.getElementById("unsoldstickynotes"),amtofmoneyid=document.getElementById("money"),marketinglvlid=document.getElementById("marketingamount"),autosnipperid=document.getElementById("autosnippersamt"),stickynessid=document.getElementById("stickynessid"),paperid=document.getElementById("amountofpaper"),papercosts=document.getElementById("howmuchpapercosts"),treeskilled=document.getElementById("amount of trees killed"),column2=document.getElementById("column2"),autopaperid=document.getElementById("autobuypaperonoroff"),adsid=document.getElementById("amountofads");let hasboughtAds=0,adscost=6,adsamount=0,hasboughtwireBuyer=0,wireBuyerStatus=0,isindebt=!1,isoverdue=!1,treeskilledamt=.1,paperamt=1e3,paperamteachbuy=1e3,papercost=.2,stickynesscost=5,stickynesslvl=0,autosnipperslvl=0,autosnipperscost=1,autosnippersspeed=3e3,autosnipperstrue=!0,marketingcost=.3,marketinglvl=0,marketingspeed=5e3,amountofmoney=0,priceofnotes=.05,unsoldstickynotes=0,totalmadenotes=0,isindarkmode=!1,AmountofIntervals=0;function setspeed(e){AmountofIntervals+=1;let t=setInterval(sellnotes,e);clearInterval(t),t=setInterval(sellnotes,e)}function save(){for(var e=[],t=[],s=0;s<projects.length;s++)e[s]=projects[s].uses;for(s=0;s<activeProjects.length;s++)t[s]=activeProjects[s].id;console.log("Saving Session");let n={isindebt:isindebt,isoverdue:isoverdue,hasboughtwireBuyer:hasboughtwireBuyer,wireBuyerStatus:wireBuyerStatus,amountofmoney:amountofmoney,unsoldstickynotes:unsoldstickynotes,treeskilledamt:treeskilledamt,marketinglvl:marketinglvl,marketingcost:marketingcost,totalmadenotes:totalmadenotes,stickynesscost:stickynesscost,stickynesslvl:stickynesslvl,autosnipperslvl:autosnipperslvl,autosnipperscost:autosnipperscost,autosnippersspeed:autosnippersspeed,paperamt:paperamt,papercost:papercost,hasboughtAds:hasboughtAds,adscost:adscost,adsamount:adsamount,marketingspeed:marketingspeed,paperamteachbuy:paperamteachbuy};localStorage.setItem("isindarkmode",JSON.stringify(isindarkmode)),localStorage.setItem("saveGame",JSON.stringify(n)),localStorage.setItem("saveProjectsUses",JSON.stringify(e)),localStorage.setItem("saveProjectsActive",JSON.stringify(t))}function load(){console.log("Loading Save");var isindarkmodeload=eval(localStorage.getItem("isindarkmode")),loadGame=JSON.parse(localStorage.getItem("saveGame")),loadProjectsUses=JSON.parse(localStorage.getItem("saveProjectsUses")),loadProjectsActive=JSON.parse(localStorage.getItem("saveProjectsActive"));hasboughtwireBuyer=loadGame.hasboughtwireBuyer,wireBuyerStatus=loadGame.wireBuyerStatus,amountofmoney=loadGame.amountofmoney,unsoldstickynotes=loadGame.unsoldstickynotes,treeskilledamt=loadGame.treeskilledamt,marketinglvl=loadGame.marketinglvl,marketingcost=loadGame.marketingcost,totalmadenotes=loadGame.totalmadenotes,stickynesscost=loadGame.stickynesscost,stickynesslvl=loadGame.stickynesslvl,autosnipperslvl=loadGame.autosnipperslvl,autosnipperscost=loadGame.autosnipperscost,autosnippersspeed=loadGame.autosnippersspeed,paperamt=loadGame.paperamt,papercost=loadGame.papercost,isindarkmode=isindarkmodeload,hasboughtAds=loadGame.hasboughtAds,adscost=loadGame.adscost,adsamount=loadGame.adsamount,marketingspeed=loadGame.marketingspeed,paperamteachbuy=loadGame.paperamteachbuy,1==hasboughtAds&&(document.getElementById("adupgradeshow").style.display="inherit",null==adscost?(adsbut.textContent="MAX",adscost=1/0):adsbut.textContent="$"+adscost),1==hasboughtwireBuyer&&(document.getElementById("autobuypaper").style.display="inherit",autopaperid.innerHTML=1==wireBuyerStatus?"ON":"OFF");for(var i=0;i<stickynesslvl/10;i++)console.log("updating price of notes "+(i+1)+" times"),priceofnotes+=.02,priceofnotesid.textContent=priceofnotes.toFixed(2);null==stickynesscost?(stickynessbut.textContent="MAX",stickynesscost=1/0):stickynessbut.textContent="$"+stickynesscost,1==isindarkmode&&document.body.classList.toggle("dark-mode"),marketinglvlbut.textContent=null==marketingcost?"MAX":"$"+marketingcost.toFixed(2);for(let e=0;e<autosnipperslvl;e++)setTimeout((function(){console.log("enabled "+(e+1)+" times"),setInterval(autosnippersmain,autosnippersspeed)}),getRndInteger(100,3e3));for(let e=0;e<marketinglvl;e++)setTimeout((function(){console.log("set speed "+(e+1)+" times"),setspeed(marketingspeed)}),getRndInteger(100,3e3));for(var i=0;i<projects.length;i++)projects[i].uses=loadProjectsUses[i];for(var i=0;i<projects.length;i++)loadProjectsActive.indexOf(projects[i].id)>=0&&(LoadProjects(projects[i]),activeProjects.push(projects[i]));refreshIntervals(),refresh()}null!=localStorage.getItem("saveGame")?(console.log("Found save file"),load()):(console.log("There is no Save File"),save(),console.log("Created one"),setspeed(marketingspeed));var saveTimer=0;function refresh(){priceofnotesid.textContent=priceofnotes.toFixed(2),totalnotesid.textContent=totalmadenotes,unsoldstickynotesid.textContent=unsoldstickynotes,amtofmoneyid.textContent=amountofmoney.toFixed(2),marketinglvlid.textContent=marketinglvl,autosnipperid.textContent=autosnipperslvl,stickynessid.textContent=stickynesslvl,paperid.textContent=paperamt,papercosts.textContent="$"+papercost.toFixed(2),treeskilled.textContent=treeskilledamt.toFixed(1),adsid.textContent=adsamount,autosnippersbut.textContent="$"+autosnipperscost}function reset(){localStorage.removeItem("saveGame"),localStorage.removeItem("saveProjectsUses"),localStorage.removeItem("saveProjectsActive"),location.reload()}function refreshIntervals(){setTimeout((function(){for(var e=0;e<AmountofIntervals;e++)clearInterval(sellnotes)}),getRndInteger(100,3e3)),setTimeout((function(){for(var e=0;e<AmountofIntervals;e++)setInterval(sellnotes,marketingspeed)}),getRndInteger(100,3e3))}function adsbuy(){adsamount>=10&&(console.log("At maximun amount of ads"),amountofmoney-=adscost,adscost=1/0,adsbut.textContent="MAX",adsamount+=1,adsid.textContent=adsamount,marketingspeed-=100,refreshIntervals()),adsamount<10&&(console.log("Bought an ad"),amountofmoney-=adscost,adscost+=5,adsbut.textContent="$"+adscost,adsamount+=1,adsid.textContent=adsamount,marketingspeed-=100,refreshIntervals())}function buypaper(){amountofmoney-=papercost,paperamt+=paperamteachbuy,paperid.textContent=paperamt,treeskilledamt+=paperamteachbuy/1e4,treeskilled.textContent=treeskilledamt.toFixed(1)}function autosnippers(){autosnipperslvl>=100&&(autosnipperslvl+=1,amountofmoney-=autosnipperscost,autosnipperid.textContent=autosnipperslvl,autosnipperscost*=2,autosnippersbut.textContent="$"+autosnipperscost,setInterval(autosnippersmain,autosnippersspeed)),autosnipperslvl<100&&(autosnipperslvl+=1,amountofmoney-=autosnipperscost,autosnipperid.textContent=autosnipperslvl,autosnipperscost+=2,autosnippersbut.textContent="$"+autosnipperscost,setInterval(autosnippersmain,autosnippersspeed))}function autosnippersmain(){1==autosnipperstrue?(unsoldstickynotes+=1,totalmadenotes+=1,unsoldstickynotesid.textContent=unsoldstickynotes,totalnotesid.textContent=totalmadenotes,paperamt-=10,paperid.textContent=paperamt):console.log("Dont have enough paper")}function toggleWireBuyer(){1==wireBuyerStatus?(wireBuyerStatus=0,autopaperid.innerHTML="OFF"):(wireBuyerStatus=1,autopaperid.innerHTML="ON")}window.setInterval((function(){++saveTimer>=250&&(save(),saveTimer=0)}),100),setInterval((function(){amountofmoney>=marketingcost&&(marketinglvlbut.disabled=!1),amountofmoney<marketingcost&&(marketinglvlbut.disabled=!0),amountofmoney>=autosnipperscost&&(autosnippersbut.disabled=!1),amountofmoney<autosnipperscost&&(autosnippersbut.disabled=!0),amountofmoney>=stickynesscost&&(stickynessbut.disabled=!1),amountofmoney<stickynesscost&&(stickynessbut.disabled=!0),amtofmoneyid.textContent=amountofmoney.toFixed(2),amountofmoney>=papercost&&(buypaperbut.disabled=!1),amountofmoney<papercost&&(buypaperbut.disabled=!0),paperamt<=0&&(stickybut.disabled=!0,autosnipperstrue=!1),paperamt>0&&(stickybut.disabled=!1,autosnipperstrue=!0),amountofmoney<papercost&paperamt<=0&&(buypaperbut.disabled=!1),amountofmoney<0&&(document.getElementById("DEBT").style.display="inherit",isindebt=!0),1==isindebt&amountofmoney>=0&&(isindebt=!1,document.getElementById("DEBT").style.display="none");var e=document.body;isindarkmode="dark-mode"==e.classList;totalmadenotes>=300&&(papercost=.4,papercosts.textContent="$"+papercost.toFixed(2)),totalmadenotes>=1e3&&(papercost=1,papercosts.textContent="$"+papercost.toFixed(2)),paperamt<0&&(document.getElementById("DEBT2").style.display="inherit",isoverdue=!0),1==isoverdue&paperamt>=0&&(isoverdue=!1,document.getElementById("DEBT2").style.display="none"),1==wireBuyerStatus&&paperamt<=0&&buypaper(),adsbut.disabled=!(amountofmoney>=adscost),manageProjects()}),10);var blinkCounter=0;function blink(e){var t=setInterval((function(){!function(e){(blinkCounter+=1)>=12?(clearInterval(t),blinkCounter=0,e.style.visibility="visible"):"hidden"!=e.style.visibility?e.style.visibility="hidden":e.style.visibility="visible"}(e)}),30)}function manageProjects(){for(var e=0;e<projects.length;e++)projects[e].trigger()&&projects[e].uses>0&&(LoadProjects(projects[e]),projects[e].uses=projects[e].uses-1,activeProjects.push(projects[e]));for(e=0;e<activeProjects.length;e++)activeProjects[e].cost()?activeProjects[e].element.disabled=!1:activeProjects[e].element.disabled=!0}function LoadProjects(e){e.element=document.createElement("button"),e.element.setAttribute("id",e.id),e.element.onclick=function(){e.effect()},e.element.setAttribute("class","projectButton"),ProjectsListTop.appendChild(e.element,ProjectsListTop.firstChild);var t=document.createElement("span");t.style.fontWeight="bold",e.element.appendChild(t);var s=document.createTextNode(e.Title);t.appendChild(s);var n=document.createTextNode(e.priceTag);e.element.appendChild(n);var o=document.createElement("div");e.element.appendChild(o);var a=document.createTextNode(e.Description);e.element.appendChild(a),blink(e.element)}setInterval((function e(){totalmadenotes>=900&&(column2.style.display="inherit",clearInterval(e))}),1e3);var shown1var=setInterval(checkshown1,500);function checkshown1(){totalmadenotes>=200&&(Shown1=!0),1==Shown1&&(stickynessbut.addEventListener("click",Stickyness),document.getElementById("Unshown1").style.display="inherit",clearInterval(shown1var))}function Stickyness(){stickynesslvl<100&&(priceofnotes+=.02,priceofnotesid.textContent=priceofnotes.toFixed(2),stickynesslvl+=10,amountofmoney-=stickynesscost,stickynesscost+=5,stickynessbut.textContent="$"+stickynesscost,stickynessid.textContent=stickynesslvl),stickynesslvl>=100&&(stickynesscost=1/0,stickynessbut.textContent="MAX",stickynessid.textContent=stickynesslvl)}function marketing(){marketinglvl>=40&&marketinglvl<100&&(marketinglvl+=1,amountofmoney-=marketingcost,marketinglvlid.textContent=marketinglvl,setspeed(marketingspeed),marketingcost+=3.3,marketinglvlbut.textContent="$"+marketingcost.toFixed(2)),marketinglvl>=11&&marketinglvl<40&&(marketinglvl+=1,amountofmoney-=marketingcost,marketinglvlid.textContent=marketinglvl,setspeed(marketingspeed),marketingcost+=1.3,marketinglvlbut.textContent="$"+marketingcost.toFixed(2)),marketinglvl<11&&(marketinglvl+=1,amountofmoney-=marketingcost,marketinglvlid.textContent=marketinglvl,setspeed(marketingspeed),marketingcost+=.8,marketinglvlbut.textContent="$"+marketingcost.toFixed(2)),marketinglvl>=100&&(marketinglvl+=1,amountofmoney-=marketingcost,marketinglvlid.textContent=marketinglvl,marketingcost=1/0,marketinglvlbut.textContent="MAX")}function addstickynotes(){totalmadenotes+=1,totalnotesid.textContent=totalmadenotes,unsoldstickynotes+=1,unsoldstickynotesid.textContent=unsoldstickynotes,paperamt-=10,paperid.textContent=paperamt}function sellnotes(){unsoldstickynotes>0&&(unsoldstickynotes-=1,unsoldstickynotesid.textContent=unsoldstickynotes,amountofmoney+=priceofnotes)}function addmoney(e){amountofmoney+=e}
