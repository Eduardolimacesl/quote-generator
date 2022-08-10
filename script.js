const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-btn');
const newQuoteBtn = document.getElementById('newQuote-btn');

function newQuote(arrayOfQuotes) {
  const randomNumber = Math.floor(Math.random() * arrayOfQuotes.length)
  const newQuote = arrayOfQuotes[randomNumber]
  if (!newQuote.author) {
    quoteAuthor.textContent = "Unknown";  
  } else {
    quoteAuthor.textContent = newQuote.author;
  }
  if (newQuote.text.length > 120 ) {
    quoteText.classList.add('long-quote')
  }else {
    quoteText.classList.remove('long-quote')
  }
  quoteText.textContent = newQuote.text;
}

// Get quotes from API
async function getQuotes () {
  const urlAPI = 'https://type.fit/api/quotes'
  try {
    const arrayOfQuotes = await fetch(urlAPI)
      .then(response => response.json())
      return newQuote(arrayOfQuotes)
  } catch (error) {
    console.log('Error in fetch!')
  }
}

// On load
const quote = getQuotes();

