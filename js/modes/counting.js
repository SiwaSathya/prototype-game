// Mode 1: Pesta Kebun Buah (Belajar Berhitung & Kotak Sepuluh / Ten-Frame)
// Konsep CPA: Sentuh buah nyata (Konkret), masuk ke kotak sepuluh (Piktorial), pilih angka (Abstrak)

class CountingGame {
  constructor(containerId, onComplete) {
    this.container = document.getElementById(containerId);
    this.onComplete = onComplete;
    this.targetNumber = 5;
    this.currentCount = 0;
    this.totalApples = 8;
    this.pickedApples = 0;
    this.level = 1; // 1: 1-5, 2: 1-10, 3: 1-20
    this.fruitType = 'apple';
  }

  start(level = 1) {
    this.level = level;
    this.currentCount = 0;
    this.pickedApples = 0;
    
    // Determine target based on level
    if (this.level === 1) {
      this.targetNumber = Math.floor(Math.random() * 4) + 2; // 2 - 5
      this.totalApples = Math.min(this.targetNumber + 2, 6);
    } else if (this.level === 2) {
      this.targetNumber = Math.floor(Math.random() * 5) + 6; // 6 - 10
      this.totalApples = Math.min(this.targetNumber + 2, 10);
    } else {
      this.targetNumber = Math.floor(Math.random() * 8) + 8; // 8 - 15
      this.totalApples = this.targetNumber + 2;
    }

    this.render();
    const prompt = `Ayo petik ${this.targetNumber} apel ke dalam keranjang!`;
    window.soundEngine.speak(prompt);
  }

  render() {
    this.container.innerHTML = `
      <div class="game-board counting-board">
        <!-- Header prompt -->
        <div class="mission-banner">
          <div class="mascot-avatar" id="counting-mascot"></div>
          <div class="mission-text-bubble">
            <span class="mission-speaker">Kiki si Kelinci:</span>
            <span class="mission-instruction">Petik <strong class="highlight-number">${this.targetNumber}</strong> apel manis ke dalam keranjang!</span>
          </div>
          <button class="audio-replay-btn" id="replay-voice-btn" title="Dengarkan Suara">🔊</button>
        </div>

        <!-- Interactive Playground -->
        <div class="counting-playground">
          <!-- Tree with apples -->
          <div class="tree-stage">
            <div class="tree-foliage">
              <div class="tree-trunk"></div>
              <div class="apples-canopy" id="apples-canopy">
                <!-- Apples populated dynamically -->
              </div>
            </div>
          </div>

          <!-- Basket & Ten-frame collector -->
          <div class="collector-stage">
            <div class="basket-box" id="basket-dropzone">
              <div class="basket-rim">🧺 Keranjang Kiki</div>
              <div class="basket-counter">
                <span id="basket-count" class="count-number">0</span> / <span class="target-number">${this.targetNumber}</span>
              </div>
            </div>

            <div class="ten-frame-wrapper">
              <div class="ten-frame-title">Kotak Sepuluh (Ten-Frame)</div>
              <div id="ten-frame-target">
                ${ItemsCatalog.renderTenFrame(0, 10, 'apple')}
              </div>
            </div>
          </div>
        </div>

        <!-- Action / Done Button -->
        <div class="control-action-bar">
          <button class="btn-secondary-fun" id="reset-counting-btn" style="margin-right: 10px;">
            Ulangi 🔄
          </button>
          <button class="btn-primary-fun" id="check-counting-btn">
            Selesai Memetik! ✨
          </button>
        </div>
      </div>
    `;

    // Render mascot
    window.mascotManager.renderMascot('counting-mascot', 'bunny', 'idle');

    // Populate apples on tree
    this.populateTreeApples();

    // Event listeners
    document.getElementById('replay-voice-btn').onclick = () => {
      window.soundEngine.speak(`Ayo petik ${this.targetNumber} apel ke dalam keranjang!`, true);
    };

    document.getElementById('reset-counting-btn').onclick = () => {
      this.resetApples();
      window.soundEngine.playBoing();
      window.soundEngine.speak('Ayo hitung dari awal lagi!');
    };

    document.getElementById('check-counting-btn').onclick = () => {
      this.checkResult();
    };
  }

  resetApples() {
    this.currentCount = 0;
    const countEl = document.getElementById('basket-count');
    if (countEl) countEl.innerText = '0';
    const tenFrameEl = document.getElementById('ten-frame-target');
    if (tenFrameEl) tenFrameEl.innerHTML = ItemsCatalog.renderTenFrame(0, 10, 'apple');
    document.querySelectorAll('.tree-apple').forEach(a => a.classList.remove('picked'));
    document.getElementById('check-counting-btn').classList.remove('glow-ready');
    window.mascotManager.renderMascot('counting-mascot', 'bunny', 'idle');
  }

  populateTreeApples() {
    const canopy = document.getElementById('apples-canopy');
    canopy.innerHTML = '';

    // Positions for apples spread naturally on foliage
    const positions = [
      { top: '15%', left: '20%' },
      { top: '22%', left: '50%' },
      { top: '18%', left: '75%' },
      { top: '40%', left: '15%' },
      { top: '42%', left: '38%' },
      { top: '38%', left: '65%' },
      { top: '45%', left: '82%' },
      { top: '60%', left: '26%' },
      { top: '62%', left: '52%' },
      { top: '58%', left: '74%' },
      { top: '72%', left: '40%' },
      { top: '70%', left: '62%' },
    ];

    for (let i = 0; i < this.totalApples; i++) {
      const pos = positions[i % positions.length];
      const appleDiv = document.createElement('div');
      appleDiv.className = 'tree-apple clickable-fruit';
      appleDiv.style.top = pos.top;
      appleDiv.style.left = pos.left;
      appleDiv.innerHTML = ItemsCatalog.getAppleSVG(52);
      appleDiv.dataset.index = i;

      // Click / Touch to pick
      appleDiv.onclick = (e) => {
        this.pickApple(appleDiv);
      };

      canopy.appendChild(appleDiv);
    }
  }

  pickApple(appleElement) {
    if (appleElement.classList.contains('picked')) return;

    appleElement.classList.add('picked');
    this.currentCount++;

    // Audio & Sound
    window.soundEngine.playPop(350 + this.currentCount * 45);
    window.soundEngine.speak(`${this.currentCount}`, true);

    // Update Counter
    const countEl = document.getElementById('basket-count');
    if (countEl) {
      countEl.innerText = this.currentCount;
      countEl.classList.add('pulse-pop');
      setTimeout(() => countEl.classList.remove('pulse-pop'), 250);
    }

    // Update Ten Frame
    const tenFrameEl = document.getElementById('ten-frame-target');
    if (tenFrameEl) {
      tenFrameEl.innerHTML = ItemsCatalog.renderTenFrame(this.currentCount, 10, 'apple');
    }

    // Bunny reaction
    if (this.currentCount === this.targetNumber) {
      window.mascotManager.renderMascot('counting-mascot', 'bunny', 'happy');
      // Subtle cue to child
      document.getElementById('check-counting-btn').classList.add('glow-ready');
    } else {
      window.mascotManager.renderMascot('counting-mascot', 'bunny', 'idle');
    }
  }

  checkResult() {
    if (this.currentCount === this.targetNumber) {
      // SUCCESS!
      window.soundEngine.playSuccess();
      window.mascotManager.renderMascot('counting-mascot', 'bunny', 'happy');
      window.soundEngine.speak(`Luar biasa! Kamu berhasil memetik tepat ${this.targetNumber} apel!`, true);

      // Trigger Celebration
      this.showCelebrationModal(true);
    } else if (this.currentCount < this.targetNumber) {
      // Need more
      window.soundEngine.playGentleTryAgain();
      window.mascotManager.renderMascot('counting-mascot', 'bunny', 'idle');
      const diff = this.targetNumber - this.currentCount;
      const msg = `Masih kurang ${diff} apel lagi. Ayo petik lagi!`;
      window.soundEngine.speak(msg, true);
      this.showFeedbackToast(msg);
    } else {
      // Too many, give friendly retry
      window.soundEngine.playGentleTryAgain();
      window.mascotManager.renderMascot('counting-mascot', 'bunny', 'idle');
      const over = this.currentCount - this.targetNumber;
      const msg = `Wah, kebanyakan ${over} apel. Ayo kita coba hitung pelan-pelan lagi!`;
      window.soundEngine.speak(msg, true);
      this.showFeedbackToast(msg);

      // Reset to try again cleanly
      setTimeout(() => {
        this.currentCount = 0;
        document.getElementById('basket-count').innerText = '0';
        document.getElementById('ten-frame-target').innerHTML = ItemsCatalog.renderTenFrame(0, 10, 'apple');
        document.querySelectorAll('.tree-apple').forEach(a => a.classList.remove('picked'));
      }, 1400);
    }
  }

  showFeedbackToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'feedback-toast';
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 1800);
  }

  showCelebrationModal() {
    window.soundEngine.playCheer();
    const modal = document.createElement('div');
    modal.className = 'reward-modal-overlay';
    modal.innerHTML = `
      <div class="reward-modal-card bounce-in">
        <div class="reward-stars">⭐⭐⭐</div>
        <h2>HEBAT SEKALI! 🎉</h2>
        <p>Kamu sudah pintar menghitung sampai <strong>${this.targetNumber}</strong>!</p>
        <div class="reward-graphic">
          ${ItemsCatalog.getAppleSVG(72)}
        </div>
        <div class="reward-actions">
          <button class="btn-primary-fun" id="next-counting-round">Main Lagi 🚀</button>
          <button class="btn-secondary-fun" id="exit-counting-btn">Pilih Menu 🏠</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Particle confetti
    if (window.triggerConfetti) window.triggerConfetti();

    document.getElementById('next-counting-round').onclick = () => {
      modal.remove();
      this.start(this.level);
    };

    document.getElementById('exit-counting-btn').onclick = () => {
      modal.remove();
      if (this.onComplete) this.onComplete();
    };
  }
}

window.CountingGame = CountingGame;
