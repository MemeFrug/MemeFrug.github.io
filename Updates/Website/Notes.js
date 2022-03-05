var url="./Updates/Website/updatedetails.txt";let reader=new FileReader;fetch(url).then((e=>{e.text().then((e=>{var t=document.getElementById("Notes");t.innerHTML=t.innerHTML+"\n"+e}))}));
