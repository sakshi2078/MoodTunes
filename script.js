
// form
const addSongformDisplay = document.getElementById('add-song');
const form = document.querySelector('form');
const submitBtn = document.getElementById('addSong');

// card
const songName = document.getElementById("song-name");
const artistName = document.getElementById('artist-name');
const moods = document.getElementById('mood');
const songLink = document.getElementById('song-link');
const iframes = document.querySelectorAll('iframe');

// localStorage cards
let moodboardStorage = [];
const storedData = JSON.parse(localStorage.getItem("moodboard"));
moodboardStorage = storedData || [];


//display on moodboard
let moodBoardDisplay = document.getElementById('moodboard');
const moodBoardTitle = document.getElementById('moodboard-title');

//fitler
const filterBtns = document.querySelectorAll('.category');
const cards = document.getElementsByClassName('card');

document.addEventListener('DOMContentLoaded', () => {
    if (storedData) {
        moodBoardTitle.style.display = 'none';
        storedData.forEach(element => displayCard(element));
    }
    else {
        moodBoardTitle.style.display = 'block';
        console.log("no data found");
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addSongMoodBoard();
    submitBtn.disabled = true;
});

addSongformDisplay.addEventListener('click', () => {
    form.style.display = 'block';
    submitBtn.disabled = false;
    form.reset();
})

function addSongMoodBoard() {
    try {
        let card = {
            name: songName.value,
            artist: artistName.value,
            mood: moods.value,
            link: songLink.value
        }
        moodboardStorage.push(card);
        displayCard(card);
        localStorage.setItem("moodboard", JSON.stringify(moodboardStorage));
        form.style.display = 'none';
        form.reset();
    }
    catch (error) {
        console.error(error);
    }
}

function displayCard(element) {
    try {
        moodBoardTitle.style.display = 'none';
        moodBoardDisplay.innerHTML += `
    <div class="card ${element.mood}">
        <h3 class="card-title">${element.name} - ${element.artist}</h3>
        <div class="mood-tag">${element.mood}</div>
        ${element.link}
    </div>
    `;
    }
    catch (error) {
        console.error(error);
    }
}

filterBtns.forEach(btn =>
    btn.addEventListener('click', (e) => {
        const moodChoice = e.target.value;
        Array.from(cards).forEach(element => {
            if (moodChoice === "all" || element.classList.contains(moodChoice)) {
                element.style.display = 'block';
            }
            else {
                element.style.display = 'none';
            }
        })
    }
    )
);