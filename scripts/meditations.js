let meditations = {};
let currentBook = null;
let currentSection = null;

const sectionsPerBook = {
  1: 16, 2: 17, 3: 16, 4: 51, 5: 33, 6: 30,
  7: 75, 8: 59, 9: 42, 10: 38, 11: 39, 12: 36
};

// Load JSON on startup
fetch('data/meditations.json')
  .then(response => response.json())
  .then(data => {
    meditations = data;
    generateReading(); // wait for data before generating
  })
  .catch(error => {
    console.error("Failed to load meditations.json", error);
    document.getElementById('reading').textContent = "❌ Failed to load quotes";
  });

function generateReading() {
  const bookNumbers = Object.keys(sectionsPerBook);
  currentBook = bookNumbers[Math.floor(Math.random() * bookNumbers.length)];
  const maxSection = sectionsPerBook[currentBook];
  currentSection = Math.floor(Math.random() * maxSection) + 1;

  const readingText = `📖 Book ${currentBook}, Section ${currentSection}`;
  document.getElementById('reading').textContent = readingText;
  document.getElementById('quote-text').textContent = '';
}

function showQuote() {
  const key = `${currentBook}-${currentSection}`;
  const quote = meditations[key];
  document.getElementById('quote-text').textContent = quote ? `"${quote}"` : '';
}