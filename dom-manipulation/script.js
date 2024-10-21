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

function addQuote(newQuote, category = "User Added") {
  quotes.push({ text: newQuote, category });
  saveQuotes();
  updateDOM();
  populateCategories();
}

function updateDOM(filteredQuotes = quotes) {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';
  filteredQuotes.forEach(quote => {
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

  const categoryField = document.createElement('input');
  categoryField.id = 'newQuoteCategory';
  categoryField.type = 'text';
  categoryField.placeholder = 'Enter category';

  const addButton = document.createElement('button');
  addButton.id = 'addQuote';
  addButton.textContent = 'Add Quote';

  formContainer.appendChild(inputField);
  formContainer.appendChild(categoryField);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);

  addButton.addEventListener('click', () => {
      const newQuote = inputField.value;
      const category = categoryField.value || "User Added";
      if (newQuote) {
          addQuote(newQuote, category);
          inputField.value = '';
          categoryField.value = '';
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
      populateCategories();
      alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const categories = [...new Set(quotes.map(quote => quote.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
  });
}

function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  updateDOM(filteredQuotes);
  localStorage.setItem('selectedCategory', selectedCategory);
}

function loadSelectedCategory() {
  const selectedCategory = localStorage.getItem('selectedCategory');
  if (selectedCategory) {
      document.getElementById('categoryFilter').value = selectedCategory;
      filterQuotes();
  }
}

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('exportButton').addEventListener('click', exportToJsonFile);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  loadLastViewedQuote();
  createAddQuoteForm();
  populateCategories();
  loadSelectedCategory();
  updateDOM();
});
