const heartsContainer = document.getElementById("hearts");

// Create floating hearts on left side only
function createHeart() {
  const heart = document.createElement("div");
  heart.innerText = "❤️";
  heart.style.position = "absolute"; // relative to heartsContainer
  heart.style.left = Math.random() * (window.innerWidth / 1) + "px"; // left half of screen
  heart.style.top = window.innerHeight + "px"; // start from bottom
  heart.style.fontSize = Math.random() * 24 + 16 + "px";
  heart.style.opacity = Math.random() * 0.6 + 0.4;
  heart.style.transition = "all 5s linear";

  heartsContainer.appendChild(heart);

  // Animate upward
  setTimeout(() => {
    heart.style.top = "-50px";
    heart.style.left =
      parseInt(heart.style.left) + (Math.random() * 50 - 25) + "px";
  }, 50);

  // Remove after animation
  setTimeout(() => {
    heart.remove();
  }, 5000);
}

// Spawn hearts every 300ms
setInterval(createHeart, 300);

// Back button
function backHome() {
  window.location.href = "index.html";
}
