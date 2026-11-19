// Mode 4: Buaya Owi yang Rakus (Membandingkan Bilangan: >, <, =)
// Konsep CPA: Piring Kiri vs Piring Kanan -> Mulut Buaya Rakus memakan yang Lebih Banyak!

class ComparisonGame {
  constructor(containerId, onComplete) {
    this.container = document.getElementById(containerId);
    this.onComplete = onComplete;
    this.numLeft = 4;
    this.numRight = 7;
    this.correctSymbol = '<'; // '<', '>', '='
    this.level = 1;
  }

  start(level = 1) {
    this.level = level;
    let max = 5;
    if (this.level === 2) max = 10;
    if (this.level === 3) max = 20;

    // 25% chance of being equal
    const isEqual = Math.random() < 0.25;

    if (isEqual) {
      this.numLeft = Math.floor(Math.random() * (max - 1)) + 1;
      this.numRight = this.numLeft;
      this.correctSymbol = '=';
    } else {
      this.numLeft = Math.floor(Math.random() * max) + 1;
      do {
        this.numRight = Math.floor(Math.random() * max) + 1;
      } while (this.numRight === this.numLeft);

      this.correctSymbol = this.numLeft > this.numRight ? '>' : '<';
    }

    this.render();

    const voicePrompt = `Buaya Owi lapar! Piring mana yang punya makanan lebih banyak? Pilih mulut buaya yang tepat!`;
    window.soundEngine.speak(voicePrompt);
  }

  render() {
    this.container.innerHTML = `
      <div class="game-board comparison-board">
        <!-- Banner -->
        <div class="mission-banner">
          <div class="mascot-avatar" id="croc-banner-avatar"></div>
          <div class="mission-text-bubble">
            <span class="mission-speaker">Buaya Owi si Rakus:</span>
            <span class="mission-instruction">Mulut Owi selalu mencaplok makanan yang <strong>LEBIH BANYAK</strong>!</span>
          </div>
          <button class="audio-replay-btn" id="replay-comparison-voice" title="Dengarkan Suara">🔊</button>
        </div>

        <!-- Comparison Stage: Left Plate vs Middle Croc Slot vs Right Plate -->
        <div class="comparison-stage">
          <!-- Left Pile -->
          <div class="comp-pile-card" id="left-pile-card">
            <div class="comp-number-badge">${this.numLeft}</div>
            <div class="comp-plate" id="left-comp-plate"></div>
          </div>

          <!-- Middle Target Gator Symbol -->
          <div class="comp-center-slot" id="gator-slot">
            <div class="gator-placeholder" id="gator-display">
              <span class="gator-qmark">?</span>
            </div>
          </div>

          <!-- Right Pile -->
          <div class="comp-pile-card" id="right-pile-card">
            <div class="comp-number-badge">${this.numRight}</div>
            <div class="comp-plate" id="right-comp-plate"></div>
          </div>
        </div>

        <!-- Comparison Choices Bar (3 Gator Cards) -->
        <div class="gator-choices-container">
          <!-- Greater than (Mouth opens left) -->
          <button class="gator-choice-btn" id="choice-greater" data-symbol=">">
            <div class="gator-mini-preview">${window.mascotManager.getGatorSVG('greater')}</div>
            <div class="choice-symbol-label">> (Kiri Lebih Banyak)</div>
          </button>

          <!-- Equal to (Mouth smiles equal =) -->
          <button class="gator-choice-btn" id="choice-equal" data-symbol="=">
            <div class="gator-mini-preview">${window.mascotManager.getGatorSVG('equal')}</div>
            <div class="choice-symbol-label">= (Sama Banyak)</div>
          </button>

          <!-- Less than (Mouth opens right) -->
          <button class="gator-choice-btn" id="choice-less" data-symbol="<">
            <div class="gator-mini-preview">${window.mascotManager.getGatorSVG('less')}</div>
            <div class="choice-symbol-label">< (Kanan Lebih Banyak)</div>
          </button>
        </div>
      </div>
    `;

    // Render Croc Avatar
    const crocAvatar = document.getElementById('croc-banner-avatar');
    if (crocAvatar) {
      crocAvatar.innerHTML = window.mascotManager.getGatorSVG('greater');
    }

    // Populate Left & Right plates
    this.populatePlate('left-comp-plate', this.numLeft);
    this.populatePlate('right-comp-plate', this.numRight);

    // Bind Choice Buttons
    ['choice-greater', 'choice-equal', 'choice-less'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.onclick = () => {
          this.handleChoice(btn.dataset.symbol, btn);
        };
      }
    });

    document.getElementById('replay-comparison-voice').onclick = () => {
      window.soundEngine.speak(`Piring kiri ada ${this.numLeft}, piring kanan ada ${this.numRight}. Buaya Owi harus menghadap ke mana?`, true);
    };
  }

  populatePlate(plateId, count) {
    const el = document.getElementById(plateId);
    if (!el) return;
    el.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const strawberry = document.createElement('div');
      strawberry.className = 'interactive-food pop-item';
      strawberry.innerHTML = ItemsCatalog.getStrawberrySVG(44);
      strawberry.onclick = () => {
        window.soundEngine.playPop(400 + i * 25);
        strawberry.classList.add('wobble-item');
        setTimeout(() => strawberry.classList.remove('wobble-item'), 250);
      };
      el.appendChild(strawberry);
    }
  }

  handleChoice(symbol, btnElement) {
    const display = document.getElementById('gator-display');

    if (symbol === this.correctSymbol) {
      // CORRECT!
      window.soundEngine.playSuccess();
      window.soundEngine.playMunch();

      // Put Gator in slot
      let gatorType = 'greater';
      if (symbol === '<') gatorType = 'less';
      if (symbol === '=') gatorType = 'equal';

      display.innerHTML = window.mascotManager.getGatorSVG(gatorType);
      display.classList.add('gator-chomp-anim');

      btnElement.classList.add('btn-choice-correct');

      let explanation = '';
      if (symbol === '>') {
        explanation = `Hebat! ${this.numLeft} lebih banyak dari ${this.numRight}! Nyam nyam!`;
      } else if (symbol === '<') {
        explanation = `Pintar! ${this.numRight} lebih banyak dari ${this.numLeft}! Owi kenyang!`;
      } else {
        explanation = `Tepat sekali! Jumlahnya sama banyak yaitu ${this.numLeft}!`;
      }

      window.soundEngine.speak(explanation, true);

      setTimeout(() => {
        this.showCelebrationModal();
      }, 900);
    } else {
      window.soundEngine.playGentleTryAgain();
      btnElement.classList.add('btn-choice-wrong');
      setTimeout(() => btnElement.classList.remove('btn-choice-wrong'), 500);

      window.soundEngine.speak('Coba hitung lagi makanan di setiap piring ya! Owi selalu mau yang lebih banyak!', true);
    }
  }

  showCelebrationModal() {
    window.soundEngine.playCheer();
    const modal = document.createElement('div');
    modal.className = 'reward-modal-overlay';
    modal.innerHTML = `
      <div class="reward-modal-card bounce-in">
        <div class="reward-stars">⭐⭐⭐</div>
        <h2>OWI SANGAT SENANG! 🐊</h2>
        <p><strong>${this.numLeft} ${this.correctSymbol} ${this.numRight}</strong></p>
        <p>Kamu sudah jago membandingkan banyak benda!</p>
        <div class="reward-graphic">
          ${window.mascotManager.getGatorSVG(this.correctSymbol === '>' ? 'greater' : (this.correctSymbol === '<' ? 'less' : 'equal'))}
        </div>
        <div class="reward-actions">
          <button class="btn-primary-fun" id="next-comp-round">Main Lagi 🚀</button>
          <button class="btn-secondary-fun" id="exit-comp-btn">Menu Utama 🏠</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    if (window.triggerConfetti) window.triggerConfetti();

    document.getElementById('next-comp-round').onclick = () => {
      modal.remove();
      this.start(this.level);
    };

    document.getElementById('exit-comp-btn').onclick = () => {
      modal.remove();
      if (this.onComplete) this.onComplete();
    };
  }
}

window.ComparisonGame = ComparisonGame;
