let history = [];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generate() {
  const sep = document.getElementById("sep").value;
  const ext = document.getElementById("ext").value;
  const name = pick(ONOMATOPOEIA) + sep + pick(NOUNS) + ext;
  const el = document.getElementById("result");
  el.classList.add("flash");
  setTimeout(() => {
    el.textContent = name;
    el.classList.remove("flash");
  }, 80);
  history.unshift(name);
  if (history.length > 9) history.pop();
  renderHistory();
  return name;
}

function renderHistory() {
  document.getElementById("hist-list").innerHTML =
    history.slice(1).map(h =>
      `<div class="hist-item" onclick="copyText('${h}')">${h}</div>`
    ).join("");
}

function copyText(text) {
  navigator.clipboard.writeText(text).catch(() => {});
  const el = document.getElementById("copied");
  el.style.opacity = "1";
  setTimeout(() => el.style.opacity = "0", 1200);
}

document.getElementById("gen").addEventListener("click", generate);
document.getElementById("copy").addEventListener("click", () => {
  const t = document.getElementById("result").textContent;
  if (t && t !== "\u2014") copyText(t);
});

generate();
