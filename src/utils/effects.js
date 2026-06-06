// Web Audio API Synth Sound Generator
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSound(type, style = "synth") {
  if (style === "off") return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // helper to play a note
    const playNote = (freq, startTime, duration, waveType = "sine", volume = 0.08) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = waveType;
      osc.frequency.setValueAtTime(freq, startTime);
      
      gainNode.gain.setValueAtTime(volume, startTime);
      // exponential decay
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    if (type === "success") {
      // Rising chord
      playNote(523.25, now, 0.15, "triangle", 0.06); // C5
      playNote(659.25, now + 0.08, 0.25, "triangle", 0.06); // E5
    } else if (type === "levelup") {
      // Arpeggio fanfare
      playNote(523.25, now, 0.12, "sine", 0.08); // C5
      playNote(659.25, now + 0.08, 0.12, "sine", 0.08); // E5
      playNote(783.99, now + 0.16, 0.12, "sine", 0.08); // G5
      playNote(1046.50, now + 0.24, 0.45, "sine", 0.08); // C6
    } else if (type === "achievement") {
      // Shimmering success arpeggio
      playNote(587.33, now, 0.1, "sine", 0.06); // D5
      playNote(783.99, now + 0.06, 0.1, "sine", 0.06); // G5
      playNote(987.77, now + 0.12, 0.1, "sine", 0.06); // B5
      playNote(1174.66, now + 0.18, 0.5, "sine", 0.06); // D6
    } else if (type === "error") {
      // Low flat buzz
      playNote(150.00, now, 0.2, "sawtooth", 0.04); // low buzz
      playNote(140.00, now + 0.05, 0.25, "sawtooth", 0.04); // lower buzz
    }
  } catch (e) {
    console.error("Failed to play synth audio:", e);
  }
}

// HTML5 Canvas Particle Manager
let canvas = null;
let ctx = null;
let particles = [];
let animFrameId = null;

function getCanvas() {
  if (!canvas) {
    canvas = document.getElementById("effects-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "effects-canvas";
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "9999";
      document.body.appendChild(canvas);
    }
    ctx = canvas.getContext("2d");
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
  }
  return { canvas, ctx };
}

function resizeCanvas() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

class Particle {
  constructor(x, y, dx, dy, color, size, life, type = "confetti") {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.size = size;
    this.maxLife = life;
    this.life = life;
    this.type = type;
    this.angle = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.2;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    
    if (this.type === "confetti" || this.type === "star") {
      this.dy += 0.15; // gravity
      this.dx *= 0.99; // drag
      this.angle += this.spin;
    } else if (this.type === "firework-spark") {
      this.dy += 0.08; // light gravity
      this.dx *= 0.95; // high drag
      this.dy *= 0.95;
    }
    
    this.life--;
  }

  draw(glCtx) {
    const alpha = this.life / this.maxLife;
    glCtx.save();
    glCtx.translate(this.x, this.y);
    glCtx.rotate(this.angle);
    glCtx.fillStyle = this.color;
    glCtx.globalAlpha = alpha;

    if (this.type === "star") {
      glCtx.beginPath();
      for (let i = 0; i < 5; i++) {
        glCtx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * this.size, -Math.sin((18 + i * 72) * Math.PI / 180) * this.size);
        glCtx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (this.size / 2), -Math.sin((54 + i * 72) * Math.PI / 180) * (this.size / 2));
      }
      glCtx.closePath();
      glCtx.fill();
    } else if (this.type === "firework-spark") {
      glCtx.beginPath();
      glCtx.arc(0, 0, this.size, 0, Math.PI * 2);
      glCtx.shadowBlur = 6;
      glCtx.shadowColor = this.color;
      glCtx.fill();
    } else {
      glCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.7);
    }
    
    glCtx.restore();
  }
}

function updateParticlesLoop() {
  const { canvas: targetCanvas, ctx: glCtx } = getCanvas();
  glCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);

  particles = particles.filter(p => p.life > 0);
  
  particles.forEach(p => {
    p.update();
    p.draw(glCtx);
  });

  if (particles.length > 0) {
    animFrameId = requestAnimationFrame(updateParticlesLoop);
  } else {
    animFrameId = null;
    glCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
  }
}

function startAnimation() {
  if (!animFrameId) {
    animFrameId = requestAnimationFrame(updateParticlesLoop);
  }
}

export function triggerConfetti(style = "standard") {
  if (style === "off") return;
  const { canvas: targetCanvas } = getCanvas();
  const colors = ["#ff007f", "#7f00ff", "#00ffff", "#ffea00", "#00ff66", "#ff5500"];
  
  // Left side burst
  for (let i = 0; i < 40; i++) {
    const x = 0;
    const y = targetCanvas.height * 0.8;
    const dx = Math.random() * 8 + 4;
    const dy = -Math.random() * 12 - 5;
    const size = Math.random() * 8 + 6;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const life = Math.random() * 40 + 60;
    particles.push(new Particle(x, y, dx, dy, color, size, life, style === "stars" ? "star" : "confetti"));
  }
  
  // Right side burst
  for (let i = 0; i < 40; i++) {
    const x = targetCanvas.width;
    const y = targetCanvas.height * 0.8;
    const dx = -Math.random() * 8 - 4;
    const dy = -Math.random() * 12 - 5;
    const size = Math.random() * 8 + 6;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const life = Math.random() * 40 + 60;
    particles.push(new Particle(x, y, dx, dy, color, size, life, style === "stars" ? "star" : "confetti"));
  }

  startAnimation();
}

export function triggerFireworks() {
  const { canvas: targetCanvas } = getCanvas();
  const colors = ["#ff0055", "#00ffcc", "#ffcc00", "#ff00ff", "#33ff33", "#0099ff"];
  
  // Spawn 3 firework bursts
  for (let f = 0; f < 3; f++) {
    setTimeout(() => {
      const x = targetCanvas.width * (0.25 + Math.random() * 0.5);
      const y = targetCanvas.height * (0.25 + Math.random() * 0.35);
      const mainColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Spawn sparkle particles
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;
        const size = Math.random() * 2 + 1;
        const life = Math.random() * 20 + 25;
        
        particles.push(new Particle(x, y, dx, dy, mainColor, size, life, "firework-spark"));
      }
      startAnimation();
    }, f * 300);
  }
}
