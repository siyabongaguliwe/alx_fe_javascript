const quotes = [
  { text: "The only way to do great work is to love what you do. - Steve Jobs", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity. - Albert Einstein", category: "Inspiration" },
  // Add more quotes as needed
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.textContent = quotes[randomIndex].text;
}

function addQuote(newQuote) {
  quotes.push({ text: newQuote, category: "User Added" });
  updateDOM();
}

function updateDOM() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';
  quotes.forEach(quote => {
      const listItem = document.createElement('div');
      listItem.textContent = quote.text;
      quoteDisplay.appendChild(listItem);
  });
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

document.getElementById('addQuote').addEventListener('click', () => {
  const newQuote = document.getElementById('newQuoteInput').value;
  if (newQuote) {
      addQuote(newQuote);
      document.getElementById('newQuoteInput').value = '';
  }
});
