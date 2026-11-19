// Mode 2: Dapur Donat Dino (Penjumlahan / Konsep Menggabungkan Benda)
// Konsep CPA: Piring A (Konkret) + Piring B (Konkret) -> Digabung ke Piring Pesta -> Simbol A + B = C (Abstrak)

class AdditionGame {
  constructor(containerId, onComplete) {
    this.container = document.getElementById(containerId);
    this.onComplete = onComplete;
    this.numA = 2;
    this.numB = 3;
    this.correctSum = 5;
    this.level = 1;
    this.merged = false;
  }

  start(level = 1) {
    this.level = level;
    this.merged = false;

    if (this.level === 1) {
      // Sum <= 5
      this.numA = Math.floor(Math.random() * 3) + 1; // 1 to 3
      this.numB = Math.floor(Math.random() * (5 - this.numA)) + 1;
    } else if (this.level === 2) {
      // Sum <= 10
      this.numA = Math.floor(Math.random() * 5) + 1; // 1 to 5
      this.numB = Math.floor(Math.random() * (10 - this.numA)) + 1;
    } else {
      // Sum <= 18
      this.numA = Math.floor(Math.random() * 6) + 4; // 4 to 9
      this.numB = Math.floor(Math.random() * 6) + 3; // 3 to 8
    }

    this.correctSum = this.numA + this.numB;
    this.render();

    const voicePrompt = `Ada ${this.numA} donat stroberi ditambah ${this.numB} donat cokelat. Berapa jumlah semuanya?`;
    window.soundEngine.speak(voicePrompt);
  }

  render() {
    this.container.innerHTML = `
      <div class="game-board addition-board">
        <!-- Banner -->
        <div class="mission-banner">
          <div class="mascot-avatar" id="addition-mascot"></div>
          <div class="mission-text-bubble">
            <span class="mission-speaker">Dino Momo:</span>
            <span class="mission-instruction">Ayo gabungkan donat! Berapa <strong>${this.numA} + ${this.numB}</strong>?</span>
          </div>
          <button class="audio-replay-btn" id="replay-addition-voice" title="Dengarkan Suara">🔊</button>
        </div>

        <!-- Visual Addition Stage -->
        <div class="addition-playground">
          <!-- Plate A -->
          <div class="plate-card plate-left">
            <div class="plate-title">Piring 1 (${this.numA})</div>
            <div class="plate-dish" id="plate-a"></div>
          </div>

          <!-- Plus Sign -->
          <div class="math-operator-bubble pulse-operator">+</div>

          <!-- Plate B -->
          <div class="plate-card plate-right">
            <div class="plate-title">Piring 2 (${this.numB})</div>
            <div class="plate-dish" id="plate-b"></div>
          </div>
        </div>

        <!-- Combined Big Plate / Visual Bridge -->
        <div class="merge-action-zone">
          <button class="btn-merge-action" id="merge-plates-btn">
            👇 Gabungkan Semua Donat ke Piring Pesta! 👇
          </button>
          <div class="merged-tray-container" id="merged-tray" style="display:none;">
            <div class="tray-label">🎉 Piring Pesta (Hitung Totalnya!)</div>
            <div class="tray-items-grid" id="tray-items"></div>
          </div>
        </div>

        <!-- Abstract Equation & Answer Choice Cards -->
        <div class="equation-box">
          <span class="eq-num">${this.numA}</span>
          <span class="eq-op">+</span>
          <span class="eq-num">${this.numB}</span>
          <span class="eq-op">=</span>
          <span class="eq-mystery" id="answer-box">?</span>
        </div>

        <!-- Answer Options (3 Large Cards for Easy Touch) -->
        <div class="answer-choices-container" id="answer-choices"></div>
      </div>
    `;

    // Render mascot
    window.mascotManager.renderMascot('addition-mascot', 'dino', 'idle');

    // Populate Plates
    this.populatePlate('plate-a', this.numA, 'donut');
    this.populatePlate('plate-b', this.numB, 'cookie');

    // Populate Answer Options
    this.renderAnswerOptions();

    // Event handlers
    document.getElementById('replay-addition-voice').onclick = () => {
      window.soundEngine.speak(`Berapa ${this.numA} ditambah ${this.numB}? Gabungkan donat dan hitung bersama!`, true);
    };

    document.getElementById('merge-plates-btn').onclick = () => {
      this.mergePlates();
    };
  }

  populatePlate(plateId, count, itemType) {
    const el = document.getElementById(plateId);
    if (!el) return;
    el.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const item = document.createElement('div');
      item.className = 'interactive-food pop-item';
      item.innerHTML = itemType === 'donut' ? ItemsCatalog.getDonutSVG(46) : ItemsCatalog.getCookieSVG(46);
      item.onclick = () => {
        window.soundEngine.playPop(420 + i * 30);
        item.classList.add('wobble-item');
        setTimeout(() => item.classList.remove('wobble-item'), 300);
      };
      el.appendChild(item);
    }
  }

  mergePlates() {
    if (this.merged) return;
    this.merged = true;

    window.soundEngine.playSuccess();
    window.soundEngine.speak('Bim salabim! Donat digabungkan! Sekarang hitung semuanya!', true);

    const mergeBtn = document.getElementById('merge-plates-btn');
    mergeBtn.style.display = 'none';

    const mergedTray = document.getElementById('merged-tray');
    mergedTray.style.display = 'block';
    mergedTray.classList.add('tray-appear');

    const trayItems = document.getElementById('tray-items');
    trayItems.innerHTML = '';

    // Add Plate A items
    for (let i = 0; i < this.numA; i++) {
      const item = document.createElement('div');
      item.className = 'interactive-food pop-item merged-a';
      item.innerHTML = ItemsCatalog.getDonutSVG(46);
      item.onclick = (e) => this.tapCountMergedItem(item);
      trayItems.appendChild(item);
    }

    // Add Plate B items
    for (let j = 0; j < this.numB; j++) {
      const item = document.createElement('div');
      item.className = 'interactive-food pop-item merged-b';
      item.innerHTML = ItemsCatalog.getCookieSVG(46);
      item.onclick = (e) => this.tapCountMergedItem(item);
      trayItems.appendChild(item);
    }

    window.mascotManager.renderMascot('addition-mascot', 'dino', 'happy');
  }

  tapCountMergedItem(el) {
    if (el.classList.contains('counted')) {
      el.classList.remove('counted');
      window.soundEngine.playPop(300);
      return;
    }
    el.classList.add('counted');
    const totalCounted = document.querySelectorAll('#tray-items .counted').length;
    window.soundEngine.playPop(350 + totalCounted * 35);
    window.soundEngine.speak(`${totalCounted}`, true);
  }

  renderAnswerOptions() {
    const choicesContainer = document.getElementById('answer-choices');
    choicesContainer.innerHTML = '';

    // Generate 3 unique options including the correct sum
    const options = new Set();
    options.add(this.correctSum);

    while (options.size < 3) {
      const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1);
      const val = this.correctSum + offset;
      if (val > 0 && val !== this.correctSum) {
        options.add(val);
      }
    }

    const shuffled = Array.from(options).sort(() => Math.random() - 0.5);

    shuffled.forEach(val => {
      const btn = document.createElement('button');
      btn.className = 'answer-card-btn';
      btn.innerText = val;
      btn.onclick = () => this.handleAnswerSelect(val, btn);
      choicesContainer.appendChild(btn);
    });
  }

  handleAnswerSelect(val, btnElement) {
    if (val === this.correctSum) {
      // CORRECT!
      window.soundEngine.playSuccess();
      window.soundEngine.playCheer();
      window.mascotManager.renderMascot('addition-mascot', 'dino', 'cheering');
      
      document.getElementById('answer-box').innerText = this.correctSum;
      document.getElementById('answer-box').classList.add('correct-highlight');

      btnElement.classList.add('btn-choice-correct');
      window.soundEngine.speak(`Pintar sekali! ${this.numA} ditambah ${this.numB} sama dengan ${this.correctSum}!`, true);

      setTimeout(() => {
        this.showCelebrationModal();
      }, 700);
    } else {
      // Friendly try again
      window.soundEngine.playGentleTryAgain();
      window.mascotManager.renderMascot('addition-mascot', 'dino', 'thinking');
      btnElement.classList.add('btn-choice-wrong');
      setTimeout(() => btnElement.classList.remove('btn-choice-wrong'), 500);

      window.soundEngine.speak('Hampir benar! Coba hitung lagi donat di piring pesta ya!', true);
    }
  }

  showCelebrationModal() {
    const modal = document.createElement('div');
    modal.className = 'reward-modal-overlay';
    modal.innerHTML = `
      <div class="reward-modal-card bounce-in">
        <div class="reward-stars">⭐⭐⭐</div>
        <h2>JUARA HITUNG! 🎉</h2>
        <p><strong>${this.numA} + ${this.numB} = ${this.correctSum}</strong></p>
        <div class="reward-graphic">
          ${ItemsCatalog.getDonutSVG(68)}
        </div>
        <div class="reward-actions">
          <button class="btn-primary-fun" id="next-addition-round">Lanjut Main 🚀</button>
          <button class="btn-secondary-fun" id="exit-addition-btn">Menu Utama 🏠</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    if (window.triggerConfetti) window.triggerConfetti();

    document.getElementById('next-addition-round').onclick = () => {
      modal.remove();
      this.start(this.level);
    };

    document.getElementById('exit-addition-btn').onclick = () => {
      modal.remove();
      if (this.onComplete) this.onComplete();
    };
  }
}

window.AdditionGame = AdditionGame;
