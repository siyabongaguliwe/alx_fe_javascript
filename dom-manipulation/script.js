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

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Call the function to create the form when the script loads
createAddQuoteForm();
