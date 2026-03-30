---
permalink: /assets/js/neko.js
---
var neko = document.createElement("div");
neko.id = "oneko";
neko.style.width = "32px";
neko.style.height = "32px";
neko.style.position = "fixed";
neko.style.pointerEvents = "none";
neko.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko/main/oneko.gif')";
neko.style.imageRendering = "pixelated";
neko.style.left = "16px";
neko.style.top = "16px";
neko.style.zIndex = "1000";
document.body.appendChild(neko);

var x = 16;
var y = 16;
var targetX = 16;
var targetY = 16;
var nekoSpeed = 0.05;

function updateNeko() {
  var dx = targetX - x;
  var dy = targetY - y;
  x += dx * nekoSpeed;
  y += dy * nekoSpeed;
  neko.style.left = x + "px";
  neko.style.top = y + "px";
  requestAnimationFrame(updateNeko);
}

document.addEventListener("mousemove", function(e) {
  targetX = e.clientX - 16;
  targetY = e.clientY - 16;
});

updateNeko();