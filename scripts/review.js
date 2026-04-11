const yearElement = document.getElementById("currentyear");
yearElement.textContent = new Date().getFullYear();

const lastModified = document.getElementById("lastModified");
lastModified.textContent = "Last Modification: " + document.lastModified;

let reviewCount = localStorage.getItem("reviewCount");
reviewCount = reviewCount ? parseInt(reviewCount) + 1 : 1;
localStorage.setItem("reviewCount", reviewCount);

document.getElementById("review-count").textContent = reviewCount;
