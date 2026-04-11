const yearElement = document.getElementById("currentyear");
yearElement.textContent = new Date().getFullYear();

const lastModified = document.getElementById("lastModified");
lastModified.textContent = "Last Modification: " + document.lastModified;

const products = [
    {
        id: "fc-1888",
        name: "Flux Capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "Power Laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "Time Circuits",
        averagerating: 4.6
    },
    {
        id: "ac-2000",
        name: "Life Jacket",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "Shark Repellent",
        averagerating: 4.1
    }
];

const select = document.getElementById("product-name");

products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    select.appendChild(option);
});
