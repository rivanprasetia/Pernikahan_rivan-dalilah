// Set tanggal pernikahan
const weddingDate = new Date("December 7, 2024 09:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = weddingDate - now;

    // Hitung hari, jam, menit, dan detik
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Tampilkan hasil di elemen
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    // Jika waktu habis, tampilkan pesan
    if (timeRemaining < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "<p>Selamat Berbahagia!</p>";
    }
}

// Perbarui hitungan setiap detik
const countdownInterval = setInterval(updateCountdown, 1000);

window.addEventListener('unload', () => {
    sessionStorage.removeItem('guestName');
});

//Tomobol

document.getElementById('button-action-akad').addEventListener('click', () => {
    // Open a new window or tab to display the map
    window.open('https://maps.app.goo.gl/woqU2AcdwabgpnTf8', '_blank');
});

document.getElementById('button-action-resepsi').addEventListener('click', () => {
    // Open a new window or tab to display the map
    window.open('https://maps.app.goo.gl/hz2wGfYGBQZXVaGc9', '_blank');
});


// Elements
const wishForm = document.getElementById('wish-form');
const wishesList = document.getElementById('wishes-list');

// Load existing wishes from JSON
async function loadWishes() {
    try {
        const response = await fetch('wishes.json');
        const data = await response.json();
        data.forEach(wish => addWishToDOM(wish.name, wish.message));
    } catch (error) {
        console.error("Error loading wishes:", error);
    }
}

// Save new wish to JSON file (simulated with localStorage for this example)
async function saveWish(wish) {
    let existingWishes = JSON.parse(localStorage.getItem('wishes')) || [];
    existingWishes.push(wish);
    localStorage.setItem('wishes', JSON.stringify(existingWishes));
}

// Add wish to the DOM
function addWishToDOM(name, message) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${name}</strong>: ${message}`;
    wishesList.appendChild(li);
}

// Handle form submission
wishForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !message) {
        alert("Nama dan ucapan tidak boleh kosong!");
        return;
    }

    const newWish = { name, message };
    addWishToDOM(name, message);
    await saveWish(newWish);

    // Clear the form
    wishForm.reset();
});

// Initialize the app
loadWishes();


// Sound Control
const soundIcon = document.getElementById('sound-icon');
const backgroundMusic = document.getElementById('background-music');

let isPlaying = false;

// Function to toggle music
function toggleMusic() {
    if (isPlaying) {
        backgroundMusic.pause();
        soundIcon.src = 'assets/icon/btn_stop.png'; // Ganti dengan ikon 'sound off'
    } else {
        backgroundMusic.play();
        soundIcon.src = 'assets/icon/btn_play.png'; // Ganti dengan ikon 'sound on'
    }
    isPlaying = !isPlaying;
}

// Event listener for sound control
soundIcon.addEventListener('click', toggleMusic);

window.addEventListener('load', () => {
    hiddenPlayBtn.click();


});

const dialogContainer = document.getElementById('welcome-dialog');
const closeDialogButton = document.getElementById('close-dialog');
const userNameSpan = document.getElementById('user-name');

// Ambil parameter dari URL (contoh: ?to=nama)
const urlParams = new URLSearchParams(window.location.search);
const userName = urlParams.get('to') || 'Tamu Istimewa';

// Tampilkan nama pengguna
userNameSpan.textContent = decodeURIComponent(userName);

// Tampilkan dialog saat pertama kali dimuat
window.onload = () => {
    dialogContainer.style.display = 'flex'; // Tampilkan dialog
};

// Fungsi untuk menutup dialog
closeDialogButton.addEventListener('click', () => {
    dialogContainer.style.display = 'none'; // Sembunyikan dialog
    backgroundMusic.play();
});


document.addEventListener('contextmenu', (event) => {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
        alert('Gambar ini dilindungi.');
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
        alert('Developer tools dinonaktifkan.');
        event.preventDefault();
    }
});



