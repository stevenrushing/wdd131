const links = [
    {
        title: `BibleGateway`,
        url: `https://www.biblegateway.com`,
        description: `Online Bible with lots of translations`,
        category: `scripture`
    },
    {
        title: `BibleHub`,
        url: `https://biblehub.com`,
        description: `Another online Bible with lots of translations`,
        category: `scripture`
    },
    {
        title: `Scripture Hub (BYU)`,
        url: `https://scriptures.byu.edu`,
        description: `BYU's set of LDS scriptures`,
        category: `scripture`
    },
    {
        title: `BrainyQuote`,
        url: `https://www.brainyquote.com`,
        description: `Where I got lots of my quotes (perhaps should reference Google for getting me here?)`,
        category: `motivation`
    },
    {
        title: `Quote Investigator`,
        url: `https://quoteinvestigator.com`,
        description: `Another quote list`,
        category: `motivation`
    },
    {
        title: `Goodreads Quotes`,
        url: `https://www.goodreads.com/quotes`,
        description: `The once great goodreads, now owned by the evil Amazon`,
        category: `motivation`
    },
    {
        title: `James Clear`,
        url: `https://jamesclear.com/articles`,
        description: `Another Google link, not familiar with this guy, but I need a list`,
        category: `productivity`
    },
    {
        title: `Paul Graham Essays`,
        url: `https://paulgraham.com/articles.html`,
        description: `Another list of essays and articles provided by the Google`,
        category: `productivity`
    },
    {
        title: `Cal Newport Blog`,
        url: `https://calnewport.com/blog/`,
        description: `More Google provided stuff`,
        category: `productivity`
    },
    {
        title: `Church of Jesus Christ`,
        url: `https://www.lds.org`,
        description: `Official website of The Church of Jesus Christ of Latter-day Saints.`,
        category: `lds`
    },
    {
        title: `Come Follow Me`,
        url: `https://www.lds.org/come-follow-me`,
        description: `Sunday school lesson plans and weekly readings for church memebers and really anyone who wants to read it`,
        category: `lds`
    },
    {
        title: `Gospel Library App`,
        url: `https://www.lds.org/pages/mobileapps`,
        description: `This has gotten so much better over the years than it originally was. Now it is a must-download.`,
        category: `lds`
    }
];

let activeFilter = localStorage.getItem(`linknliken-filter`) || `all`;

// was going to add a search box but ran out of time
// function searchLinks(term) { ... }

function renderLinks(filter) {
    const list = document.getElementById(`linksList`);
    list.innerHTML = ``;

    const filtered = filter === `all`
        ? links
        : links.filter(l => l.category === filter);

    filtered.forEach(link => {
        const li = document.createElement(`li`);
        li.classList.add(`link-card`);
        li.innerHTML = `
            <h3><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.title}</a></h3>
            <p>${link.description}</p>
            <span class="link-category">${link.category}</span>
        `;
        list.appendChild(li);
    });
}

function pickFilter(filter) {
    activeFilter = filter;
    localStorage.setItem(`linknliken-filter`, filter);

    document.querySelectorAll(`.filter-btn`).forEach(btn => {
        btn.classList.toggle(`active`, btn.dataset.filter === filter);
    });

    renderLinks(filter);
}

window.addEventListener(`DOMContentLoaded`, () => {
    // hamburger nav toggle
    const hamburger = document.getElementById(`hamburger`);
    const navList   = document.querySelector(`nav ul`);
    hamburger.addEventListener(`click`, () => {
        navList.classList.toggle(`show`);
        hamburger.textContent = navList.classList.contains(`show`) ? `\u2715` : `\u2630`;
    });

    // year + last modified
    document.getElementById(`currentyear`).textContent = `${new Date().getFullYear()}`;
    document.getElementById(`lastModified`).textContent = `Last modified: ${document.lastModified}`;

    // hook up the filter buttons
    document.querySelectorAll(`.filter-btn`).forEach(btn => {
        btn.addEventListener(`click`, () => pickFilter(btn.dataset.filter));
    });

    // render with saved or default filter
    pickFilter(activeFilter);
});
