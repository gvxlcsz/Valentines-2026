

const yesBtn = document.getElementById("yesBtn");
const envelope = document.querySelector(".envelope");

let escaped = false;
let lastEscapeTime = 0;

const TRIGGER_RADIUS = 120; // danger zone
const COOLDOWN = 500; // 0.5s

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastEscapeTime < COOLDOWN) return;

  const rect = yesBtn.getBoundingClientRect();
  const btnX = rect.left + rect.width / 2;
  const btnY = rect.top + rect.height / 2;

  const dx = e.clientX - btnX;
  const dy = e.clientY - btnY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance <= TRIGGER_RADIUS) {
    escape();
    lastEscapeTime = now;
  }
});

function escape() {
  if (!escaped) {
    escaped = true;
    yesBtn.style.position = "fixed";
  }

  const padding = 20;
  const maxX = window.innerWidth - yesBtn.offsetWidth - padding;
  const maxY = window.innerHeight - yesBtn.offsetHeight - padding;

  const envelopeRect = envelope.getBoundingClientRect();

  let x, y;
  let tries = 0;

  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
    tries++;
  } while (
    overlapsEnvelope(x, y, envelopeRect) &&
    tries < 50 // safety net
  );

  yesBtn.style.left = `${x}px`;
  yesBtn.style.top = `${y}px`;
}

function overlapsEnvelope(x, y, envRect) {
  const btnWidth = yesBtn.offsetWidth;
  const btnHeight = yesBtn.offsetHeight;

  return !(
    x + btnWidth < envRect.left ||
    x > envRect.right ||
    y + btnHeight < envRect.top ||
    y > envRect.bottom
  );
}

function answerNo() {
  // redirect to message page
  window.location.href = "message.html";
}

