const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const hint = document.getElementById("hint");
const fxLayer = document.getElementById("fxLayer");
const overlay = document.getElementById("loveOverlay");
const pet = document.querySelector(".pet");

let noClicks = 0;

// helpers
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// hearts
function spawnHearts(count = 22) {
  const rect = yesBtn.getBoundingClientRect();
  const x0 = rect.left + rect.width / 2;
  const y0 = rect.top + rect.height / 2;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "heart";

    el.style.left = `${x0 + rand(-80, 80)}px`;
    el.style.top = `${y0 + rand(-20, 30)}px`;
    el.style.background = `hsl(${rand(260, 330)} 90% 65%)`;

    const dur = rand(700, 1200);
    el.style.animationDuration = `${dur}ms`;
    el.style.animationDelay = `${rand(0, 120)}ms`;

    fxLayer.appendChild(el);
    setTimeout(() => el.remove(), dur + 500);
  }
}

// confetti
function spawnConfetti(count = 44) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "confetti";

    el.style.left = `${rand(0, window.innerWidth)}px`;
    el.style.top = `-20px`;
    el.style.background = `hsl(${rand(200, 330)} 95% 60%)`;

    const dur = rand(1200, 2000);
    el.style.animationDuration = `${dur}ms`;
    el.style.animationDelay = `${rand(0, 150)}ms`;

    fxLayer.appendChild(el);
    setTimeout(() => el.remove(), dur + 500);
  }
}

function petBounce() {
  pet.animate(
    [
      { transform: "translateY(0) scale(1)" },
      { transform: "translateY(-12px) scale(1.05)" },
      { transform: "translateY(0) scale(1)" },
    ],
    { duration: 520, easing: "cubic-bezier(.2,.9,.2,1)" },
  );
}

// YES
yesBtn.addEventListener("click", () => {
  result.textContent = "YAAAY 💜🥹";
  hint.textContent = "";

  overlay.classList.add("on");
  petBounce();
  spawnHearts();
  spawnConfetti();

  setTimeout(() => overlay.classList.remove("on"), 1400);
  setTimeout(() => (noBtn.style.display = "none"), 200);
});

// NO (messages show ONLY on click/tap)
noBtn.addEventListener("click", () => {
  noClicks++;

  const messages = [
    "hey… why 😭",
    "are you sure? 😼",
    "this feels personal",
    "okay okay, I’ll stop dodging… but YES is better 😇",
  ];

  hint.textContent = messages[Math.min(noClicks - 1, messages.length - 1)];

  // first 3 clicks: dodge a bit (funny, mobile friendly)
  if (noClicks < 4) {
    const dx = rand(-80, 80);
    const dy = rand(-20, 20);

    noBtn.animate(
      [
        { transform: "translate(0, 0)" },
        { transform: `translate(${dx}px, ${dy}px)` },
        { transform: "translate(0, 0)" },
      ],
      { duration: 520, easing: "cubic-bezier(.2,.9,.2,1)" },
    );
  } else {
    result.textContent = "nice try 😌";
  }
});
