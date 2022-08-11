const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-btn');
const newQuoteBtn = document.getElementById('newQuote-btn');
const loader = document.getElementById('loader');

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote(arrayOfQuotes) {
  loading();
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
  complete();
}

// Get quotes from API
async function getQuotes () {
  loading()
  const urlAPI = 'https://type.fit/api/quotes'
  try {
    const arrayOfQuotes = await fetch(urlAPI)
      .then(response => response.json())
      return newQuote(arrayOfQuotes)
  } catch (error) {
    console.log('Error in fetch!')
  }
}

//twitte button
function sendTwitter() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`
  window.open(twitterUrl, '_blanck')
}

//Event listners
newQuoteBtn.addEventListener('click', getQuotes)
twitterBtn.addEventListener('click', sendTwitter)

// On load
getQuotes();
// loading()
complete()
