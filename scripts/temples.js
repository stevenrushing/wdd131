const yearElement = document.getElementById("currentyear");
yearElement.textContent = new Date().getFullYear();

const lastModified = document.getElementById("lastModified");
lastModified.textContent = "Last Modification: " + document.lastModified;

const hamburger = document.getElementById("hamburger");
const nav = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("show");
    if (nav.classList.contains("show")) {
        hamburger.textContent = "✕";
    } else {
        hamburger.textContent = "☰";
    }
});