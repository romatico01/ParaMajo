/* =====================
ELEMENTOS PRINCIPALES (PRIMERO SIEMPRE)
===================== */

const ball = document.getElementById("ball");
const scene = document.getElementById("scene");
const textElement = document.getElementById("text");
const music = document.getElementById("music");


/* =====================
FORMULARIO + WHATSAPP
===================== */

const quiz=document.getElementById("quiz");

if(quiz){

scene.classList.add("hidden");

document.getElementById("sendQuiz").onclick=()=>{

const q1=document.querySelector('input[name="q1"]:checked');
const q2=document.querySelector('input[name="q2"]:checked');
const q3=document.getElementById("q3").value;

if(!q1||!q2||q3===""){
alert("Responde todo primero 💕");
return;
}

/* CAMBIA TU NUMERO AQUI */
const numero="573XXXXXXXXX";

let msg=
"💌 Respuestas 💌\n\n"+
"1️⃣ "+q1.value+"\n"+
"2️⃣ "+q2.value+"\n"+
"3️⃣ "+q3;

window.open("https://wa.me/"+numero+"?text="+encodeURIComponent(msg));

quiz.style.display="none";
scene.classList.remove("hidden");

};
}


/* =====================
❤️ LOADER
===================== */

window.addEventListener("load",()=>{
const loader=document.getElementById("loader");
if(loader) loader.style.display="none";
});


/* =====================
CARTA TEXTO
===================== */

const message=`A veces las personas llegan sin avisar y, sin hacer ruido, cambian algo dentro de nosotros.

Tu forma de ser transmite tranquilidad. No necesitas llamar la atención para brillar; simplemente siendo tú haces que todo se sienta más bonito y más sincero. Eso es lo que más me gusta.

Desde que te conocí entendí que hay personas que no destacan solo por cómo se ven, sino por lo que son. Y tú eres de esas que inspiran calma, respeto y admiración.

Hoy 14 de febrero solo quería desearte un día lleno de sonrisas, paz y momentos que te recuerden lo valiosa que eres.
Solo quería desearte un hermoso 14 de febrero,
lleno de felicidad, sonrisas y momentos especiales

Si quieres descubrir lo que guardé especialmente para ti,
presiona “Carta secreta” y digita la contraseña: amor`;


/* =====================
INICIO
===================== */

setTimeout(()=>{
if(ball) ball.style.display="none";
if(scene) scene.classList.remove("hidden");
startTree();
typeWriter();
startCounter();
fireworks();
},2000);


/* =====================
ABRIR SOBRE + MUSICA
===================== */

const envelope=document.getElementById("envelope");

if(envelope){
envelope.addEventListener("click",()=>{

envelope.classList.toggle("open");

if(music){
music.volume=0.6;
music.play().catch(()=>{});
}

});
}


/* =====================
AUTO PLAY MUSICA (entra + mueve mouse)
===================== */

function autoPlayMusic(){
if(music){
music.volume=0.6;
music.play().catch(()=>{});
}

document.removeEventListener("click", autoPlayMusic);
document.removeEventListener("mousemove", autoPlayMusic);
document.removeEventListener("scroll", autoPlayMusic);
}

document.addEventListener("click", autoPlayMusic);
document.addEventListener("mousemove", autoPlayMusic);
document.addEventListener("scroll", autoPlayMusic);


/* =====================
ESCRIBIR TEXTO
===================== */

function typeWriter(){
let i=0;

function write(){
if(i<message.length){
textElement.innerHTML+=
message.charAt(i)==="\n"?"<br>":message.charAt(i);
i++;
setTimeout(write,25);
}
}

if(textElement) write();
}


/* =====================
CONTADOR
===================== */

function startCounter(){



setInterval(()=>{
let now=new Date();
let diff=now-startDate;

let days=Math.floor(diff/86400000);
let hours=Math.floor(diff/3600000)%24;
let min=Math.floor(diff/60000)%60;

const counter=document.getElementById("counter");
if(counter){
counter.innerHTML=
"Desde que te conocí: "+days+" días "+hours+"h "+min+"m";
}

},1000);
}


/* =====================
MENSAJE SECRETO
===================== */

const secretBtn=document.getElementById("secretBtn");

if(secretBtn){
secretBtn.onclick=()=>{
let pass=prompt("Ingresa la contraseña 💌");

if(pass==="amor"){
document.getElementById("secret").classList.toggle("hidden");
}else{
alert("Contraseña incorrecta 😢");
}
};
}


/* =====================
MODO OSCURO
===================== */

const darkBtn=document.getElementById("darkBtn");

if(darkBtn){
darkBtn.onclick=()=>{
document.body.classList.toggle("dark");
};
}


/* =====================
ESTRELLAS FONDO
===================== */

const starCanvas=document.getElementById("stars");

if(starCanvas){

const sctx=starCanvas.getContext("2d");

function resizeStars(){
starCanvas.width=window.innerWidth;
starCanvas.height=window.innerHeight;
}

resizeStars();
window.addEventListener("resize",resizeStars);

let stars=[];

for(let i=0;i<150;i++){
stars.push({
x:Math.random()*window.innerWidth,
y:Math.random()*window.innerHeight,
r:Math.random()*2
});
}

function drawStars(){
sctx.clearRect(0,0,starCanvas.width,starCanvas.height);

sctx.fillStyle="white";

stars.forEach(s=>{
sctx.beginPath();
sctx.arc(s.x,s.y,s.r,0,Math.PI*2);
sctx.fill();
});

requestAnimationFrame(drawStars);
}

drawStars();
}


/* =====================
🌳 ARBOL CORAZON
===================== */

function startTree(){

const canvas=document.getElementById("treeCanvas");
if(!canvas) return;

const ctx=canvas.getContext("2d");

canvas.width=300;
canvas.height=260;

let particles=[];
const colors=["#ff4b6e","#ff7aa2","#ffd700","#ff69b4","#ffa500"];

for(let i=0;i<600;i++){

let t=Math.random()*Math.PI*2;

let x=16*Math.pow(Math.sin(t),3);
let y=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);

particles.push({
targetX:150+x*7,
targetY:120-y*7,
x:150,
y:240,
size:Math.random()*4+2,
color:colors[Math.floor(Math.random()*colors.length)],
speed:Math.random()*0.03+0.02
});
}

function drawHeart(x,y,size,color){
ctx.fillStyle=color;
ctx.beginPath();
ctx.moveTo(x,y);
ctx.bezierCurveTo(x-size,y-size,x-size*2,y+size/2,x,y+size);
ctx.bezierCurveTo(x+size*2,y+size/2,x+size,y-size,x,y);
ctx.fill();
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{
p.x+=(p.targetX-p.x)*p.speed;
p.y+=(p.targetY-p.y)*p.speed;
drawHeart(p.x,p.y,p.size,p.color);
});

requestAnimationFrame(animate);
}

animate();
}


/* =====================
🎆 FUEGOS ARTIFICIALES
===================== */

function fireworks(){
setInterval(()=>{
if(window.confetti){
confetti({
particleCount:80,
spread:70,
origin:{y:0.6}
});
}
},6000);
}


/* =====================
✨ PARTICULAS 3D
===================== */

if(window.THREE){

const canvas3D=document.getElementById("threeCanvas");

if(canvas3D){

const renderer=new THREE.WebGLRenderer({
canvas:canvas3D,
alpha:true
});

renderer.setSize(window.innerWidth,window.innerHeight);

const scene3D=new THREE.Scene();

const camera=new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.z=5;

const geometry=new THREE.BufferGeometry();
const count=800;

const positions=new Float32Array(count*3);

for(let i=0;i<count*3;i++){
positions[i]=(Math.random()-0.5)*10;
}

geometry.setAttribute("position",
new THREE.BufferAttribute(positions,3)
);

const material=new THREE.PointsMaterial({
size:0.03,
color:0xff7aa2
});

const particles=new THREE.Points(geometry,material);
scene3D.add(particles);

function animate3D(){
requestAnimationFrame(animate3D);
particles.rotation.y+=0.001;
particles.rotation.x+=0.0005;
renderer.render(scene3D,camera);
}

animate3D();

window.addEventListener("resize",()=>{
renderer.setSize(window.innerWidth,window.innerHeight);
camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
});
}
}


/* =====================
🌸 PETALOS
===================== */

function petals(){

setInterval(()=>{

const petal=document.createElement("div");
petal.className="petal";
petal.innerHTML="🌸";

petal.style.left=Math.random()*window.innerWidth+"px";
petal.style.top="-20px";
petal.style.fontSize=Math.random()*20+15+"px";
petal.style.animationDuration=Math.random()*4+4+"s";

document.body.appendChild(petal);

setTimeout(()=>petal.remove(),8000);

},600);

}

petals();






