let meditations = {};

fetch('data/meditations.json')
  .then(response => response.json())
  .then(data => {
    meditations = data;
    showDailyInsight();
  })
  .catch(error => {
    document.getElementById('reading').textContent = "Failed to load Meditations.";
    console.error("JSON Load Error:", error);
  });

function showDailyInsight() {
  const today = new Date().toISOString().split('T')[0];
  const saved = localStorage.getItem('dailyInsight');

  if (saved) {
    const { date, key } = JSON.parse(saved);
    if (date === today) {
      displayQuoteByKey(key);
      return;
    }
  }

  const keys = Object.keys(meditations);
  const newKey = keys[Math.floor(Math.random() * keys.length)];
  localStorage.setItem('dailyInsight', JSON.stringify({ date: today, key: newKey }));
  displayQuoteByKey(newKey);
}

function displayQuoteByKey(key) {
  const entry = meditations[key];
  const quote = typeof entry === "string" ? entry : entry.text || "Quote not found";
  const [book, section] = key.split("-");

  const themes = entry.themes || [];

  document.getElementById("reading").textContent = `📖 Book ${book}, Section ${section}`;
  document.getElementById("quote-text").innerHTML = `
    "${quote}"
    ${themes.length ? `<div class="theme-list">${themes.map(t => `<span class="theme-pill">${t}</span>`).join(" ")}</div>` : ''}
  `;
}

function filterByTheme(theme) {
  const matchingKeys = Object.entries(meditations)
    .filter(([_, value]) =>
      typeof value === "object" &&
      value.themes &&
      value.themes.includes(theme)
    )
    .map(([key]) => key);

  if (matchingKeys.length === 0) {
    document.getElementById('reading').textContent = `No quotes found for theme: ${theme}`;
    document.getElementById('quote-text').textContent = '';
    return;
  }

  const randomKey = matchingKeys[Math.floor(Math.random() * matchingKeys.length)];
  displayQuoteByKey(randomKey);
}