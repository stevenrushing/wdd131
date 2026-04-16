const quotes = [
    { text: `The secret of getting ahead is getting started. (so go get started!)`, author: `Mark Twain`, category: `work` },
    { text: `Any sufficiently advanced technology is indistinguishable from magic. (so go make some magic!)`, author: `Arthur C. Clarke`, category: `work` },
    { text: `The enemy's gate is down. (so reconfigure your perspective towards the goal!)`, author: `Orson Scott Card`, category: `work` },
    { text: `The only way to do great work is to love what you do. (steve always signed lowercase to keep himself humble. He failed, but you don't have to.)`, author: `steve jobs`, category: `work` },
    { text: `All we have to decide is what to do with the time that is given us. (decide well)`, author: `Gandalf (or maybe JRR Tolkien)`, category: `work` },
    { text: `In the middle of every difficulty lies opportunity. (take it!)`, author: `Albert Einstein`, category: `life` },
    { text: `It does not matter how slowly you go as long as you do not stop.`, author: `Confucius`, category: `life` },
    { text: `We've done the impossible, and that makes us mighty. (do the impossible!)`, author: `Captain Mal Reynolds`, category: `life` },
    { text: `The best time to plant a tree was 20 years ago. The second best time is now.`, author: `No clue, I heard it somewhere`, category: `life` },
    { text: `What does the Lord require of thee, but to seek justice, love mercy, and walk humbly with your God`, author: `Micah 4:6 I think, note to look this up`, category: `spiritual` },
    { text: `Trust in the Lord with all thine heart; and lean not unto thine own understanding.`, author: `Proverbs 3:5`, category: `spiritual` },
    { text: `I can do all things through Christ who strengthens me. (Jon Bones having the tattoo doesn't make it less true!)`, author: `Philippians 4:13`, category: `spiritual` },
    { text: `For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.`, author: `2 Timothy 1:7`, category: `spiritual` },
    { text: `Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.`, author: `Matthew 7:7 and I think a few other places`, category: `spiritual` },
    { text: `For I know the plans I have for you — plans to prosper you and not to harm you, plans to give you hope and a future.`, author: `Jeremiah 29:11`, category: `spiritual` },
    { text: `JUST DO IT. (JUST DO IT! JUST DO IT! WEIRD MUSCLE POSES HERE.)`, author: `Shia LaBeouf`, category: `fun` },
    { text: `Whether you think you can or you think you can't, you're right.`, author: `Henry Ford`, category: `fun` },
    { text: `I have not failed. I've just found 10,000 ways that won't work.`, author: `Thomas Edison`, category: `fun` },
    { text: `You miss 100% of the shots you don't take.`, author: `Michael Scott, or Steve Carrell`, category: `fun` },
    { text: `Life before death, strength before weakness, journey before destination (the journey is the point!)`, author: `Brandon Sanderson`, category: `fun` }
];

// TODO: get this working after I get a login function working beyond just an early term
const MAX_FAVORITES = 20;

// let quoteHistory = [];  // was going to show a history of quotes, I'll get there

let currentQuote = null;

function getRandomQuote(category) {
    const pool = category === `random`
        ? quotes
        : quotes.filter(q => q.category === category);
    if (pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
}

function displayQuote(quote, name) {
    const section  = document.getElementById(`quoteDisplay`);
    const greetEl  = document.getElementById(`quoteGreeting`);
    const textEl   = document.getElementById(`quoteText`);
    const authEl   = document.getElementById(`quoteAuthor`);

    greetEl.textContent = name
        ? `Here's one for you, ${name}:`
        : `Here's a quote for you:`;
    textEl.textContent  = `"${quote.text}"`;
    authEl.textContent  = `\u2014 ${quote.author}`;
    section.classList.remove(`hidden`);
}

function loadFavorites() {
    const saved = localStorage.getItem(`quotenliken-favorites`);
    return saved ? JSON.parse(saved) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem(`quotenliken-favorites`, JSON.stringify(favorites));
}

// draw the favorites list
function showFaves() {
    const favorites = loadFavorites();
    const list      = document.getElementById(`favoritesList`);
    const noFavEl   = document.getElementById(`noFavorites`);

    list.innerHTML = ``;

    if (favorites.length === 0) {
        noFavEl.style.display = `block`;
        return;
    }

    noFavEl.style.display = `none`;
    favorites.forEach(fav => {
        const li = document.createElement(`li`);
        li.classList.add(`favorite-item`);
        li.innerHTML = `
            <p class="fav-text">"${fav.text}"</p>
            <p class="fav-author">\u2014 ${fav.author}</p>
        `;
        list.appendChild(li);
    });
}

function saveFav() {
    if (!currentQuote) return;
    const favorites    = loadFavorites();
    const alreadySaved = favorites.some(f => f.text === currentQuote.text);
    if (alreadySaved) {
        document.getElementById(`favoriteBtn`).textContent = `Already saved!`;
        return;
    }
    favorites.push(currentQuote);
    saveFavorites(favorites);
    showFaves();
    document.getElementById(`favoriteBtn`).textContent = `Saved!`;
}

// had a clear button at some point but took it out - keeping this as a note to do it later
function clearFaves() {
    localStorage.removeItem(`quotenliken-favorites`);
    showFaves();
}

function submitForm(e) {
    e.preventDefault();
    const name     = document.getElementById(`userName`).value.trim();
    const category = document.getElementById(`category`).value;

    if (!name || !category) return;

    localStorage.setItem(`quotenliken-name`, name);

    currentQuote = getRandomQuote(category);
    if (currentQuote) {
        displayQuote(currentQuote, name);
        document.getElementById(`favoriteBtn`).textContent = `Save to Favorites`;
    }
}

window.addEventListener(`DOMContentLoaded`, () => {
    // hamburger, same as the other pages
    const hamburger = document.getElementById(`hamburger`);
    const navList   = document.querySelector(`nav ul`);
    hamburger.addEventListener(`click`, () => {
        navList.classList.toggle(`show`);
        hamburger.textContent = navList.classList.contains(`show`) ? `\u2715` : `\u2630`;
    });

    // year pui modified
    document.getElementById(`currentyear`).textContent = `${new Date().getFullYear()}`;
    document.getElementById(`lastModified`).textContent = `Last modified: ${document.lastModified}`;

    // name from last time, if they have one
    const savedName = localStorage.getItem(`quotenliken-name`);
    if (savedName) {
        document.getElementById(`userName`).value = savedName;
    }

    // document.addEventListener(`submit`, submitForm);
    document.getElementById(`quoteForm`).addEventListener(`submit`, submitForm);
    document.getElementById(`favoriteBtn`).addEventListener(`click`, saveFav);

    showFaves();
});
