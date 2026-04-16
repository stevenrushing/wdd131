const volumeFiles = {
    "Old Testament":          "jsons/old-testament.json",
    "New Testament":          "jsons/new-testament.json",
    "Book of Mormon":         "jsons/book-of-mormon.json",
    "Doctrine and Covenants": "jsons/doctrine-and-covenants.json"
};

// in-memory caches (need to readup, not quite sure why this works)
const volumeDataMap    = {};
const volumeVerseLists = {};
let activeVolumes      = Object.keys(volumeFiles);

// flatten a volume into [{ text, reference, chapter }, ...]
function flattenVolume(raw, volName) {
    const out = [];
    if (volName === "Doctrine and Covenants") {
        raw.sections.forEach(sec =>
            sec.verses.forEach(v =>
                out.push({ text: v.text, reference: v.reference, chapter: sec })
            )
        );
    } else {
        raw.books.forEach(book =>
            book.chapters.forEach(chap =>
                chap.verses.forEach(v =>
                    out.push({ text: v.text, reference: v.reference, chapter: chap })
                )
            )
        );
    }
    return out;
}

function sample(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomVerse() {
    if (activeVolumes.length === 0) {
        return { text: `No volumes selected — please check at least one.`, reference: `` };
    }
    const vol    = sample(activeVolumes);
    const verses = volumeVerseLists[vol];
    return sample(verses);
}

function displayRandomVerse() {
    const { text, reference } = getRandomVerse();
    const el = document.getElementById("scriptureVerse");
    el.innerHTML = reference
        ? `<p><strong>${reference}</strong></p><p>${text}</p>`
        : `<p>${text}</p>`;
}

function saveVolumeState() {
    localStorage.setItem("flipnliken-volumes", JSON.stringify(activeVolumes));
}

function loadVolumeState() {
    const saved = localStorage.getItem("flipnliken-volumes");
    if (!saved) return;
    const savedVolumes = JSON.parse(saved);
    document.querySelectorAll("#volumeToggles input").forEach(cb => {
        cb.checked = savedVolumes.includes(cb.dataset.volume);
    });
}

function updateActiveVolumes() {
    activeVolumes = Array.from(document.querySelectorAll("#volumeToggles input"))
        .filter(cb => cb.checked)
        .map(cb => cb.dataset.volume);
    saveVolumeState();
}

window.addEventListener("DOMContentLoaded", async () => {
    // hamburger, same as siteplan
    const hamburger = document.getElementById("hamburger");
    const navList   = document.querySelector("nav ul");
    hamburger.addEventListener("click", () => {
        navList.classList.toggle("show");
        hamburger.textContent = navList.classList.contains("show") ? `\u2715` : `\u2630`;
    });

    // year and the modified thingy
    document.getElementById("currentyear").textContent = `${new Date().getFullYear()}`;
    document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;

    try {
        await Promise.all(
            Object.entries(volumeFiles).map(async ([vol, url]) => {
                const resp = await fetch(url, { cache: "force-cache" });
                if (!resp.ok) throw new Error(`Failed loading ${url}`);
                const data = await resp.json();
                volumeDataMap[vol]    = data;
                volumeVerseLists[vol] = flattenVolume(data, vol);
            })
        );

        // put saved checkboxes back
        loadVolumeState();
        document.querySelectorAll("#volumeToggles input")
            .forEach(cb => cb.addEventListener("change", updateActiveVolumes));
        document.getElementById("flipnlikenButton")
            .addEventListener("click", displayRandomVerse);

        updateActiveVolumes();
        displayRandomVerse();
    } catch (err) {
        console.error(err);
        document.getElementById("scriptureVerse").textContent =
            `⚠️ Error loading scriptures. See console.`;
    }
});
