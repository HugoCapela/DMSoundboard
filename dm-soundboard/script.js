// ===== SOUND LIST =====
/* const sounds = [
    {
        "id": "paperback",
        "artist": "Diffie Bosman",
        "label": "Diffie Bosman - Paperback",
        "source": "Music by Bensound.com",
        "file": "sounds/ambience/Diffie Bosman - Paperback - Music by Bensound.com.mp3",
        "category": "ambience"
    },
    {
        "id": "campfire-sound",
        "artist": "SoundsForYou",
        "label": "SoundsForYou - Campfire Sound",
        "source": "Pixabay",
        "file": "sounds/ambience/SoundsForYou - Campfire Sound - Pixabay.mp3",
        "category": "ambience"
    },
    {
        "id": "forest-with-birds-chirping",
        "artist": "SoundsForYou",
        "label": "SoundsForYou - Forest with Birds Chirping",
        "source": "Pixabay",
        "file": "sounds/ambience/SoundsForYou - Forest with Birds Chirping - Pixabay.mp3",
        "category": "ambience"
    },
    {
        "id": "ocean-sea-soft-waves",
        "artist": "SoundsForYou",
        "label": "SoundsForYou - Ocean Sea Soft Waves",
        "source": "Pixabay",
        "file": "sounds/ambience/SoundsForYou - Ocean Sea Soft Waves - Pixabay.mp3",
        "category": "ambience"
    },
    {
        "id": "aeon",
        "artist": "Theatre of Delays",
        "label": "Theatre of Delays - Aeon",
        "source": "Music by Bensound.com",
        "file": "sounds/ambience/Theatre of Delays - Aeon - Music by Bensound.com.mp3",
        "category": "ambience"
    },
    {
        "id": "prism",
        "artist": "Theatre of Delays",
        "label": "Theatre of Delays - Prism",
        "source": "Music by Bensound.com",
        "file": "sounds/ambience/Theatre of Delays - Prism - Music by Bensound.com.mp3",
        "category": "ambience"
    },
    {
        "id": "slow-life",
        "artist": "Benjamin Lazzarus",
        "label": "Benjamin Lazzarus - Slow Life",
        "source": "Music by Bensound.com",
        "file": "sounds/cinematic/Benjamin Lazzarus - Slow Life - Music by Bensound.com.mp3",
        "category": "cinematic"
    },
    {
        "id": "event-horizon",
        "artist": "Lunar Years",
        "label": "Lunar Years - Event Horizon",
        "source": "Music by Bensound.com",
        "file": "sounds/cinematic/Lunar Years - Event Horizon - Music by Bensound.com.mp3",
        "category": "cinematic"
    },
    {
        "id": "echo-of-sadness",
        "artist": "TURNIQUE",
        "label": "TURNIQUE - Echo Of Sadness",
        "source": "Music by Bensound.com",
        "file": "sounds/cinematic/TURNIQUE - Echo Of Sadness - Music by Bensound.com.mp3",
        "category": "cinematic"
    },
    {
        "id": "epic",
        "artist": "Benjamin Tissot",
        "label": "Benjamin Tissot - Epic",
        "source": "Music by Bensound.com",
        "file": "sounds/combat/Benjamin Tissot - Epic - Music by Bensound.com.mp3",
        "category": "combat"
    },
    {
        "id": "extreme-action",
        "artist": "Benjamin Tissot",
        "label": "Benjamin Tissot - Extreme Action",
        "source": "Music by Bensound.com",
        "file": "sounds/combat/Benjamin Tissot - Extreme Action - Music by Bensound.com.mp3",
        "category": "combat"
    },
    {
        "id": "high-octane",
        "artist": "Benjamin Tissot",
        "label": "Benjamin Tissot - High Octane",
        "source": "Music by Bensound.com",
        "file": "sounds/combat/Benjamin Tissot - High Octane - Music by Bensound.com.mp3",
        "category": "combat"
    },
    {
        "id": "arrow-body-impact",
        "artist": "DennisH18",
        "label": "Arrow Body Impact",
        "source": "Pixabay",
        "file": "sounds/sfx/DennisH18 - Arrow Body Impact - Pixabay.mp3",
        "category": "sfx"
    },
    {
        "id": "heal-sound",
        "artist": "Dragon Studio",
        "label": "Heal Sound",
        "source": "Pixabay",
        "file": "sounds/sfx/Dragon Studio - Heal Sound - Pixabay.mp3",
        "category": "sfx"
    },
    {
        "id": "magic-spell-cast",
        "artist": "freesound_community",
        "label": "Magic Spell Cast",
        "source": "Pixabay",
        "file": "sounds/sfx/freesound_community - Magic Spell Cast - Pixabay.mp3",
        "category": "sfx"
    },
    {
        "id": "open-door-sound",
        "artist": "freesound_community",
        "label": "Open Door Sound",
        "source": "Pixabay",
        "file": "sounds/sfx/freesound_community - Open Door Sound - Pixabay.mp3",
        "category": "sfx"
    },
    {
        "id": "sword-sound",
        "artist": "freesound_community",
        "label": "Sword Sound",
        "source": "Pixabay",
        "file": "sounds/sfx/freesound_community - Sword Sound - Pixabay.mp3",
        "category": "sfx"
    },
    {
        "id": "wound-sound",
        "artist": "freesound_community",
        "label": "Wound Sound",
        "source": "Pixabay",
        "file": "sounds/sfx/freesound_community - Wound Sound - Pixabay.mp3",
        "category": "sfx"
    }
]; */

let sounds = [];

const CATEGORY_PALETTE = [
    "46,125,50",
    "21,101,192",
    "106,27,154",
    "198,40,40",
    "239,108,0",
    "0,131,143",
    "173,20,87",
    "69,90,100"
];

let activeButton = null;
const SFX_DUCK_VOLUME = 0.5;   // How quiet background gets during SFX
let activeSfxCount = 0;

// Store audio elements
const audioMap = {};
const categoryVolumes = {};
let playingByCategory = {};

function getCategories() {
    return [...new Set(sounds.map(sound => sound.category))];
}

function getCategoryColor(category) {
    let hash = 0;

    for (let i = 0; i < category.length; i++) {
        hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % CATEGORY_PALETTE.length;
    return CATEGORY_PALETTE[index];
}

function setCategoryVolume(category, volume) {
    categoryVolumes[category] = volume;

    Object.values(audioMap).forEach(audio => {
        if (audio.category === category) {
            audio.volume = volume;
        }
    });
}

function filterCategory(category) {
    document.querySelectorAll("section").forEach(section => {
        if (category === "all" || section.dataset.category === category) {
            section.style.display = "";
        } else {
            section.style.display = "none";
        }
    });
}

// Stop all sounds
function stopAll() {
    Object.values(audioMap).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

    if (activeButton) {
        activeButton.classList.remove("playing");
        activeButton = null;
    }
}

function playSound(sound, audio, button) {
    if (sound.category !== "sfx") {

        if (activeButton) {
            activeButton.classList.remove("playing");
        }

        // Stop same category
        if (playingByCategory[sound.category]) {
            playingByCategory[sound.category].pause();
            playingByCategory[sound.category].currentTime = 0;
        }

        // Combat interrupts ambience
        if (sound.category === "combat" && playingByCategory.ambience) {
            stopPlayingInCategory("ambience");
        }

        // Combat interrupts cinematic
        if (sound.category === "combat" && playingByCategory.cinematic) {
            stopPlayingInCategory("cinematic");
        }

        // Ambience interrupts combat
        if (sound.category === "ambience" && playingByCategory.combat) {
            stopPlayingInCategory("combat");
        }

        // Ambience interrupts cinematic
        if (sound.category === "ambience" && playingByCategory.cinematic) {
            stopPlayingInCategory("cinematic");
        }

        // Cinematic interrupts combat
        if (sound.category === "cinematic" && playingByCategory.combat) {
            stopPlayingInCategory("combat");
        }

        // Cinematic interrupts ambience
        if (sound.category === "cinematic" && playingByCategory.ambience) {
            stopPlayingInCategory("ambience");
        }

        // Set new active button
        activeButton = button;
        activeButton.classList.add("playing");

        playingByCategory[sound.category] = audio;
    }

    if (sound.category === "sfx") {
        button.classList.add("flash");
        setTimeout(() => button.classList.remove("flash"), 250);

        activeSfxCount++;
        duckBackgroundAudio();
        audio.addEventListener("ended", () => {
            activeSfxCount--;
            if (activeSfxCount <= 0) {
                restoreBackgroundAudio();
                activeSfxCount = 0;
            }
        });
    }

    audio.currentTime = 0;
    audio.play();
}

function stopPlayingInCategory(category) {
    playingByCategory[category].pause();
    playingByCategory[category].currentTime = 0;
    playingByCategory[category] = null;
}

function duckBackgroundAudio() {
    Object.values(playingByCategory).forEach(audio => {
        if (!audio) return;

        // Save original volume only once
        if (audio.dataset.originalVolume === undefined) {
            audio.dataset.originalVolume = audio.volume;
        }

        audio.volume = audio.dataset.originalVolume * SFX_DUCK_VOLUME;
    });
}

function restoreBackgroundAudio() {
    Object.values(playingByCategory).forEach(audio => {
        if (!audio) return;
        if (audio.dataset.originalVolume === undefined) return;

        audio.volume = Number(audio.dataset.originalVolume);
    });
}

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

// Create volume controls
function createVolumeControls(categories) {
    const volumeContainer = document.getElementById("volume-controls");
    if (!volumeContainer) return;
    volumeContainer.replaceChildren();

    volumeContainer.classList.add("volume-controls");

    categories.forEach(category => {
        categoryVolumes[category] = 1;

        const wrapper = document.createElement("div");
        wrapper.classList.add("volume-control");

        const label = document.createElement("label");

        if (category === "sfx") {
            label.textContent = category.toUpperCase();
        } else {
            label.textContent = `${capitalizeFirstLetter(category)}`;
        }

        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = 0;
        slider.max = 1;
        slider.step = 0.01;
        slider.value = 1;
        slider.dataset.volume = category;

        slider.addEventListener("input", e => {
            setCategoryVolume(slider.dataset.volume, e.target.value);
        });

        wrapper.appendChild(label);
        wrapper.appendChild(slider);
        volumeContainer.appendChild(wrapper);
    });
}

// Create category tabs
function createCategoryTabs(categories) {
    const tabsContainer = document.getElementById("category-tabs");
    if (!tabsContainer) return;
    tabsContainer.replaceChildren();

    tabsContainer.classList.add("category-tabs");

    // Add "All" tab first
    const allButton = document.createElement("button");
    allButton.textContent = "All";
    allButton.dataset.tab = "all";
    allButton.classList.add("active");

    tabsContainer.appendChild(allButton);

    categories.forEach((category, index) => {
        const button = document.createElement("button");

        if (category === "sfx") {
            button.textContent = category.toUpperCase();
        } else {
            button.textContent = capitalizeFirstLetter(category);
        }

        button.dataset.tab = category;
        tabsContainer.appendChild(button);
    });
}

// Create buttons + audio
function createSoundboard() {
    const board = document.getElementById("soundboard");
    if (!board) return;
    board.replaceChildren();

    const categoriesWithSounds = {};

    // Group sounds by category
    sounds.forEach(sound => {
        if (!categoriesWithSounds[sound.category]) {
            categoriesWithSounds[sound.category] = [];
        }
        categoriesWithSounds[sound.category].push(sound);
    });

    // Create sections
    Object.keys(categoriesWithSounds).forEach(category => {
        const section = document.createElement("section");

        section.dataset.category = category;

        const header = document.createElement("h2");
        header.textContent = category.toUpperCase();
        section.appendChild(header);

        const grid = document.createElement("div");
        grid.classList.add("soundboard-grid");

        categoriesWithSounds[category].forEach(sound => {
            const audio = new Audio(sound.file);
            audio.volume = categoryVolumes[sound.category];
            playingByCategory[sound.category] = audio;
            audio.category = sound.category;
            audioMap[sound.id] = audio;

            const button = document.createElement("button");
            button.classList.add(`category-${sound.category}`);
            const color = getCategoryColor(sound.category);
            button.style.setProperty("--category-color", color);

            const span = document.createElement("span");
            span.textContent = sound.label;
            button.appendChild(span);

            button.addEventListener("click", () => {
                playSound(sound, audio, button);
            });

            audio.addEventListener("ended", () => {
                if (activeButton !== button) return;

                button.classList.remove("playing");
                activeButton = null;

                if (playingByCategory[sound.category] === audio) {
                    playingByCategory[sound.category] = null;
                }

                if (audio.progressEl) {
                    audio.progressEl.style.width = "0%";
                }
            });

            grid.appendChild(button);
        });

        section.appendChild(grid);
        board.appendChild(section);
    });
}

function createStopButton() {
    const stopContainer = document.getElementById("stop-button");
    if (!stopContainer) return;

    const stopButton = document.createElement("button");
    stopButton.classList.add("stop");
    stopButton.textContent = "🛑 Stop All";

    stopButton.addEventListener("click", stopAll);

    stopContainer.appendChild(stopButton);
}

function createCredits() {
    const credits = document.getElementById("credits-container");
    if (!credits) return;

    const footer = document.createElement("footer");
    footer.classList.add("credits");

    const toggleButton = document.createElement("button");
    toggleButton.id = "toggleCredits";
    toggleButton.textContent = "Sound Credits";

    const list = document.createElement("ul");

    const uniqueCredits = new Map();

    sounds.forEach(sound => {
        if (!sound.artist || !sound.source) return;

        const key = `${sound.artist}||${sound.source}`;
        if (!uniqueCredits.has(key)) {
            uniqueCredits.set(key, {
                artist: sound.artist,
                source: sound.source
            });
        }
    });

    uniqueCredits.forEach(credit => {
        const li = document.createElement("li");
        li.textContent = `Artist: ${credit.artist} | Source: ${credit.source}`;
        list.appendChild(li);
    });

    toggleButton.addEventListener("click", () => {
        footer.classList.toggle("open");
    });

    footer.appendChild(toggleButton);
    footer.appendChild(list);
    credits.appendChild(footer);
}

// Load sounds from sounds.json file
async function loadSounds() {
    const response = await fetch("sounds.json");
    const rawSounds = await response.json();

    return rawSounds.map(sound => {

        return {
            id: sound.id,
            artist: sound.artist,
            label: sound.label,
            source: sound.source,
            file: sound.file,
            category: sound.category
        };
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    sounds = await loadSounds();
    initSoundboard(sounds);
});

function initSoundboard(loadedSounds) {
    const categories = getCategories();

    createVolumeControls(categories);
    createCategoryTabs(categories);
    createSoundboard();
    createStopButton();
    createCredits();

    document.querySelectorAll("[data-tab]").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".category-tabs button").forEach(b => b.classList.remove("active"));
            tab.classList.add("active");
            filterCategory(tab.dataset.tab);
        });
    });
}

// Init - using hardcoded sounds list instead of loading from file
/* document.addEventListener("DOMContentLoaded", () => {
    const categories = getCategories();

    createVolumeControls(categories);
    createCategoryTabs(categories);
    createSoundboard();
    createStopButton();
    createCredits();

    document.querySelectorAll("[data-tab]").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".category-tabs button").forEach(b => b.classList.remove("active"));
            tab.classList.add("active");
            filterCategory(tab.dataset.tab);
        });
    });
}); */