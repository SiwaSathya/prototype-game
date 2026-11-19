// Main Application Controller for Petualangan Matematika Ceria
// Coordinates navigation, modes, difficulty settings, and audio controls

class App {
  constructor() {
    this.currentMode = null;
    this.currentDifficulty = 1; // 1: 1-5, 2: 1-10, 3: 1-20
    this.activeGameInstance = null;

    this.initDOM();
  }

  initDOM() {
    this.mainMenu = document.getElementById('main-menu-view');
    this.gameView = document.getElementById('game-play-view');
    this.gameContainer = document.getElementById('game-active-container');
    this.starCountDisplay = document.getElementById('top-star-count');

    this.bindEvents();
    this.updateStarsDisplay();
  }

  bindEvents() {
    // Mode Cards Selection
    document.querySelectorAll('.mode-card').forEach(card => {
      card.onclick = () => {
        const mode = card.dataset.mode;
        this.launchMode(mode);
      };
    });

    // Difficulty Buttons
    document.querySelectorAll('.diff-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentDifficulty = parseInt(btn.dataset.level, 10);
        window.soundEngine.playPop(500);

        const levelNames = {
          1: 'Level Mudah: Bilangan 1 sampai 5',
          2: 'Level Sedang: Bilangan 1 sampai 10',
          3: 'Level Hebat: Bilangan 1 sampai 20'
        };
        window.soundEngine.speak(levelNames[this.currentDifficulty], true);
      };
    });

    // Back to Menu Button
    document.getElementById('back-to-menu-btn').onclick = () => {
      this.returnToMenu();
    };

    // Sticker Book Button
    document.getElementById('open-sticker-btn').onclick = () => {
      window.stickerBook.openStickerBookModal();
    };

    // Sound Controls
    const soundToggle = document.getElementById('toggle-sound-btn');
    soundToggle.onclick = () => {
      const state = window.soundEngine.toggleSound();
      soundToggle.classList.toggle('muted', !state);
      soundToggle.innerText = state ? '🔊 Efek' : '🔇 Efek';
    };

    const musicToggle = document.getElementById('toggle-music-btn');
    musicToggle.onclick = () => {
      const state = window.soundEngine.toggleMusic();
      musicToggle.classList.toggle('muted', !state);
      musicToggle.innerText = state ? '🎵 Musik' : '🔇 Musik';
    };

    const voiceToggle = document.getElementById('toggle-voice-btn');
    voiceToggle.onclick = () => {
      const state = window.soundEngine.toggleVoice();
      voiceToggle.classList.toggle('muted', !state);
      voiceToggle.innerText = state ? '🗣️ Suara' : '🔇 Suara';
    };

    // Info Guide / Panduan Guru & Orang Tua
    document.getElementById('info-guide-btn').onclick = () => {
      this.openPedagogyGuideModal();
    };

    // Start background music on first user touch anywhere
    const startAudioOnTouch = () => {
      window.soundEngine.ensureContext();
      window.soundEngine.startBGM();
      window.removeEventListener('pointerdown', startAudioOnTouch);
    };
    window.addEventListener('pointerdown', startAudioOnTouch, { once: true });
  }

  updateStarsDisplay() {
    if (this.starCountDisplay) {
      this.starCountDisplay.innerText = window.stickerBook.getStars();
    }
  }

  launchMode(mode) {
    this.currentMode = mode;
    window.soundEngine.playSuccess();

    this.mainMenu.style.display = 'none';
    this.gameView.style.display = 'block';

    const onModeCompleted = () => {
      const newSticker = window.stickerBook.addStars(3);
      this.updateStarsDisplay();
      if (newSticker) {
        setTimeout(() => {
          this.showNewStickerUnlockedNotice(newSticker);
        }, 500);
      }
      this.returnToMenu();
    };

    // Clear previous
    this.gameContainer.innerHTML = '';

    if (mode === 'counting') {
      this.activeGameInstance = new window.CountingGame('game-active-container', onModeCompleted);
    } else if (mode === 'addition') {
      this.activeGameInstance = new window.AdditionGame('game-active-container', onModeCompleted);
    } else if (mode === 'subtraction') {
      this.activeGameInstance = new window.SubtractionGame('game-active-container', onModeCompleted);
    } else if (mode === 'comparison') {
      this.activeGameInstance = new window.ComparisonGame('game-active-container', onModeCompleted);
    } else if (mode === 'shapes') {
      this.activeGameInstance = new window.ShapesGame('game-active-container', onModeCompleted);
    }

    if (this.activeGameInstance) {
      this.activeGameInstance.start(this.currentDifficulty);
    }
  }

  returnToMenu() {
    window.soundEngine.playBoing();
    this.gameView.style.display = 'none';
    this.mainMenu.style.display = 'block';
    this.updateStarsDisplay();
    window.soundEngine.speak('Pilih petualangan matematika yang ingin kamu mainkan!', true);
  }

  showNewStickerUnlockedNotice(sticker) {
    window.soundEngine.playCheer();
    const modal = document.createElement('div');
    modal.className = 'reward-modal-overlay';
    modal.innerHTML = `
      <div class="reward-modal-card bounce-in">
        <div class="reward-stars">🎁 STIKER BARU TERBUKA!</div>
        <div style="font-size: 5rem; margin: 15px 0;">${sticker.emoji}</div>
        <h2>${sticker.name}</h2>
        <p>${sticker.desc}</p>
        <button class="btn-primary-fun" id="claim-sticker-btn">Buka Buku Stiker 📖</button>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('claim-sticker-btn').onclick = () => {
      modal.remove();
      window.stickerBook.openStickerBookModal();
    };
  }

  openPedagogyGuideModal() {
    window.soundEngine.playPop(520);
    const modal = document.createElement('div');
    modal.className = 'sticker-book-overlay';
    modal.innerHTML = `
      <div class="sticker-book-card bounce-in" style="max-width: 620px;">
        <div class="sticker-book-header">
          <h2>💡 Panduan Orang Tua & Guru</h2>
          <button class="close-book-btn" id="close-guide-btn">✕</button>
        </div>
        <div class="pedagogy-content">
          <p>Game ini dirancang khusus untuk anak <strong>SD Kelas 1 (Usia 6–7 Tahun)</strong> dengan kurikulum merdeka matematika Fase A menggunakan metode <strong>CPA (Concrete - Pictorial - Abstract)</strong>:</p>
          
          <div class="guide-item">
            <strong>1. Concrete (Konkret):</strong> Anak memanipulasi benda nyata (menyuap donat, memetik apel, menggeser buah). Tidak ada rumus kaku di awal!
          </div>
          <div class="guide-item">
            <strong>2. Pictorial (Piktorial):</strong> Penggunaan <em>Ten-Frame</em> (Kotak Sepuluh) dan nampan visual untuk membantu anak memahami relasi angka secara spasial.
          </div>
          <div class="guide-item">
            <strong>3. Abstract (Simbolik):</strong> Angka dan simbol matematika (+, -, >, <, =) dihadirkan setelah anak memahami secara visual dan taktil.
          </div>

          <div class="guide-item">
            <strong>4. Fitur Ramah Anak:</strong> Dilengkapi narasi suara otomatis bahasa Indonesia, efek suara ceria berbasis Web Audio API, umpan balik tanpa stres (tidak ada Game Over yang memarahi anak), dan reward stiker motivasi.
          </div>
        </div>
        <div class="sticker-book-footer">
          <button class="btn-primary-fun" id="got-it-btn">Siap Bermain! 🌟</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('close-guide-btn').onclick = () => modal.remove();
    document.getElementById('got-it-btn').onclick = () => modal.remove();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
