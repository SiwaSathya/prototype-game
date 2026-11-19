// Mode 3: Dino Yum-Yum yang Lapar (Pengurangan / Konsep Mengambil atau Memakan Benda)
// Konsep CPA: Ada N donat (Konkret) -> Dimakan Dino M buah (Mengambil) -> Dihitung sisanya -> N - M = Sisa (Abstrak)

class SubtractionGame {
  constructor(containerId, onComplete) {
    this.container = document.getElementById(containerId);
    this.onComplete = onComplete;
    this.totalItems = 6;
    this.eatenItems = 2;
    this.remainingItems = 4;
    this.currentEaten = 0;
    this.level = 1;
  }

  start(level = 1) {
    this.level = level;
    this.currentEaten = 0;

    if (this.level === 1) {
      // Total <= 5
      this.totalItems = Math.floor(Math.random() * 3) + 3; // 3 to 5
      this.eatenItems = Math.floor(Math.random() * (this.totalItems - 1)) + 1;
    } else if (this.level === 2) {
      // Total <= 10
      this.totalItems = Math.floor(Math.random() * 5) + 6; // 6 to 10
      this.eatenItems = Math.floor(Math.random() * (this.totalItems - 2)) + 1;
    } else {
      // Total <= 15
      this.totalItems = Math.floor(Math.random() * 6) + 10; // 10 to 15
      this.eatenItems = Math.floor(Math.random() * 6) + 2;
    }

    this.remainingItems = this.totalItems - this.eatenItems;
    this.render();

    const voicePrompt = `Dino sangat lapar! Beri makan Dino ${this.eatenItems} donat lezat!`;
    window.soundEngine.speak(voicePrompt);
  }

  render() {
    this.container.innerHTML = `
      <div class="game-board subtraction-board">
        <!-- Banner -->
        <div class="mission-banner">
          <div class="mascot-avatar" id="subtraction-avatar-small"></div>
          <div class="mission-text-bubble">
            <span class="mission-speaker">Dino Momo:</span>
            <span class="mission-instruction">Beri makan Dino <strong class="highlight-number">${this.eatenItems}</strong> donat! Sisa berapa ya?</span>
          </div>
          <button class="audio-replay-btn" id="replay-subtraction-voice" title="Dengarkan Suara">🔊</button>
        </div>

        <!-- Interactive Playground: Dino Mouth & Feeding Table -->
        <div class="subtraction-playground">
          <!-- Hungry Dino Zone (Target) -->
          <div class="dino-eating-zone" id="dino-target-mouth">
            <div class="mascot-large-stage" id="dino-large-mascot"></div>
            <div class="eat-counter-badge">
              Dimakan: <span id="eaten-count">0</span> / <span class="highlight-target">${this.eatenItems}</span>
            </div>
            <div class="hint-tap-sub">Sentuh / Berikan donat ke Dino! 🍩</div>
          </div>

          <!-- Snack Table with all items -->
          <div class="table-stage">
            <div class="table-surface-card">
              <div class="table-header">
                🍽️ Meja Makanan Mula-mula: <strong>${this.totalItems}</strong> donat
              </div>
              <div class="table-donuts-grid" id="table-donuts"></div>
            </div>
          </div>
        </div>

        <!-- Math Equation & Question -->
        <div class="equation-box">
          <span class="eq-num">${this.totalItems}</span>
          <span class="eq-op">-</span>
          <span class="eq-num" id="eq-eaten-display">${this.eatenItems}</span>
          <span class="eq-op">=</span>
          <span class="eq-mystery" id="sub-answer-box">?</span>
        </div>

        <!-- Answer Options Container -->
        <div class="answer-choices-container" id="sub-answer-choices" style="display:none;"></div>
      </div>
    `;

    // Render mascots
    window.mascotManager.renderMascot('subtraction-avatar-small', 'dino', 'idle');
    window.mascotManager.renderMascot('dino-large-mascot', 'dino', 'open_mouth');

    // Populate food on table
    this.populateTable();

    // Event listeners
    document.getElementById('replay-subtraction-voice').onclick = () => {
      window.soundEngine.speak(`Sentuh ${this.eatenItems} donat untuk memberi makan Dino! Lalu hitung sisanya!`, true);
    };
  }

  populateTable() {
    const table = document.getElementById('table-donuts');
    table.innerHTML = '';

    for (let i = 0; i < this.totalItems; i++) {
      const food = document.createElement('div');
      food.className = 'interactive-food table-food-item pop-item';
      food.innerHTML = ItemsCatalog.getDonutSVG(48);
      food.dataset.index = i;

      // Tap to feed Dino
      food.onclick = () => {
        this.feedDonutToDino(food);
      };

      table.appendChild(food);
    }
  }

  feedDonutToDino(foodElement) {
    if (foodElement.classList.contains('eaten')) return;

    if (this.currentEaten >= this.eatenItems) {
      window.soundEngine.speak('Dino sudah kenyang! Sekarang tebak sisa donat di meja ya!', true);
      return;
    }

    foodElement.classList.add('eaten');
    this.currentEaten++;

    // Audio & chewing animation
    window.soundEngine.playMunch();
    window.mascotManager.renderMascot('dino-large-mascot', 'dino', 'chewing');
    
    // Update counter
    document.getElementById('eaten-count').innerText = this.currentEaten;

    setTimeout(() => {
      if (this.currentEaten < this.eatenItems) {
        window.mascotManager.renderMascot('dino-large-mascot', 'dino', 'open_mouth');
      } else {
        // Dino is full!
        window.mascotManager.renderMascot('dino-large-mascot', 'dino', 'happy');
        window.soundEngine.playSuccess();
        window.soundEngine.speak(`Nyam! Enak sekali! Sekarang ada berapa donat yang tersisa di meja?`, true);
        this.revealAnswerChoices();
      }
    }, 450);
  }

  revealAnswerChoices() {
    const container = document.getElementById('sub-answer-choices');
    container.style.display = 'flex';
    container.classList.add('choices-appear');
    container.innerHTML = '';

    // Generate options including correct remainingItems
    const options = new Set();
    options.add(this.remainingItems);

    while (options.size < 3) {
      const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1);
      const val = this.remainingItems + offset;
      if (val >= 0 && val !== this.remainingItems && val <= this.totalItems) {
        options.add(val);
      }
    }

    const shuffled = Array.from(options).sort(() => Math.random() - 0.5);

    shuffled.forEach(val => {
      const btn = document.createElement('button');
      btn.className = 'answer-card-btn';
      btn.innerText = val;
      btn.onclick = () => this.handleAnswerSelect(val, btn);
      container.appendChild(btn);
    });
  }

  handleAnswerSelect(val, btnElement) {
    if (val === this.remainingItems) {
      // CORRECT!
      window.soundEngine.playSuccess();
      window.soundEngine.playCheer();
      window.mascotManager.renderMascot('dino-large-mascot', 'dino', 'cheering');

      document.getElementById('sub-answer-box').innerText = this.remainingItems;
      document.getElementById('sub-answer-box').classList.add('correct-highlight');

      btnElement.classList.add('btn-choice-correct');
      window.soundEngine.speak(`Hebat sekali! ${this.totalItems} dikurang ${this.eatenItems} sisa ${this.remainingItems}!`, true);

      setTimeout(() => {
        this.showCelebrationModal();
      }, 700);
    } else {
      window.soundEngine.playGentleTryAgain();
      window.mascotManager.renderMascot('dino-large-mascot', 'dino', 'thinking');
      btnElement.classList.add('btn-choice-wrong');
      setTimeout(() => btnElement.classList.remove('btn-choice-wrong'), 500);

      window.soundEngine.speak('Coba hitung lagi donat yang masih ada di atas meja!', true);
    }
  }

  showCelebrationModal() {
    const modal = document.createElement('div');
    modal.className = 'reward-modal-overlay';
    modal.innerHTML = `
      <div class="reward-modal-card bounce-in">
        <div class="reward-stars">⭐⭐⭐</div>
        <h2>HEBAT DAN PINTAR! 🎉</h2>
        <p><strong>${this.totalItems} - ${this.eatenItems} = ${this.remainingItems}</strong></p>
        <p>Dino Momo sangat kenyang dan senang berhitung bersamamu!</p>
        <div class="reward-graphic">
          ${ItemsCatalog.getDonutSVG(68)}
        </div>
        <div class="reward-actions">
          <button class="btn-primary-fun" id="next-subtraction-round">Main Lagi 🚀</button>
          <button class="btn-secondary-fun" id="exit-subtraction-btn">Menu Utama 🏠</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    if (window.triggerConfetti) window.triggerConfetti();

    document.getElementById('next-subtraction-round').onclick = () => {
      modal.remove();
      this.start(this.level);
    };

    document.getElementById('exit-subtraction-btn').onclick = () => {
      modal.remove();
      if (this.onComplete) this.onComplete();
    };
  }
}

window.SubtractionGame = SubtractionGame;
