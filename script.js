function showTool(tool){

let html=""

if(tool=="imgpdf"){

html=`
<h2>JPG to PDF</h2>

<input type="file" id="img">

<button onclick="imgToPdf()">Convert</button>
`

}

if(tool=="merge"){

html=`
<h2>Merge PDF</h2>

<input type="file" id="pdfs" multiple>

<button onclick="mergePDF()">Merge</button>
`

}

if(tool=="split"){

html=`
<h2>Split PDF</h2>

<input type="file" id="pdf">

<button onclick="splitPDF()">Split</button>
`

}

if(tool=="compress"){

html=`
<h2>Compress Image</h2>

<input type="file" id="img">

<button onclick="compressImage()">Compress</button>

<canvas id="canvas"></canvas>
`

}

if(tool=="resize"){

html=`
<h2>Resize Image</h2>

<input type="file" id="img">

<input id="width" placeholder="width">

<input id="height" placeholder="height">

<button onclick="resizeImage()">Resize</button>

<canvas id="canvas"></canvas>
`

}

if(tool=="word"){

html=`
<textarea id="text"></textarea>

<button onclick="countWords()">Count</button>

<p id="result"></p>
`

}

if(tool=="case"){

html=`
<textarea id="text"></textarea>

<button onclick="upper()">UPPER</button>

<button onclick="lower()">lower</button>
`

}

if(tool=="reverse"){

html=`
<input id="text">

<button onclick="reverse()">Reverse</button>

<p id="result"></p>
`

}

if(tool=="password"){

html=`
<button onclick="password()">Generate</button>

<p id="result"></p>
`

}

if(tool=="bmi"){

html=`
<input id="weight" placeholder="Weight kg">

<input id="height" placeholder="Height cm">

<button onclick="bmi()">Calculate</button>

<p id="result"></p>
`

}

if(tool=="age"){

html=`
<input type="date" id="birth">

<button onclick="age()">Calculate</button>

<p id="result"></p>
`

}

document.getElementById("toolbox").innerHTML=html

}

/* JPG → PDF */

async function imgToPdf(){

const file=document.getElementById("img").files[0]

const bytes=await file.arrayBuffer()

const pdfDoc=await PDFLib.PDFDocument.create()

const img=await pdfDoc.embedJpg(bytes)

const page=pdfDoc.addPage([img.width,img.height])

page.drawImage(img,{x:0,y:0,width:img.width,height:img.height})

const pdfBytes=await pdfDoc.save()

download(pdfBytes,"image.pdf")

}

/* MERGE PDF */

async function mergePDF(){

const files=document.getElementById("pdfs").files

const pdfDoc=await PDFLib.PDFDocument.create()

for(let file of files){

const bytes=await file.arrayBuffer()

const pdf=await PDFLib.PDFDocument.load(bytes)

const pages=await pdfDoc.copyPages(pdf,pdf.getPageIndices())

pages.forEach(p=>pdfDoc.addPage(p))

}

const pdfBytes=await pdfDoc.save()

download(pdfBytes,"merged.pdf")

}

/* SPLIT PDF */

async function splitPDF(){

const file=document.getElementById("pdf").files[0]

const bytes=await file.arrayBuffer()

const pdf=await PDFLib.PDFDocument.load(bytes)

for(let i=0;i<pdf.getPageCount();i++){

const newPdf=await PDFLib.PDFDocument.create()

const [page]=await newPdf.copyPages(pdf,[i])

newPdf.addPage(page)

const pdfBytes=await newPdf.save()

download(pdfBytes,"page"+(i+1)+".pdf")

}

}

/* DOWNLOAD */

function download(bytes,name){

const blob=new Blob([bytes],{type:"application/pdf"})

const link=document.createElement("a")

link.href=URL.createObjectURL(blob)

link.download=name

link.click()

}

/* TEXT TOOLS */

function countWords(){

let t=document.getElementById("text").value

document.getElementById("result").innerText=t.split(/\s+/).length

}

function upper(){

let t=document.getElementById("text")

t.value=t.value.toUpperCase()

}

function lower(){

let t=document.getElementById("text")

t.value=t.value.toLowerCase()

}

function reverse(){

let t=document.getElementById("text").value

document.getElementById("result").innerText=t.split("").reverse().join("")

}

function password(){

let chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

let pass=""

for(let i=0;i<12;i++) pass+=chars[Math.floor(Math.random()*chars.length)]

document.getElementById("result").innerText=pass

}

function bmi(){

let w=document.getElementById("weight").value

let h=document.getElementById("height").value/100

document.getElementById("result").innerText=w/(h*h)

}

function age(){

let b=new Date(document.getElementById("birth").value)

let a=new Date().getFullYear()-b.getFullYear()

document.getElementById("result").innerText=a+" years"

}
