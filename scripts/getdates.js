const yearElement = document.getElementById("currentyear");
yearElement.textContent = new Date().getFullYear();

const lastModified = document.getElementById("lastModified");
lastModified.textContent = "Last Modification: " + document.lastModified;