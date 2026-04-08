
const volumeFiles = {
  "Old Testament"           : "jsons/old-testament.json",
  "New Testament"           : "jsons/new-testament.json",
  "Book of Mormon"          : "jsons/book-of-mormon.json",
  "Doctrine and Covenants"  : "jsons/doctrine-and-covenants.json"
};

// in-memory caches (need to readup, not quite sure why this works)
const volumeDataMap    = {};
const volumeVerseLists = {};
let activeVolumes      = Object.keys(volumeFiles);

// flatten a volume into [ { text, reference, chapter } … ]
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

// pick'em at random
function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// pick one random verse
function getRandomVerse() {
  if (activeVolumes.length === 0) {
    return { text: "⚠️ No volumes selected", reference: "" };
  }
  const vol    = sample(activeVolumes);
  const verses = volumeVerseLists[vol];
  return sample(verses);
}

// make it a page
function displayRandomVerse() {
  const { text, reference } = getRandomVerse();
  const el = document.getElementById("scriptureVerse");
  el.innerHTML = `<p><strong>${reference}</strong></p><p>${text}</p>`;
}

// rebuild activeVolumes whenever a checkbox changes
function updateActiveVolumes() {
  activeVolumes = Array.from(
    document.querySelectorAll("#volumeToggles input")
  )
    .filter(cb => cb.checked)
    .map(cb => cb.dataset.volume);
}

// on load: fetch & flatten all the things
window.addEventListener("DOMContentLoaded", async () => {
  try {
    // fetch all JSONs
    await Promise.all(
      Object.entries(volumeFiles).map(async ([vol, url]) => {
        const resp = await fetch(url, { cache: "force-cache" });
        if (!resp.ok) throw new Error(`Failed loading ${url}`);
        const data = await resp.json();
        volumeDataMap[vol]    = data;
        volumeVerseLists[vol] = flattenVolume(data, vol);
      })
    );

    // toggle toggle like pacman
    document.querySelectorAll("#volumeToggles input")
      .forEach(cb => cb.addEventListener("change", updateActiveVolumes));

    // button button like the lady in the job movie
    document.getElementById("flipnlikenButton")
      .addEventListener("click", displayRandomVerse);

    // show one now
    updateActiveVolumes();   // sync with actual checkbox state on load
    displayRandomVerse();
  } catch (err) {
    console.error(err);
    document.getElementById("scriptureVerse").innerText =
      "⚠️ Error loading scriptures. See console.";
  }
});
