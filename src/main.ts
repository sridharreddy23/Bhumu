import './style.css'

// Elements
const yesBtn = document.querySelector<HTMLButtonElement>('#yes-btn')!;
const interactionCard = document.querySelector<HTMLDivElement>('#interaction-card')!;
const revealCard = document.querySelector<HTMLDivElement>('#reveal-card')!;
const questionText = document.querySelector<HTMLParagraphElement>('#question-text')!;
const toggleMusicBtn = document.querySelector<HTMLButtonElement>('#toggle-music')!;
const audio = document.querySelector<HTMLAudioElement>('#bg-music')!;
const hugBtn = document.querySelector<HTMLButtonElement>('#hug-btn')!;

// Typewriter Elements
const revealTitle = document.querySelector<HTMLHeadingElement>('#reveal-title')!;
const revealMessage = document.querySelector<HTMLParagraphElement>('#reveal-message')!;
const revealSubMessage = document.querySelector<HTMLParagraphElement>('#reveal-sub-message')!;

// Data
let clickCount = 0;
const messages = [
  "Are you sure? 🥺",
  "Like, absolutely sure? 💖",
  "No turning back now... ✨",
  "Prepare your heart... 🌹",
  "Almost there... 💌",
  "Okay, here it is! ❤️"
];

const finalTitle = "To My Dearest Bhumu...";
const finalBody = "You aren't just my partner; you are my home, my heart, and my greatest adventure. Every second with you feels like a dream I never want to wake up from. 💍🫂";
const finalSub = "I love you more than words can ever say. Forever & Always. ❤️";

// --- AUDIO LOGIC ---
let isMuted = false;
toggleMusicBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  audio.muted = isMuted;
  toggleMusicBtn.innerHTML = isMuted ? "❤️🔇" : "❤️🔊";
});

// --- TYPEWRITER LOGIC ---
function typeWriter(text: string, element: HTMLElement, delay: number = 50): Promise<void> {
  return new Promise((resolve) => {
    let i = 0;
    element.textContent = "";
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        resolve();
      }
    }, delay);
  });
}

// --- CURSOR TRAIL LOGIC ---
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.1) return; // Limit density
  createSparkle(e.clientX, e.clientY);
});

document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  createSparkle(touch.clientX, touch.clientY);
});

function createSparkle(x: number, y: number) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle-trail';
  sparkle.innerHTML = ['✨', '💖', '❤️', '🌸'][Math.floor(Math.random() * 4)];
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1000);
}

// --- INTERACTION LOGIC ---
yesBtn.addEventListener('click', () => {
  if (clickCount < messages.length - 1) {
    questionText.style.opacity = '0';
    setTimeout(() => {
      questionText.textContent = messages[clickCount];
      questionText.style.opacity = '1';
      clickCount++;
      yesBtn.style.transform = 'scale(0.95)';
      setTimeout(() => yesBtn.style.transform = 'scale(1)', 100);
    }, 200);
  } else {
    triggerReveal();
  }
});

let hasRevealHappened = false;
async function triggerReveal() {
  if (hasRevealHappened) return;
  hasRevealHappened = true;

  // Show Audio Controls
  document.querySelector('.audio-toggle')?.classList.add('visible');

  // Play music with delay
  setTimeout(() => {
    audio.play().catch(e => console.error("Audio playback failed:", e));
  }, 1500);

  // Transition
  interactionCard.style.opacity = '0';
  interactionCard.style.transform = 'translateY(-20px)';

  setTimeout(async () => {
    interactionCard.classList.add('hidden');
    revealCard.style.display = 'flex';
    setTimeout(() => revealCard.classList.add('active'), 50);

    // Start Typewriter
    await typeWriter(finalTitle, revealTitle, 70);
    await typeWriter(finalBody, revealMessage, 40);
    await typeWriter(finalSub, revealSubMessage, 50);
  }, 500);

  // Start Counter
  startCounter();
}

// --- COUNTER LOGIC ---
function startCounter() {
  // Exact Date: January 27, 2026, 14:00 IST
  const anniversaryDate = new Date("2026-01-27T14:00:00+05:30").getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const diff = now - anniversaryDate;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days')!.textContent = d.toString().padStart(2, '0');
    document.getElementById('hours')!.textContent = h.toString().padStart(2, '0');
    document.getElementById('minutes')!.textContent = m.toString().padStart(2, '0');
    document.getElementById('seconds')!.textContent = s.toString().padStart(2, '0');
  }, 1000);
}

// --- VIRTUAL HUG LOGIC ---
hugBtn.addEventListener('click', () => {
  createHearts(30);
  hugBtn.style.transform = 'scale(1.2)';
  setTimeout(() => hugBtn.style.transform = 'scale(1)', 200);
});

function createHearts(count: number) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-element';
    heart.innerHTML = ['❤️', '💖', '✨', '🌸', '💍'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 25 + 15 + 'px';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.opacity = (Math.random() * 0.5 + 0.5).toString();
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }
}
