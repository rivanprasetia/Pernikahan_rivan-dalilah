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



// Sound Control
const soundIcon = document.getElementById('sound-icon');
const backgroundMusic = document.getElementById('background-music');

let isPlaying = true;

// Function to toggle music
function toggleMusic() {
    if (isPlaying) {
        backgroundMusic.play();
        soundIcon.src = 'assets/icon/btn_play.png'; // Ganti dengan ikon 'sound on'
    } else {
        backgroundMusic.pause();
        soundIcon.src = 'assets/icon/btn_stop.png'; // Ganti dengan ikon 'sound off'
    }
    isPlaying = !isPlaying
}

// Event listener for sound control
soundIcon.addEventListener('click', toggleMusic);

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
    dialogContainer.style.display = 'none';
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
document.addEventListener('keydown', function (e) {
    if (e.key === 'PrintScreen') {
        alert("Screenshot dinonaktifkan.");
        e.preventDefault();
    }
});

document.addEventListener('keyup', function (e) {
    if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('Screenshot dinonaktifkan.');
    }
});
document.getElementById("copy-logo1").addEventListener("click", function() {
    copyToClipboard("nomor1");
});

document.getElementById("copy-logo2").addEventListener("click", function() {
    copyToClipboard("nomor2");
});

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Nomor berhasil disalin: " + text);
    }).catch(err => {
        alert("Gagal menyalin teks: " + err);
    });
}
const slider = document.querySelector('.slider');
const images = document.querySelectorAll('.slider img');
const totalImages = images.length;

let index = 0; // Indeks gambar saat ini

// Fungsi untuk memperbarui posisi slider
function updateSliderPosition() {
    slider.style.transition = 'transform 1s ease-in-out'; // Animasi perpindahan
    const offset = -index * 100; // Hitung offset berdasarkan indeks
    slider.style.transform = `translateX(${offset}%)`;
}

// Fungsi untuk slider looping
function autoSlide() {
    index++;
    if (index === totalImages) {
        // Kembali ke awal tanpa animasi untuk looping
        setTimeout(() => {
            slider.style.transition = 'none';
            index = 0;
            slider.style.transform = `translateX(0)`;
        }, 1000); // Waktu harus sama dengan durasi transisi (1s)
    }
    updateSliderPosition();
}

// Jalankan slider otomatis setiap 5 detik
setInterval(autoSlide, 10000); // 5000 ms = 5 detik
