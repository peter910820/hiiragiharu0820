window.addEventListener("load", function() {
  var loadingScreen = document.getElementById("loading-screen");
  var content = document.getElementById("hidden");
  
  loadingScreen.style.display = "none";
  content.classList.remove("hidden");
  
  new WOW().init();
});
