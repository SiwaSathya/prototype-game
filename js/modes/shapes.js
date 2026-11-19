// Mode 5: Taman Bentuk & Pola Ajaib (Geometri Dasar & Pola Gambar Berulang)
// Sesuai Kurikulum Merdeka Fase A: Mengenal lingkaran, segitiga, persegi, dan melanjutkan pola

class ShapesGame {
  constructor(containerId, onComplete) {
    this.container = document.getElementById(containerId);
    this.onComplete = onComplete;
    this.shapesList = ['circle', 'square', 'triangle', 'star', 'heart'];
    this.shapeNamesID = {
      circle: 'Lingkaran',
      square: 'Persegi',
      triangle: 'Segitiga',
      star: 'Bintang',
      heart: 'Bentuk Hati'
    };
    this.currentMode = 'match'; // 'match' or 'pattern'
    this.level = 1;
  }

  start(level = 1) {
    this.level = level;
    // Alternate or pick mode based on level
    if (this.level === 1) {
      this.currentMode = 'match';
      this.startShapeMatch();
    } else {
      this.currentMode = 'pattern';
      this.startPatternGame();
    }
  }

  // Sub-game A: Mencocokkan Bentuk ke Bayangan (Shape Sorting)
  startShapeMatch() {
    // Pick 3 random distinct shapes
    const shuffled = [...this.shapesList].sort(() => Math.random() - 0.5);
    this.activeShapes = shuffled.slice(0, 3);
    this.matchedCount = 0;

    this.renderMatchView();
    window.soundEngine.speak('Ayo pasangkan bentuk ke tempat bayangan yang cocok!');
  }

  renderMatchView() {
    this.container.innerHTML = `
      <div class="game-board shapes-board">
        <!-- Banner -->
        <div class="mission-banner">
          <div class="mascot-avatar" id="shapes-mascot"></div>
          <div class="mission-text-bubble">
            <span class="mission-speaker">Kiki si Kelinci:</span>
            <span class="mission-instruction">Ayo pasangkan setiap bentuk ke bayangannya yang cocok!</span>
          </div>
          <button class="audio-replay-btn" id="replay-shapes-voice" title="Dengarkan Suara">🔊</button>
        </div>

        <!-- Matching Slots Area -->
        <div class="shapes-slots-stage" id="slots-stage"></div>

        <!-- Shapes Picker Palette -->
        <div class="shapes-palette-stage" id="palette-stage"></div>
      </div>
    `;

    window.mascotManager.renderMascot('shapes-mascot', 'bunny', 'idle');

    const slotsStage = document.getElementById('slots-stage');
    const paletteStage = document.getElementById('palette-stage');

    // Create target slots
    this.activeShapes.forEach(shapeType => {
      const slot = document.createElement('div');
      slot.className = 'shape-target-slot';
      slot.dataset.shape = shapeType;
      slot.innerHTML = `
        <div class="slot-silhouette">${ItemsCatalog.getShapeSVG(shapeType, 64)}</div>
        <div class="slot-name-label">${this.shapeNamesID[shapeType]}</div>
      `;
      slotsStage.appendChild(slot);
    });

    // Create draggable / clickable items in palette (shuffled)
    const itemsShuffled = [...this.activeShapes].sort(() => Math.random() - 0.5);
    itemsShuffled.forEach(shapeType => {
      const card = document.createElement('div');
      card.className = 'shape-palette-item pulse-item';
      card.dataset.shape = shapeType;
      card.innerHTML = ItemsCatalog.getShapeSVG(shapeType, 68);

      card.onclick = () => this.handleShapeClick(shapeType, card);

      paletteStage.appendChild(card);
    });

    document.getElementById('replay-shapes-voice').onclick = () => {
      window.soundEngine.speak('Sentuh bentuk di bawah untuk dipasangkan ke bayangan yang sesuai!', true);
    };
  }

  handleShapeClick(shapeType, cardElement) {
    if (cardElement.classList.contains('placed')) return;

    const targetSlot = document.querySelector(`.shape-target-slot[data-shape="${shapeType}"]`);
    if (targetSlot && !targetSlot.classList.contains('filled')) {
      targetSlot.classList.add('filled', 'snap-anim');
      targetSlot.innerHTML = `
        <div class="slot-placed-item">${ItemsCatalog.getShapeSVG(shapeType, 68)}</div>
        <div class="slot-name-label slot-success">${this.shapeNamesID[shapeType]} ✨</div>
      `;
      cardElement.classList.add('placed');

      window.soundEngine.playSnap();
      window.soundEngine.speak(this.shapeNamesID[shapeType], true);

      this.matchedCount++;
      if (this.matchedCount === this.activeShapes.length) {
        // Complete!
        window.soundEngine.playSuccess();
        window.mascotManager.renderMascot('shapes-mascot', 'bunny', 'cheering');
        setTimeout(() => this.showCelebrationModal('Mengenal Bentuk Geometri'), 700);
      }
    }
  }

  // Sub-game B: Melanjutkan Pola Berulang (e.g. Lingkaran - Segitiga - Lingkaran - [?])
  startPatternGame() {
    const patternA = this.shapesList[Math.floor(Math.random() * this.shapesList.length)];
    let patternB;
    do {
      patternB = this.shapesList[Math.floor(Math.random() * this.shapesList.length)];
    } while (patternB === patternA);

    // Sequence: A, B, A, B, ? (Answer is A)
    // Or: A, A, B, A, A, ? (Answer is B)
    const isDouble = Math.random() > 0.5;
    if (isDouble) {
      this.patternSequence = [patternA, patternA, patternB, patternA, patternA];
      this.expectedNext = patternB;
    } else {
      this.patternSequence = [patternA, patternB, patternA, patternB];
      this.expectedNext = patternA;
    }

    this.renderPatternView();
    window.soundEngine.speak('Perhatikan pola bentuknya! Bentuk apa yang ada di tanda tanya?');
  }

  renderPatternView() {
    this.container.innerHTML = `
      <div class="game-board shapes-board">
        <!-- Banner -->
        <div class="mission-banner">
          <div class="mascot-avatar" id="shapes-mascot"></div>
          <div class="mission-text-bubble">
            <span class="mission-speaker">Dino Momo:</span>
            <span class="mission-instruction">Lanjutkan polanya! Bentuk apa yang ada di kotak tanda tanya?</span>
          </div>
          <button class="audio-replay-btn" id="replay-pattern-voice" title="Dengarkan Suara">🔊</button>
        </div>

        <!-- Pattern Train Stage -->
        <div class="pattern-train-stage">
          <div class="train-track" id="pattern-track"></div>
        </div>

        <!-- Choices for Pattern -->
        <div class="pattern-choices-stage" id="pattern-choices"></div>
      </div>
    `;

    window.mascotManager.renderMascot('shapes-mascot', 'dino', 'idle');

    const track = document.getElementById('pattern-track');
    this.patternSequence.forEach((shape, idx) => {
      const trainCar = document.createElement('div');
      trainCar.className = 'train-car pop-item';
      trainCar.innerHTML = ItemsCatalog.getShapeSVG(shape, 58);
      track.appendChild(trainCar);
    });

    // Mystery target box
    const mysteryCar = document.createElement('div');
    mysteryCar.className = 'train-car train-mystery' ;
    mysteryCar.id = 'train-mystery-box';
    mysteryCar.innerHTML = '<span class="mystery-q">?</span>';
    track.appendChild(mysteryCar);

    // Choices
    const choicesStage = document.getElementById('pattern-choices');
    // Generate 3 choices
    const choices = new Set();
    choices.add(this.expectedNext);
    while (choices.size < 3) {
      const randomShape = this.shapesList[Math.floor(Math.random() * this.shapesList.length)];
      choices.add(randomShape);
    }

    const shuffledChoices = Array.from(choices).sort(() => Math.random() - 0.5);

    shuffledChoices.forEach(shape => {
      const btn = document.createElement('button');
      btn.className = 'shape-choice-btn';
      btn.innerHTML = `
        ${ItemsCatalog.getShapeSVG(shape, 62)}
        <span class="choice-text">${this.shapeNamesID[shape]}</span>
      `;
      btn.onclick = () => this.handlePatternChoice(shape, btn);
      choicesStage.appendChild(btn);
    });

    document.getElementById('replay-pattern-voice').onclick = () => {
      window.soundEngine.speak('Perhatikan urutan polanya, lalu pilih bentuk yang tepat untuk mengisi tanda tanya!', true);
    };
  }

  handlePatternChoice(shape, btnElement) {
    if (shape === this.expectedNext) {
      // CORRECT!
      window.soundEngine.playSuccess();
      window.soundEngine.playCheer();
      window.mascotManager.renderMascot('shapes-mascot', 'dino', 'cheering');

      const mysteryBox = document.getElementById('train-mystery-box');
      mysteryBox.innerHTML = ItemsCatalog.getShapeSVG(shape, 58);
      mysteryBox.classList.add('mystery-solved');

      btnElement.classList.add('btn-choice-correct');
      window.soundEngine.speak(`Pintar sekali! Bentuk berikutnya adalah ${this.shapeNamesID[shape]}!`, true);

      setTimeout(() => this.showCelebrationModal('Tebak Pola Ajaib'), 800);
    } else {
      window.soundEngine.playGentleTryAgain();
      window.mascotManager.renderMascot('shapes-mascot', 'dino', 'thinking');
      btnElement.classList.add('btn-choice-wrong');
      setTimeout(() => btnElement.classList.remove('btn-choice-wrong'), 500);

      window.soundEngine.speak('Coba perhatikan urutan warnanya dari awal lagi ya!', true);
    }
  }

  showCelebrationModal(subModeTitle) {
    window.soundEngine.playCheer();
    const modal = document.createElement('div');
    modal.className = 'reward-modal-overlay';
    modal.innerHTML = `
      <div class="reward-modal-card bounce-in">
        <div class="reward-stars">⭐⭐⭐</div>
        <h2>HEBAT DAN CERMAT! 🎉</h2>
        <p>Kamu sudah menguasai <strong>${subModeTitle}</strong>!</p>
        <div class="reward-graphic">
          ${ItemsCatalog.getStarSVG(72)}
        </div>
        <div class="reward-actions">
          <button class="btn-primary-fun" id="next-shapes-round">Main Lagi 🚀</button>
          <button class="btn-secondary-fun" id="exit-shapes-btn">Menu Utama 🏠</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    if (window.triggerConfetti) window.triggerConfetti();

    document.getElementById('next-shapes-round').onclick = () => {
      modal.remove();
      this.start(this.level);
    };

    document.getElementById('exit-shapes-btn').onclick = () => {
      modal.remove();
      if (this.onComplete) this.onComplete();
    };
  }
}

window.ShapesGame = ShapesGame;
