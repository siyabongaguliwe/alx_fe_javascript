const quotes = [
  { text: "The only way to do great work is to love what you do. - Steve Jobs", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity. - Albert Einstein", category: "Inspiration" },
  // Add more quotes as needed
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomQuote = quotes[randomIndex].text;
  quoteDisplay.textContent = randomQuote;
  saveLastViewedQuote(randomQuote);
}

function addQuote(newQuote) {
  quotes.push({ text: newQuote, category: "User Added" });
  saveQuotes();
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

function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  const inputField = document.createElement('input');
  inputField.id = 'newQuoteInput';
  inputField.type = 'text';
  inputField.placeholder = 'Enter new quote';

  const addButton = document.createElement('button');
  addButton.id = 'addQuote';
  addButton.textContent = 'Add Quote';

  formContainer.appendChild(inputField);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);

  addButton.addEventListener('click', () => {
      const newQuote = inputField.value;
      if (newQuote) {
          addQuote(newQuote);
          inputField.value = '';
      }
  });
}

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
      quotes.push(...JSON.parse(storedQuotes));
  }
}

function saveLastViewedQuote(quote) {
  sessionStorage.setItem('lastViewedQuote', quote);
}

function loadLastViewedQuote() {
  const lastQuote = sessionStorage.getItem('lastViewedQuote');
  if (lastQuote) {
      document.getElementById('quoteDisplay').textContent = lastQuote;
  }
}

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'quotes.json';
  downloadLink.click();
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      updateDOM();
      alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('exportButton').addEventListener('click', exportToJsonFile);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  loadLastViewedQuote();
  createAddQuoteForm();
  updateDOM();
});

