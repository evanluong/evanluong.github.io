let noClickCount = 0;
const noMessages = [
  "No",
  "Are you sure?",
  "Are you sure?",
  "There may be rewards... 🎁",
  "Like push pops? 🍭",
  "Shopping spree? 💳",
  "Beautiful roses? 🌹",
  "Lots of love? 💗",
  "Think about it! 🤔",
  "You're missing out! 😊",
  "Say yes for surprises! 🎉",
  "The rewards await... ✨",
  "Sweet treats included! 🍬",
  "Adventure guaranteed! 🎢",
  "Happiness promised! 😄",
  "Come on! 💕",
  "You know you want to! 😉",
  "Final offer! 🎀",
  "Last chance! ⏰",
  "Please say yes! 🥺"
];

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionContainer = document.getElementById('question-container');
const successContainer = document.getElementById('success-container');

// Initial button size
let yesBtnSize = 1;

noBtn.addEventListener('click', () => {
  noClickCount++;
  
  // Increase yes button size
  yesBtnSize += 0.5;
  yesBtn.style.transform = `scale(${yesBtnSize})`;
  
  // Calculate the growing width of the yes button and position no button next to it
  const yesBtnRect = yesBtn.getBoundingClientRect();
  const gap = 20; // gap between buttons
  const containerRect = questionContainer.getBoundingClientRect();
  const yesBtnCenter = containerRect.width / 2;
  const offset = (yesBtnRect.width / 2) + gap;
  
  noBtn.style.position = 'absolute';
  noBtn.style.left = `calc(50% + ${offset}px)`;
  
  // Change no button text
  if (noClickCount < noMessages.length) {
    noBtn.textContent = noMessages[noClickCount];
  } else {
    // Keep cycling through "Are you sure?" messages
    noBtn.textContent = "Are you sure?";
  }
  
  // Add some animation
  noBtn.style.animation = 'shake 0.5s';
  setTimeout(() => {
    noBtn.style.animation = '';
  }, 500);
});

yesBtn.addEventListener('click', () => {
  // Redirect to success page
  window.location.href = 'success.html';
});

// Simple confetti effect
function createConfetti() {
  const colors = ['#ff1493', '#ff69b4', '#ffc0cb', '#ff6b9d', '#c71585'];
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '1000';
      
      document.body.appendChild(confetti);
      
      const duration = Math.random() * 3 + 2;
      const xMovement = (Math.random() - 0.5) * 200;
      
      confetti.animate([
        { transform: 'translateY(0px) translateX(0px) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight}px) translateX(${xMovement}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
      
      setTimeout(() => confetti.remove(), duration * 1000);
    }, i * 30);
  }
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`;
document.head.appendChild(style);
