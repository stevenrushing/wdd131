const yearElement = document.getElementById("currentyear");
yearElement.textContent = new Date().getFullYear();

const lastModified = document.getElementById("lastModified");
lastModified.textContent = "Last Modification: " + document.lastModified;

const temperature = 9; // °C
const windSpeed = 10; // km/h

function calculateWindChill(temp, speed) {
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1);  // attribution - this line written by AI - Anthropic's Claude, the assignment said using AI to determine the formula might be a good approach
}

const windchillElement = document.getElementById("windchill");

if (temperature <= 10 && windSpeed > 4.8) {
    windchillElement.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
    windchillElement.textContent = "N/A";
}