/*!
 * Sakura.js 1.1.1 - Custom
 * Vanilla JS version of jQuery-Sakura: Make it rain sakura petals.
 * https://github.com/jhammann/sakura
 *
 * Custom version to ensure petals fall to the bottom of the page.
 * Released under the MIT License
 */
"use strict";

var Sakura = function Sakura(selector, options) {
  var _this = this;

  // Pastikan ada elemen target yang valid
  if (typeof selector === 'undefined') {
    throw new Error('No selector present. Define an element.');
  }

  // Elemen target tempat kelopak jatuh
  this.el = document.querySelector(selector);

  // Pengaturan default
  var defaults = {
    className: 'sakura',       // Kelas CSS untuk kelopak
    fallSpeed: 1,             // Faktor kecepatan jatuh (lebih tinggi lebih lambat)
    maxSize: 14,              // Ukuran maksimum kelopak
    minSize: 10,              // Ukuran minimum kelopak
    delay: 300,               // Jeda antar kelopak
    colors: [                 // Warna kelopak (array gradient warna)
      {
        gradientColorStart: 'rgba(255, 183, 197, 0.9)',
        gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
        gradientColorDegree: 120
      }
    ]
  };

  // Gabungkan pengaturan default dengan opsi pengguna
  var extend = function extend(originalObj, newObj) {
    Object.keys(originalObj).forEach(function (key) {
      if (newObj && Object.prototype.hasOwnProperty.call(newObj, key)) {
        var origin = originalObj;
        origin[key] = newObj[key];
      }
    });
    return originalObj;
  };

  // Pengaturan akhir
  this.settings = extend(defaults, options);

  // Sembunyikan scrollbar horizontal pada elemen target
  this.el.style.overflowX = 'hidden';

  // Fungsi pembantu untuk mendapatkan elemen array acak
  function randomArrayElem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Fungsi pembantu untuk mendapatkan angka integer acak dalam rentang
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Prefix event untuk animasi
  var prefixes = ['webkit', 'moz', 'MS', 'o', ''];

  function PrefixedEvent(element, type, callback) {
    for (var p = 0; p < prefixes.length; p += 1) {
      var animType = type;
      if (!prefixes[p]) {
        animType = type.toLowerCase();
      }
      element.addEventListener(prefixes[p] + animType, callback, false);
    }
  }

  // Fungsi untuk membuat kelopak baru
  this.createPetal = function () {
    if (_this.el.dataset.sakuraAnimId) {
      setTimeout(function () {
        window.requestAnimationFrame(_this.createPetal);
      }, _this.settings.delay);
    }

    // Nama animasi sesuai dengan file CSS
    var animationNames = {
      blowAnimations: ['blow-soft-left', 'blow-medium-left', 'blow-soft-right', 'blow-medium-right'],
      swayAnimations: ['sway-0', 'sway-1', 'sway-2', 'sway-3', 'sway-4', 'sway-5', 'sway-6', 'sway-7', 'sway-8']
    };

    // Pilih animasi acak
    var blowAnimation = randomArrayElem(animationNames.blowAnimations);
    var swayAnimation = randomArrayElem(animationNames.swayAnimations);

    // Tentukan waktu jatuh
    var fallTime = (document.documentElement.clientHeight * 0.007 + Math.round(Math.random() * 5)) * _this.settings.fallSpeed;

    // Gabungkan animasi
    var animationsArr = [
      `fall ${fallTime}s linear 0s 1`,
      `${blowAnimation} ${(fallTime > 30 ? fallTime : 30) - 20 + randomInt(0, 20)}s linear 0s infinite`,
      `${swayAnimation} ${randomInt(2, 4)}s linear 0s infinite`
    ];
    var animations = animationsArr.join(', ');

    // Buat elemen kelopak
    var petal = document.createElement('div');
    petal.classList.add(_this.settings.className);
    var height = randomInt(_this.settings.minSize, _this.settings.maxSize);
    var width = height - Math.floor(randomInt(0, _this.settings.minSize) / 3);
    var color = randomArrayElem(_this.settings.colors);

    // Gaya kelopak
    petal.style.background = `linear-gradient(${color.gradientColorDegree}deg, ${color.gradientColorStart}, ${color.gradientColorEnd})`;
    petal.style.webkitAnimation = animations;
    petal.style.animation = animations;
    petal.style.borderRadius = `${randomInt(_this.settings.maxSize, _this.settings.maxSize + Math.floor(Math.random() * 10))}px ${randomInt(1, Math.floor(width / 4))}px`;
    petal.style.height = `${height}px`;
    petal.style.left = `${Math.random() * document.documentElement.clientWidth - 100}px`;
    petal.style.marginTop = `-${Math.floor(Math.random() * 20) + 15}px`;
    petal.style.width = `${width}px`;

    // Hapus kelopak jika keluar dari viewport (bagian bawah)
    PrefixedEvent(petal, 'AnimationEnd', function () {
      var petalTop = petal.getBoundingClientRect().top;
      if (petalTop > window.innerHeight) {
        petal.remove();
      }
    });

    // Tambahkan kelopak ke elemen target
    _this.el.appendChild(petal);
  };

  // Inisialisasi animasi kelopak
  this.el.setAttribute('data-sakura-anim-id', window.requestAnimationFrame(this.createPetal));
};

// Metode untuk memulai animasi
Sakura.prototype.start = function () {
  var animId = this.el.dataset.sakuraAnimId;
  if (!animId) {
    this.el.setAttribute('data-sakura-anim-id', window.requestAnimationFrame(this.createPetal));
  } else {
    throw new Error('Sakura is already running.');
  }
};

// Metode untuk menghentikan animasi
Sakura.prototype.stop = function () {
  var _this2 = this;
  var graceful = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var animId = this.el.dataset.sakuraAnimId;

  if (animId) {
    window.cancelAnimationFrame(animId);
    this.el.setAttribute('data-sakura-anim-id', '');
  }

  // Menghapus semua kelopak saat animasi berhenti
  if (!graceful) {
    setTimeout(function () {
      var petals = document.getElementsByClassName(_this2.settings.className);
      while (petals.length > 0) {
        petals[0].parentNode.removeChild(petals[0]);
      }
    }, this.settings.delay + 50);
  }
};
