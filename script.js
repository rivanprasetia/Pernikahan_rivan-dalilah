// Set tanggal pernikahan
const weddingDate = new Date("December 12, 2024 10:00:00").getTime();

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
