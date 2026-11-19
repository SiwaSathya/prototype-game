# 🏝️ Petualangan Matematika Ceria: Pulau Angka Ajaib
### Game Edukasi Matematika Super Interaktif untuk Anak SD Kelas 1 (Usia 6–7 Tahun)

Game ini dirancang khusus berdasarkan riset pedagogi pembelajaran usia dini dan **Kurikulum Merdeka (Fase A - Kelas 1 SD)**, dengan mengadopsi pendekatan **CPA (*Concrete - Pictorial - Abstract*)** serta mekanika game edukasi kelas dunia (seperti *Khan Academy Kids* dan *Todo Math*).

---

## 🧠 Landasan Pedagogi & Riset Pembelajaran

Anak usia 6–7 tahun masih berada pada tahap perkembangan kognitif **operasional konkret** (Jean Piaget). Memaksa anak menghafal angka dan rumus abstrak seperti $7 + 5 = 12$ secara langsung seringkali memicu ***Math Anxiety* (kecemasan matematika)**.

Agar matematika cepat masuk ke otak anak dan melekat kuat (*deep conceptual understanding*), game ini menerapkan 3 pilar:

### 1. Metode CPA (*Concrete - Pictorial - Abstract*)
1. **Concrete (Konkret):** Anak berinteraksi langsung dengan objek nyata secara digital (memetik apel manis, menyuapi donat ke mulut dinosaurus yang mengunyah, menggeser kue ke piring pesta).
2. **Pictorial (Piktorial/Visual):** Menggunakan media representasi standar internasional seperti **Ten-Frame (Kotak Sepuluh)** dan piring gabungan untuk memvisualisasikan relasi jumlah bilangan secara spasial (*subitizing*).
3. **Abstract (Simbolik):** Setelah konsep konkret dan visual dipahami, anak diperkenalkan dengan simbol formal angka dan tanda matematika ($+$, $-$, $>$, $<$, $=$).

### 2. Multi-Sensory & Micro-Rewards
* **Web Audio Procedural Synthesis:** Setiap sentuhan menghasilkan respons audio yang menyenangkan (suara *pop*, kunyahan *nyam-nyam*, akor kemenangan *chime*, dan musik latar marimba yang riang).
* **Narasi Suara Otomatis (Web Speech API):** Instruksi dibacakan secara otomatis dalam Bahasa Indonesia yang ramah, sehingga anak yang belum lancar membaca tetap bisa bermain mandiri.
* **Non-Punitive Feedback (Bebas Stres):** Tidak ada *Game Over* atau hukuman nilai yang menakuti anak. Kesalahan disambut dengan dorongan positif: *"Ayo coba hitung lagi bersama-sama!"*.
* **Buku Koleksi Stiker & Piala Bintang:** Setiap keberhasilan menghadiahkan bintang dan membuka stiker lucu yang tersimpan secara permanen di browser (*localStorage*).

---

## 🎮 5 Mode Permainan Interaktif

| Mode | Materi Kurikulum Merdeka | Mekanika Game Interaktif |
| :--- | :--- | :--- |
| 🍎 **Pesta Kebun Buah** | Mengenal Bilangan 1-20 & Berhitung | Memetik apel ke keranjang Kiki si Kelinci dan menyusunnya di dalam *Ten-Frame* (Kotak Sepuluh). Dilengkapi suara hitungan 1 per 1. |
| 🍩 **Dapur Donat Dino** | Konsep Penjumlahan (Menggabungkan) | Menggabungkan donat piring 1 dan piring 2 ke dalam nampan pesta, lalu menghitung totalnya ($A + B = C$). |
| 🦖 **Dino Yum-Yum yang Lapar** | Konsep Pengurangan (Mengambil/Memisahkan) | Menyuapi Dino sejumlah makanan. Dino membuka mulut dan mengunyah (*nyam!*), lalu anak menghitung sisa makanan di meja ($N - M = Sisa$). |
| 🐊 **Buaya Owi si Rakus** | Membandingkan Bilangan ($>$, $<$, $=$) | Maskot buaya rakus yang selalu membuka mulut ke arah piring dengan makanan lebih banyak (*Alligator Math*). |
| 🔺 **Taman Bentuk & Pola** | Geometri Dasar & Pola Berulang | Mencocokkan bangun datar (lingkaran, persegi, segitiga, bintang, hati) ke bayangannya, serta menebak kelanjutan pola gerbong kereta. |

---

## ⚙️ Tingkat Kesulitan (*Level Progression*)
Tersedia 3 tingkat kesulitan yang dapat diganti kapan saja:
1. **🌱 Level Mudah:** Bilangan 1 sampai 5 (Sangat cocok untuk pengenalan awal semester 1).
2. **⭐ Level Sedang:** Bilangan 1 sampai 10 (Standar kompetensi semester 1).
3. **🚀 Level Hebat:** Bilangan 1 sampai 20 (Tantangan berhitung dan penjumlahan dua digit).

---

## 🚀 Cara Menjalankan Game

Game ini dibuat dengan teknologi murni **HTML5, CSS3, dan Vanilla JavaScript**.
**Tidak membutuhkan instalasi *node_modules*, server rumit, ataupun koneksi internet khusus** (100% *zero-dependency* & *offline-ready*).

### Opsi 1: Buka Langsung di Browser
Cukup buka file `index.html` dengan mengklik dua kali atau seret ke browser pilihan Anda (Google Chrome, Safari, Edge, Firefox).

### Opsi 2: Jalankan via Python Local Server
Buka terminal pada folder ini dan jalankan:
```bash
python3 -m http.server 8000
```
Lalu buka di browser: `http://localhost:8000`

---

## 📂 Struktur File
```text
Game Prototype/
├── index.html               # Struktur utama, navigasi, dan antarmuka ramah anak
├── README.md                # Dokumentasi & panduan kurikulum
├── css/
│   └── styles.css           # Desain visual ceria, animasi awan, tombol 3D, dan tata letak responsif
└── js/
    ├── audio.js             # Sound engine synthesizer Web Audio API & pembaca suara Web Speech API
    ├── mascot.js            # Karakter kartun SVG interaktif dengan berbagai emosi (Dino, Kelinci, Buaya)
    ├── items.js             # Generator grafik vektor buah, donat, bentuk, dan ten-frame
    ├── stickers.js          # Sistem koleksi stiker & penyimpanan bintang (localStorage)
    ├── confetti.js          # Efek partikel kembang api/konfeti perayaan kemenangan
    ├── app.js               # Koordinator aplikasi utama, pemilihan level, dan navigasi menu
    └── modes/
        ├── counting.js      # Mode Pesta Kebun Buah (Berhitung & Ten-Frame)
        ├── addition.js      # Mode Dapur Donat Dino (Penjumlahan)
        ├── subtraction.js   # Mode Dino Yum-Yum (Pengurangan)
        ├── comparison.js    # Mode Buaya Owi (Membandingkan Bilangan)
        └── shapes.js        # Mode Taman Bentuk & Pola (Geometri & Pola)
```
