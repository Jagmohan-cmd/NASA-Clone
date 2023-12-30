document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    addSearchToHistory();
  
    document.getElementById('search-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const selectedDate = document.getElementById('search-input').value;
      getImageOfTheDay(selectedDate);
    });
  
    document.getElementById('search-history').addEventListener('click', function (e) {
      if (e.target.tagName === 'LI') {
        const selectedDate = e.target.textContent;
        getImageOfTheDay(selectedDate);
      }
    });
  });
  
  async function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    await getImageOfTheDay(currentDate);
  }
  
  async function getImageOfTheDay(date) {
    const apiKey = 'hIdUgU4zevFf49PpRFh5MrA0PdlwLggT0sLY8brH'; 
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      displayImage(data);
      saveSearch(date);
      addSearchToHistory();
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
  
  function displayImage(data) {
    const imageContainer = document.getElementById('current-image-container');
    const selectedDate = document.getElementById('search-input').value;
    imageContainer.innerHTML = `
      <h1>Picture On ${selectedDate}</h1>
      <img src="${data.url}" alt="${data.title}">
      <h3>${data.title}</h3>
      <p>${data.explanation}</p>
    `;
  }
  
  function saveSearch(date) {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
  }
  
  function addSearchToHistory() {
    const searchHistory = document.getElementById('search-history');
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
  
    // searchHistory.innerHTML = '';
    searches.forEach(date => {
      const listItem = document.createElement('li');
      listItem.textContent = date;
      searchHistory.appendChild(listItem);
    });
  }
  