// Gamification & Sticker Book Collection for Grade 1 Kids
// Persists stars and unlocked collectibles in localStorage

class StickerBook {
  constructor() {
    this.storageKey = 'petualangan_matematika_progress_v1';
    this.stickersCatalog = [
      { id: 'bunny', name: 'Kiki Kelinci', emoji: '🐰', desc: 'Sahabat berhitung yang lincah' },
      { id: 'dino', name: 'Dino Momo', emoji: '🦖', desc: 'Dinosaurus pemakan donat' },
      { id: 'croc', name: 'Buaya Owi', emoji: '🐊', desc: 'Jago membandingkan angka' },
      { id: 'star_gold', name: 'Bintang Emas', emoji: '⭐', desc: 'Anak pintar matematika' },
      { id: 'trophy', name: 'Piala Juara', emoji: '🏆', desc: 'Juara tantangan hitung' },
      { id: 'rocket', name: 'Roket Angka', emoji: '🚀', desc: 'Terbang tinggi meraih cita-cita' },
      { id: 'apple', name: 'Apel Ajaib', emoji: '🍎', desc: 'Manis dan penuh energi' },
      { id: 'rainbow', name: 'Pelangi Ceria', emoji: '🌈', desc: 'Warna-warni dunia hitung' },
      { id: 'donut', name: 'Donat Bintang', emoji: '🍩', desc: 'Camilan pesta Dino' },
      { id: 'crown', name: 'Mahkota Pintar', emoji: '👑', desc: 'Raja & Ratu matematika kelas 1' },
      { id: 'cat', name: 'Kucing Imut', emoji: '🐱', desc: 'Teman setia belajar' },
      { id: 'balloon', name: 'Balon Terbang', emoji: '🎈', desc: 'Selalu gembira dan semangat' }
    ];

    this.data = this.loadProgress();
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    return {
      totalStars: 3,
      gamesPlayed: 0,
      unlockedStickers: ['bunny', 'dino'] // Start with two friendly starter stickers
    };
  }

  saveProgress() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  addStars(count = 3) {
    this.data.totalStars += count;
    this.data.gamesPlayed += 1;

    // Check if new sticker unlocked
    const lockedStickers = this.stickersCatalog.filter(s => !this.data.unlockedStickers.includes(s.id));
    let newlyUnlocked = null;

    if (lockedStickers.length > 0 && this.data.totalStars >= this.data.unlockedStickers.length * 3) {
      newlyUnlocked = lockedStickers[0];
      this.data.unlockedStickers.push(newlyUnlocked.id);
    }

    this.saveProgress();
    return newlyUnlocked;
  }

  getStars() {
    return this.data.totalStars;
  }

  openStickerBookModal() {
    window.soundEngine.playSuccess();
    const modal = document.createElement('div');
    modal.className = 'sticker-book-overlay';

    let gridHTML = '';
    this.stickersCatalog.forEach(sticker => {
      const isUnlocked = this.data.unlockedStickers.includes(sticker.id);
      gridHTML += `
        <div class="sticker-card ${isUnlocked ? 'unlocked' : 'locked'}">
          <div class="sticker-icon">${isUnlocked ? sticker.emoji : '🔒'}</div>
          <div class="sticker-name">${isUnlocked ? sticker.name : 'Terkunci'}</div>
          <div class="sticker-desc">${isUnlocked ? sticker.desc : 'Kumpulkan bintang!'}</div>
        </div>
      `;
    });

    modal.innerHTML = `
      <div class="sticker-book-card bounce-in">
        <div class="sticker-book-header">
          <h2>📖 Buku Koleksi Stiker Saya</h2>
          <div class="header-star-badge">⭐ ${this.data.totalStars} Bintang</div>
          <button class="close-book-btn" id="close-sticker-book">✕</button>
        </div>
        <p class="sticker-book-subtitle">Selesaikan permainan matematika untuk membuka stiker baru yang lucu!</p>
        
        <div class="stickers-grid">
          ${gridHTML}
        </div>

        <div class="sticker-book-footer">
          <button class="btn-primary-fun" id="back-to-play-btn">Kembali Bermain 🚀</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('close-sticker-book').onclick = () => modal.remove();
    document.getElementById('back-to-play-btn').onclick = () => modal.remove();
  }
}

window.stickerBook = new StickerBook();
