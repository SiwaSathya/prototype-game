// Visual Items Generator (SVG) for Grade 1 Math Manipulatives
// Delivers scalable, tactile, juicy graphics for fruits, snacks, shapes, and ten-frames.

class ItemsCatalog {
  static getAppleSVG(size = 54) {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 60 60" class="item-icon fruit-apple" xmlns="http://www.w3.org/2000/svg">
        <path d="M 30 18 Q 32 8 38 6" stroke="#5d4037" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M 35 12 Q 44 8 46 14 Q 40 18 35 12 Z" fill="#2ecc71" stroke="#27ae60" stroke-width="1"/>
        <path d="M 30 20 C 18 16 10 28 12 42 C 14 54 26 56 30 52 C 34 56 46 54 48 42 C 50 28 42 16 30 20 Z" fill="#e74c3c" stroke="#c0392b" stroke-width="2"/>
        <!-- Highlight -->
        <ellipse cx="22" cy="28" rx="4" ry="7" fill="#ffffff" opacity="0.35" transform="rotate(-20 22 28)"/>
      </svg>
    `;
  }

  static getStrawberrySVG(size = 54) {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 60 60" class="item-icon fruit-strawberry" xmlns="http://www.w3.org/2000/svg">
        <!-- Leaves -->
        <polygon points="30,8 24,14 36,14" fill="#27ae60"/>
        <polygon points="20,12 28,15 22,18" fill="#2ecc71"/>
        <polygon points="40,12 32,15 38,18" fill="#2ecc71"/>
        <!-- Body -->
        <path d="M 30 54 C 18 48 14 36 16 22 C 18 16 42 16 44 22 C 46 36 42 48 30 54 Z" fill="#ff4757" stroke="#ee5253" stroke-width="2"/>
        <!-- Seeds -->
        <circle cx="24" cy="26" r="1.5" fill="#f6e58d"/>
        <circle cx="36" cy="26" r="1.5" fill="#f6e58d"/>
        <circle cx="30" cy="34" r="1.5" fill="#f6e58d"/>
        <circle cx="22" cy="40" r="1.5" fill="#f6e58d"/>
        <circle cx="38" cy="40" r="1.5" fill="#f6e58d"/>
        <circle cx="30" cy="46" r="1.2" fill="#f6e58d"/>
      </svg>
    `;
  }

  static getOrangeSVG(size = 54) {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 60 60" class="item-icon fruit-orange" xmlns="http://www.w3.org/2000/svg">
        <path d="M 30 14 Q 31 8 35 6" stroke="#5d4037" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="37" cy="11" rx="6" ry="3" fill="#2ecc71" transform="rotate(15 37 11)"/>
        <circle cx="30" cy="34" r="20" fill="#ff9f43" stroke="#ee5a24" stroke-width="2"/>
        <circle cx="24" cy="28" r="3.5" fill="#ffffff" opacity="0.3"/>
      </svg>
    `;
  }

  static getDonutSVG(size = 58) {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 60 60" class="item-icon food-donut" xmlns="http://www.w3.org/2000/svg">
        <!-- Dough -->
        <circle cx="30" cy="30" r="24" fill="#f39c12" stroke="#d68910" stroke-width="2"/>
        <!-- Strawberry Frosting -->
        <path d="M 30 8 C 44 8 52 16 52 30 C 52 44 44 52 30 52 C 16 52 8 44 8 30 C 8 16 16 8 30 8 Z" fill="#ff7675"/>
        <!-- Hole -->
        <circle cx="30" cy="30" r="9" fill="#fef9e7" stroke="#d68910" stroke-width="2"/>
        <!-- Colorful Sprinkles -->
        <rect x="20" y="16" width="5" height="2" rx="1" fill="#00cec9" transform="rotate(25 20 16)"/>
        <rect x="38" y="18" width="5" height="2" rx="1" fill="#fdcb6e" transform="rotate(-30 38 18)"/>
        <rect x="16" y="32" width="5" height="2" rx="1" fill="#6c5ce7" transform="rotate(60 16 32)"/>
        <rect x="42" y="35" width="5" height="2" rx="1" fill="#00b894" transform="rotate(-40 42 35)"/>
        <rect x="26" y="44" width="5" height="2" rx="1" fill="#ffffff" transform="rotate(15 26 44)"/>
      </svg>
    `;
  }

  static getCookieSVG(size = 54) {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 60 60" class="item-icon food-cookie" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="22" fill="#e67e22" stroke="#d35400" stroke-width="2"/>
        <!-- Chocolate chips -->
        <circle cx="22" cy="22" r="3" fill="#5d4037"/>
        <circle cx="36" cy="20" r="3.2" fill="#5d4037"/>
        <circle cx="28" cy="32" r="3.5" fill="#5d4037"/>
        <circle cx="38" cy="38" r="2.8" fill="#5d4037"/>
        <circle cx="20" cy="38" r="3" fill="#5d4037"/>
      </svg>
    `;
  }

  static getStarSVG(size = 54, color = "#f1c40f") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 60 60" class="item-icon shape-star" xmlns="http://www.w3.org/2000/svg">
        <polygon points="30,8 37,22 52,24 41,35 44,50 30,42 16,50 19,35 8,24 23,22" fill="${color}" stroke="#d68910" stroke-width="2"/>
        <circle cx="26" cy="24" r="2.5" fill="#2c3e50"/>
        <circle cx="34" cy="24" r="2.5" fill="#2c3e50"/>
        <path d="M 27 30 Q 30 33 33 30" stroke="#2c3e50" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      </svg>
    `;
  }

  static getShapeSVG(type, size = 68) {
    switch (type) {
      case 'circle':
        return `
          <svg width="${size}" height="${size}" viewBox="0 0 70 70" class="shape-icon" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="28" fill="#00cec9" stroke="#00a8a8" stroke-width="3"/>
            <!-- Happy face -->
            <circle cx="27" cy="31" r="3" fill="#2d3436"/>
            <circle cx="43" cy="31" r="3" fill="#2d3436"/>
            <path d="M 28 40 Q 35 48 42 40" stroke="#2d3436" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          </svg>
        `;
      case 'square':
        return `
          <svg width="${size}" height="${size}" viewBox="0 0 70 70" class="shape-icon" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="50" height="50" rx="8" fill="#ff7675" stroke="#d63031" stroke-width="3"/>
            <circle cx="27" cy="31" r="3" fill="#2d3436"/>
            <circle cx="43" cy="31" r="3" fill="#2d3436"/>
            <path d="M 28 40 Q 35 48 42 40" stroke="#2d3436" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          </svg>
        `;
      case 'triangle':
        return `
          <svg width="${size}" height="${size}" viewBox="0 0 70 70" class="shape-icon" xmlns="http://www.w3.org/2000/svg">
            <polygon points="35,10 62,58 8,58" fill="#fdcb6e" stroke="#e17055" stroke-width="3" stroke-linejoin="round"/>
            <circle cx="30" cy="38" r="3" fill="#2d3436"/>
            <circle cx="40" cy="38" r="3" fill="#2d3436"/>
            <path d="M 31 46 Q 35 50 39 46" stroke="#2d3436" stroke-width="2.2" fill="none" stroke-linecap="round"/>
          </svg>
        `;
      case 'star':
        return `
          <svg width="${size}" height="${size}" viewBox="0 0 70 70" class="shape-icon" xmlns="http://www.w3.org/2000/svg">
            <polygon points="35,8 43,24 61,26 48,39 52,57 35,48 18,57 22,39 9,26 27,24" fill="#a29bfe" stroke="#6c5ce7" stroke-width="2.5" stroke-linejoin="round"/>
            <circle cx="29" cy="34" r="3" fill="#2d3436"/>
            <circle cx="41" cy="34" r="3" fill="#2d3436"/>
            <path d="M 30 42 Q 35 46 40 42" stroke="#2d3436" stroke-width="2.2" fill="none" stroke-linecap="round"/>
          </svg>
        `;
      case 'heart':
        return `
          <svg width="${size}" height="${size}" viewBox="0 0 70 70" class="shape-icon" xmlns="http://www.w3.org/2000/svg">
            <path d="M 35 60 C 12 45 6 28 14 18 C 22 8 32 12 35 20 C 38 12 48 8 56 18 C 64 28 58 45 35 60 Z" fill="#fd79a8" stroke="#e84393" stroke-width="3"/>
            <circle cx="27" cy="27" r="3" fill="#2d3436"/>
            <circle cx="43" cy="27" r="3" fill="#2d3436"/>
            <path d="M 29 35 Q 35 41 41 35" stroke="#2d3436" stroke-width="2.2" fill="none" stroke-linecap="round"/>
          </svg>
        `;
      default:
        return '';
    }
  }

  // Renders a Ten-Frame (2 rows x 5 columns), a gold standard in early math pedagogy
  static renderTenFrame(count = 0, max = 10, itemType = 'apple') {
    let cellsHTML = '';
    for (let i = 0; i < max; i++) {
      const isFilled = i < count;
      let content = '';
      if (isFilled) {
        if (itemType === 'apple') content = ItemsCatalog.getAppleSVG(42);
        else if (itemType === 'star') content = ItemsCatalog.getStarSVG(42);
        else content = ItemsCatalog.getStrawberrySVG(42);
      }
      cellsHTML += `
        <div class="ten-frame-cell ${isFilled ? 'filled' : 'empty'}" data-index="${i}">
          ${content}
        </div>
      `;
    }

    return `
      <div class="ten-frame-container" aria-label="Kotak Sepuluh: ${count} dari ${max}">
        <div class="ten-frame-grid">
          ${cellsHTML}
        </div>
      </div>
    `;
  }
}

window.ItemsCatalog = ItemsCatalog;
