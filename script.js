
const grid = document.getElementById("boxGrid");
const searchBox = document.getElementById("searchBox");
let boxes = {};
for (let i = 1; i <= 1000; i++) {
  boxes[i] = { prize: `Prize ${i}`, value: Math.floor(Math.random() * 100) + 1 };
}

function getPrizeTier(value) {
  if (value > 50) return "high";
  if (value > 10) return "medium";
  return "low";
}

function revealBox(el, boxNum) {
  if (el.classList.contains("opened")) return;

  const prizeData = boxes[boxNum];
  const tier = getPrizeTier(prizeData.value);
  el.classList.add("opened", tier);
  el.textContent = "🎉";
  const audio = new Audio(`assets/sounds/${tier}.mp3`);
  audio.play();
  alert(`Box ${boxNum} contains: ${prizeData.prize} (Value: ${prizeData.value})`);
}

function renderBoxes() {
  grid.innerHTML = "";
  for (let i = 1; i <= 1000; i++) {
    const box = document.createElement("div");
    box.className = "box";
    box.textContent = i;
    box.dataset.boxNum = i;
    box.addEventListener("click", (e) => revealBox(e.target, i));
    grid.appendChild(box);
  }
}

searchBox.addEventListener("input", () => {
  const term = searchBox.value.trim();
  const boxElements = document.querySelectorAll(".box");
  boxElements.forEach((el) => {
    if (!term || el.textContent === term) {
      el.style.outline = "2px solid #9146FF";
    } else {
      el.style.outline = "none";
    }
  });
});

renderBoxes();
