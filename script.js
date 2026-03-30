function searchTools(){

let input=document.getElementById("search").value.toLowerCase()

let cards=document.querySelectorAll(".card")

cards.forEach(card=>{

if(card.innerText.toLowerCase().includes(input))

card.style.display="block"

else

card.style.display="none"

})

}

function openTool(tool){

let html=""

if(tool=="word"){

html=`

<h2>Word Counter</h2>

<textarea id="text" style="width:80%;height:120px"></textarea>

<br><br>

<button onclick="countWords()">Count</button>

<p id="result"></p>

`

}

if(tool=="password"){

html=`

<h2>Password Generator</h2>

<button onclick="generatePassword()">Generate</button>

<p id="result"></p>

`

}

if(tool=="random"){

html=`

<h2>Random Number Generator</h2>

<button onclick="randomNumber()">Generate</button>

<p id="result"></p>

`

}

document.getElementById("toolarea").innerHTML=html

}

function countWords(){

let text=document.getElementById("text").value

let words=text.trim().split(/\s+/).length

document.getElementById("result").innerText="Words: "+words

}

function generatePassword(){

let chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

let pass=""

for(let i=0;i<12;i++)

pass+=chars[Math.floor(Math.random()*chars.length)]

document.getElementById("result").innerText=pass

}

function randomNumber(){

document.getElementById("result").innerText=Math.floor(Math.random()*1000)

}
