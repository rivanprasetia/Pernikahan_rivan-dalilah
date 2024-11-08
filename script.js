
// Set nama tamu
document.addEventListener('DOMContentLoaded', () => {

    // Logika untuk halaman konfirmasi
    if (window.location.pathname.includes('confirm.html')) {
        const params = new URLSearchParams(window.location.search);
        const name = params.get('id');

        // Cek apakah URL berisi parameter 'id' dengan nama

       const confirmButton = document.getElementById('confirm-button');
       if (!name) {
           alert('URL tidak valid. Harap akses halaman dengan link yang sudah di sediakan');
       } else {
        if (confirmButton) {
             confirmButton.disabled = false;
             confirmButton.addEventListener('click', () => {
             window.location.href = '/Pernikahan_rivan-dalilah/index.html';
                    });        
           }
           

       }
    
         

        const confirmButton = document.getElementById('confirm-button');
        if (confirmButton) {
            confirmButton.addEventListener('click', () => {
                window.location.href = '/Pernikahan_rivan-dalilah/index.html';
            });
        }
    }

    // Logika untuk halaman index
    if (window.location.pathname.includes('/Penikahan_rivan-dalilah/')) {
        const guestName = sessionStorage.getItem('guestName');

        // Decode URI jika data diambil dari parameter URL
        const decodedName = guestName ? decodeURIComponent(guestName) : '';

        // Jika sessionStorage kosong atau tidak ada guestName, alihkan kembali ke confirm.html
        if (!decodedName) {
            window.location.href = '/Pernikahan_rivan-dalilah/confirm.html'; // Ubah sesuai path
        } else {
            const nameDisplay = document.createElement('h2');
            nameDisplay.textContent = `Selamat datang, ${decodedName}!`;
            document.body.prepend(nameDisplay);
        }

    }
});




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

window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('guestName');
});



