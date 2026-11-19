// Interactive Mascot System for Grade 1 Kids
// Features animated SVG characters with dynamic emotions: idle, happy, chewing, thinking, cheering!

class MascotManager {
  constructor() {
    this.currentEmotion = 'idle';
  }

  getDinoSVG(emotion = 'idle') {
    let mouth = '<path d="M 45 65 Q 55 75 65 65" stroke="#2c3e50" stroke-width="3" fill="none" stroke-linecap="round"/>';
    let eyes = `
      <circle cx="42" cy="48" r="6" fill="#2c3e50" />
      <circle cx="44" cy="46" r="2" fill="#ffffff" />
      <circle cx="68" cy="48" r="6" fill="#2c3e50" />
      <circle cx="70" cy="46" r="2" fill="#ffffff" />
    `;
    let blush = `
      <ellipse cx="34" cy="58" rx="5" ry="3" fill="#ff7675" opacity="0.6" />
      <ellipse cx="76" cy="58" rx="5" ry="3" fill="#ff7675" opacity="0.6" />
    `;
    let extra = '';

    if (emotion === 'open_mouth') {
      mouth = `
        <ellipse cx="55" cy="68" rx="14" ry="12" fill="#d63031" stroke="#2c3e50" stroke-width="2.5" />
        <ellipse cx="55" cy="73" rx="8" ry="5" fill="#ff7675" />
        <path d="M 46 60 L 48 64 L 50 60 L 52 64 L 54 60" stroke="#ffffff" stroke-width="1.5" fill="#ffffff" />
      `;
    } else if (emotion === 'chewing') {
      mouth = '<path d="M 46 66 Q 55 60 64 66" stroke="#2c3e50" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
      eyes = `
        <path d="M 37 49 Q 42 42 47 49" stroke="#2c3e50" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M 63 49 Q 68 42 73 49" stroke="#2c3e50" stroke-width="3" fill="none" stroke-linecap="round"/>
      `;
      extra = `
        <circle cx="36" cy="68" r="2.5" fill="#e67e22" class="crumb-1" />
        <circle cx="74" cy="66" r="2" fill="#e67e22" class="crumb-2" />
        <text x="55" y="25" text-anchor="middle" font-size="12" font-weight="bold" fill="#e67e22" class="nom-text">NYAM! NYAM!</text>
      `;
    } else if (emotion === 'happy' || emotion === 'cheering') {
      mouth = `
        <path d="M 42 63 Q 55 82 68 63 Z" fill="#d63031" stroke="#2c3e50" stroke-width="2.5"/>
        <path d="M 47 70 Q 55 65 63 70" stroke="#ff7675" stroke-width="3" fill="none"/>
      `;
      eyes = `
        <path d="M 36 49 Q 42 41 48 49" stroke="#2c3e50" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M 62 49 Q 68 41 74 49" stroke="#2c3e50" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      `;
      extra = `
        <g class="star-sparkle">
          <polygon points="20,25 23,32 30,32 25,37 27,44 20,40 13,44 15,37 10,32 17,32" fill="#f1c40f" transform="scale(0.6) translate(10, 10)" />
          <polygon points="20,25 23,32 30,32 25,37 27,44 20,40 13,44 15,37 10,32 17,32" fill="#f1c40f" transform="scale(0.5) translate(145, 15)" />
        </g>
      `;
    } else if (emotion === 'thinking') {
      mouth = '<circle cx="55" cy="66" r="4" fill="#2c3e50" />';
      eyes = `
        <ellipse cx="42" cy="46" rx="5" ry="7" fill="#2c3e50" />
        <ellipse cx="68" cy="46" rx="5" ry="7" fill="#2c3e50" />
      `;
      extra = `
        <text x="78" y="32" font-size="18" font-weight="900" fill="#3498db">?</text>
      `;
    }

    return `
      <svg viewBox="0 0 110 110" class="mascot-svg dino-mascot emotion-${emotion}" xmlns="http://www.w3.org/2000/svg">
        <!-- Spikes on back -->
        <polygon points="30,30 38,15 46,32" fill="#f39c12" />
        <polygon points="46,26 55,10 64,28" fill="#f39c12" />
        <polygon points="64,28 72,16 80,32" fill="#f39c12" />

        <!-- Dino Body/Head -->
        <rect x="25" y="28" width="60" height="62" rx="30" ry="30" fill="#2ecc71" stroke="#27ae60" stroke-width="3" />
        <!-- Belly -->
        <ellipse cx="55" cy="74" rx="20" ry="14" fill="#abebc6" />
        
        <!-- Cheeks -->
        ${blush}

        <!-- Eyes -->
        ${eyes}

        <!-- Mouth -->
        ${mouth}

        <!-- Dino hands -->
        <ellipse cx="25" cy="68" rx="5" ry="8" fill="#27ae60" transform="rotate(-20 25 68)"/>
        <ellipse cx="85" cy="68" rx="5" ry="8" fill="#27ae60" transform="rotate(20 85 68)"/>

        ${extra}
      </svg>
    `;
  }

  getBunnySVG(emotion = 'idle') {
    let mouth = '<path d="M 48 64 Q 55 69 62 64" stroke="#e84393" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    let eyes = `
      <circle cx="43" cy="50" r="5" fill="#2d3436" />
      <circle cx="45" cy="48" r="1.8" fill="#ffffff" />
      <circle cx="67" cy="50" r="5" fill="#2d3436" />
      <circle cx="69" cy="48" r="1.8" fill="#ffffff" />
    `;
    let blush = `
      <ellipse cx="36" cy="58" rx="5" ry="3" fill="#fd79a8" opacity="0.6" />
      <ellipse cx="74" cy="58" rx="5" ry="3" fill="#fd79a8" opacity="0.6" />
    `;

    if (emotion === 'happy' || emotion === 'cheering') {
      eyes = `
        <path d="M 38 52 Q 43 45 48 52" stroke="#2d3436" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M 62 52 Q 67 45 72 52" stroke="#2d3436" stroke-width="3" fill="none" stroke-linecap="round"/>
      `;
      mouth = `
        <path d="M 47 62 Q 55 76 63 62 Z" fill="#e84393" />
      `;
    }

    return `
      <svg viewBox="0 0 110 110" class="mascot-svg bunny-mascot emotion-${emotion}" xmlns="http://www.w3.org/2000/svg">
        <!-- Ears -->
        <g class="bunny-ear-left">
          <ellipse cx="38" cy="24" rx="9" ry="22" fill="#ffffff" stroke="#dfe6e9" stroke-width="2" transform="rotate(-10 38 24)"/>
          <ellipse cx="38" cy="24" rx="5" ry="16" fill="#ffb8b8" transform="rotate(-10 38 24)"/>
        </g>
        <g class="bunny-ear-right">
          <ellipse cx="72" cy="24" rx="9" ry="22" fill="#ffffff" stroke="#dfe6e9" stroke-width="2" transform="rotate(10 72 24)"/>
          <ellipse cx="72" cy="24" rx="5" ry="16" fill="#ffb8b8" transform="rotate(10 72 24)"/>
        </g>

        <!-- Bunny Face -->
        <circle cx="55" cy="58" r="32" fill="#ffffff" stroke="#dfe6e9" stroke-width="2" />
        
        <!-- Nose -->
        <polygon points="55,59 52,56 58,56" fill="#e84393" />

        ${blush}
        ${eyes}
        ${mouth}
      </svg>
    `;
  }

  getGatorSVG(comparison = 'greater') {
    // comparison: 'greater' (mouth faces left, open towards left >), 
    //             'less' (mouth faces right, open towards right <),
    //             'equal' (neutral smiling mouth =)
    if (comparison === 'greater') {
      return `
        <svg viewBox="0 0 120 100" class="alligator-svg gator-left" xmlns="http://www.w3.org/2000/svg">
          <g>
            <!-- Body -->
            <ellipse cx="80" cy="50" rx="35" ry="30" fill="#27ae60" />
            <!-- Upper Jaw open to left -->
            <path d="M 80 40 L 20 20 Q 30 38 80 45 Z" fill="#2ecc71" stroke="#27ae60" stroke-width="2" />
            <!-- Lower Jaw open to left -->
            <path d="M 80 55 Q 30 62 20 80 L 80 60 Z" fill="#2ecc71" stroke="#27ae60" stroke-width="2" />
            <!-- Sharp friendly teeth -->
            <polygon points="35,26 42,34 47,28" fill="#ffffff" />
            <polygon points="52,30 59,38 64,32" fill="#ffffff" />
            <polygon points="35,74 42,66 47,72" fill="#ffffff" />
            <polygon points="52,70 59,62 64,68" fill="#ffffff" />
            <!-- Big Eye -->
            <circle cx="75" cy="30" r="10" fill="#ffffff" stroke="#27ae60" stroke-width="2" />
            <circle cx="72" cy="30" r="5" fill="#2c3e50" />
            <circle cx="70" cy="28" r="1.5" fill="#ffffff" />
            <!-- Nostril -->
            <circle cx="28" cy="25" r="2.5" fill="#1b4f72" />
          </g>
        </svg>
      `;
    } else if (comparison === 'less') {
      return `
        <svg viewBox="0 0 120 100" class="alligator-svg gator-right" xmlns="http://www.w3.org/2000/svg">
          <g transform="scale(-1, 1) translate(-120, 0)">
            <!-- Same alligator mirrored to point to the right -->
            <ellipse cx="80" cy="50" rx="35" ry="30" fill="#27ae60" />
            <path d="M 80 40 L 20 20 Q 30 38 80 45 Z" fill="#2ecc71" stroke="#27ae60" stroke-width="2" />
            <path d="M 80 55 Q 30 62 20 80 L 80 60 Z" fill="#2ecc71" stroke="#27ae60" stroke-width="2" />
            <polygon points="35,26 42,34 47,28" fill="#ffffff" />
            <polygon points="52,30 59,38 64,32" fill="#ffffff" />
            <polygon points="35,74 42,66 47,72" fill="#ffffff" />
            <polygon points="52,70 59,62 64,68" fill="#ffffff" />
            <circle cx="75" cy="30" r="10" fill="#ffffff" stroke="#27ae60" stroke-width="2" />
            <circle cx="72" cy="30" r="5" fill="#2c3e50" />
            <circle cx="70" cy="28" r="1.5" fill="#ffffff" />
            <circle cx="28" cy="25" r="2.5" fill="#1b4f72" />
          </g>
        </svg>
      `;
    } else {
      // Equal sign
      return `
        <svg viewBox="0 0 120 100" class="alligator-svg gator-equal" xmlns="http://www.w3.org/2000/svg">
          <g>
            <ellipse cx="60" cy="50" rx="42" ry="32" fill="#2ecc71" stroke="#27ae60" stroke-width="2" />
            <circle cx="45" cy="35" r="9" fill="#ffffff" stroke="#27ae60" stroke-width="2" />
            <circle cx="45" cy="35" r="4.5" fill="#2c3e50" />
            <circle cx="75" cy="35" r="9" fill="#ffffff" stroke="#27ae60" stroke-width="2" />
            <circle cx="75" cy="35" r="4.5" fill="#2c3e50" />
            <!-- Equal bars like smiling jaws -->
            <rect x="35" y="55" width="50" height="7" rx="3.5" fill="#f1c40f" stroke="#d68910" stroke-width="1.5" />
            <rect x="35" y="68" width="50" height="7" rx="3.5" fill="#f1c40f" stroke="#d68910" stroke-width="1.5" />
          </g>
        </svg>
      `;
    }
  }

  renderMascot(containerId, character = 'dino', emotion = 'idle') {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (character === 'dino') {
      el.innerHTML = this.getDinoSVG(emotion);
    } else if (character === 'bunny') {
      el.innerHTML = this.getBunnySVG(emotion);
    }
  }
}

window.mascotManager = new MascotManager();
