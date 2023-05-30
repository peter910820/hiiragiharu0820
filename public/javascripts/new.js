/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
window.addEventListener("load", (event) => {
  new cursoreffects.bubbleCursor();
});

let typed = new Typed(".typer", {
  strings: ["Welcome to,", "SeaotterMS Blog"],
  typeSpeed: 80,
});

const iconGithub = document.getElementById("iconGithub");
const iconTwitter = document.getElementById("iconTwitter");
const iconYoutube = document.getElementById("iconYoutube");

iconGithub.addEventListener("mouseover", () =>{
  iconGithub.className = "fa-brands fa-github fa-shake";
});
iconTwitter.addEventListener("mouseover", () =>{
  iconTwitter.className = "fa-brands fa-twitter fa-shake";
});
iconYoutube.addEventListener("mouseover", () =>{
  iconYoutube.className = "fa-brands fa-youtube fa-shake";
});

iconGithub.addEventListener("mouseout", () =>{
  iconGithub.className = "fa-brands fa-github";
});
iconTwitter.addEventListener("mouseout", () =>{
  iconTwitter.className = "fa-brands fa-twitter";
});
iconYoutube.addEventListener("mouseout", () =>{
  iconYoutube.className = "fa-brands fa-youtube";
});

let galgameTyped = new Typed("#galgameArticleTitle", {
  strings: ["Galgame文章總集"],
  typeSpeed: 80,
});