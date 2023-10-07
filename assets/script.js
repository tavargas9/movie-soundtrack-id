var dropdownBtn = document.querySelector("#dropdown-btn");
var dropdownContent = document.querySelector("#dropdown-content");

//Add dropdown functionality:
dropdownBtn.addEventListener('click', showDropdownMenu);

function showDropdownMenu(event) {
    event.preventDefault();
    if (dropdownContent.classList.contains('hidden')) {
        dropdownContent.classList.remove('hidden');
    } else {
        dropdownContent.classList.add('hidden');
    };
};

var userInput = document.getElementById('search-input-text');
var searchBar = document.getElementById('search-bar');

//iMDB api key
const optionsIMDB = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2d00cc5e8cmshc63eab584c107a7p16171bjsneedccf2d8b11',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

function getMovieId(input) {
    let urlIMDB = 'https://imdb8.p.rapidapi.com/auto-complete?q=' + input;
    console.log(urlIMDB);

    fetch(urlIMDB, optionsIMDB)
    .then(function (response) {
        console.log(response)
        response.json()
        .then(function(data){
            console.log(data);
            getSoundtrack(data);
            showMovieInfo(data);
        })
    });
    hideHistorySection();
};

function getSoundtrack(info) {
    //Following code searches for soundtrack by iMDB's id.
    //Movies and tv shows start with the id of 'tt'.
    //The following code checks if the search value is a movie or tv series by checking if it starts with 'tt'
    if (info.d[0].id.startsWith('tt')){
        let urlIMDB = 'https://imdb8.p.rapidapi.com/title/get-sound-tracks?tconst=' + info.d[0].id

        fetch(urlIMDB, optionsIMDB)
            .then(function (response) {
                    response.json()
                    .then(function(data){
                        console.log(data);
                        showSoundtracks(data);
                    })
        });
    } else {
        popupModal.classList.remove('hidden');
        searchHistorySection.classList.add('blur-2xl');
        searchResultSection.classList.add('blur-2xl');
        modalText.textContent = 'Please search for a valid movie'
    };
};

var movieTitleEl = document.getElementById('movie-title');
var movieDescEl = document.getElementById('movie-description');

function showMovieInfo(movie) {
    //function for displaying movie information on website.
    movieTitleEl.textContent = movie.d[0].l + ' (' + movie.d[0].y + ')'
    movieDescEl.innerHTML = '<img src="' + movie.d[0].i.imageUrl + '" alt=""></>'
}

var soundtracksListEl = document.getElementById('soundtracks-list');
var soundtracksHeading = document.getElementById('soundtracks-heading');
var popupModal = document.getElementById('popup-modal');
var modalText = document.getElementById('modal-text');

function showSoundtracks(tracks) {
    //function for displaying soundtrack info on website.
    if(tracks.soundtracks) {
        for (var i = 0; i < tracks.soundtracks.length; i++) {
            listItem = document.createElement('li');
            listItem.classList = 'mt-3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            if(tracks.soundtracks[i].products) {
                listItem.textContent = tracks.soundtracks[i].name + ' - ' + tracks.soundtracks[i].products[0].artist        
            } else {
                listItem.textContent = tracks.soundtracks[i].name + ' - ' + tracks.soundtracks[i].comment
            }
            soundtracksListEl.appendChild(listItem);
        };
    } else {
        popupModal.classList.remove('hidden');
        searchHistorySection.classList.add('blur-2xl');
        searchResultSection.classList.add('blur-2xl');
        modalText.textContent = 'No soundtracks found for ' + tracks.base.title
    };

};

var hideModalBtn = document.getElementById('hide-modal');
hideModalBtn.addEventListener('click', function(){
    location.reload();
});

function handleSearch (event) {
    soundtracksListEl.innerHTML = '';
    event.preventDefault();
    let userInputValue = userInput.value
    let replacedInput = userInputValue.replace(/ /g, '%20');
    getMovieId(replacedInput);
    hideHeroSection();
    showSearchResults();
    pushHistory();
};

searchBar.addEventListener('submit', handleSearch);

var heroSection = document.getElementById('hero');

function hideHeroSection () {
    if (!heroSection.classList.contains('hidden')) {
        heroSection.classList.add('hidden');
    };
};

var searchResultSection = document.getElementById('search-result-section');

function showSearchResults() {
    if (searchResultSection.classList.contains('hidden')){
        searchResultSection.classList.remove('hidden');
    }
}


var logoButton = document.getElementById('company-logo');

logoButton.addEventListener('click', function(){
    location.reload();
});

var searchHistorySection = document.getElementById('search-history-section');
var searchHistoryList = document.getElementById('previous-searches-list');
var searchHistory = [];

function renderHistory() {
    searchHistoryList.innerHTML = '';
    for (var i = 0; i < searchHistory.length; i++) {
        var historyItem = searchHistory[i];
        var li = document.createElement('li');
        li.innerHTML = '<li class="rounded-md bg-blue-600 px-3.5 py-2.5 my-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer">'
            + historyItem + '</li>';
        searchHistoryList.appendChild(li);
    };
};

// This function is being called below and will run when the page loads.
function init() {
    // Get stored history from localStorage
    var storedHistory = JSON.parse(localStorage.getItem("searchHistory"));
  
    // If history is retrieved from localStorage, update the searchHistory array to it
    if (storedHistory !== null) {
      searchHistory = storedHistory;
    }

    renderHistory();
};

function storeHistory() {
    // Stringify and set key in localStorage to todos array
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
};

function pushHistory() {
    var searchText = userInput.value.trim();
    if (searchText === '') {
        return;
    }
    searchHistory.push(searchText);
    userInput.value = '';
    storeHistory();
    renderHistory();
};

function showHistory() {
    if (searchHistorySection.classList.contains('hidden')) {
        searchHistorySection.classList.remove('hidden');
    };
};

function renderAutocomplete(movieNames) {
    console.log(movieNames);
    return $('#search-input-text').autocomplete({
        source: movieNames,
        delay: 100
      });
}


function getAutocomplete(input) {
    var movieNames = []
    let urlIMDB = 'https://imdb8.p.rapidapi.com/auto-complete?q=' + input;
    console.log(urlIMDB);
    fetch(urlIMDB, optionsIMDB)
    .then(function (response) {
        response.json()
        .then(function(data){
            for(var i = 0; i < data.d.length; i++) {
                movieNames.push(data.d[i].l);
            };
            renderAutocomplete(movieNames);
        })
    });
};

userInput.addEventListener('input', function(){
    let userInputValue = userInput.value;
    let replacedInput = userInputValue.replace(/ /g, '%20');
    getAutocomplete(replacedInput);
});

init();

var clearHistoryBtn = document.getElementById('clear-search-history');

clearHistoryBtn.addEventListener('click', function(){
    localStorage.clear()
    location.reload()
})

var viewHistoryBtn = document.getElementById('view-history-btn');

viewHistoryBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var storedHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedHistory) {
        hideHeroSection();
        hideResultsSection();
        showHistory();
    } else {
        popupModal.classList.remove('hidden');
        heroSection.classList.add('blur-2xl');
        modalText.textContent = 'No search history found!';
    };
    showDropdownMenu(event);
});

searchHistoryList.addEventListener('click', function(event){
    var element = event.target
    if (element.matches('li')) {
        soundtracksListEl.innerHTML = '';
        var searchFor = element.textContent;
        getMovieId(searchFor);
        showSearchResults();
    };
});

function hideResultsSection() {
    if(!searchResultSection.classList.contains('hidden')){
        searchResultSection.classList.add('hidden');
    }
};

function hideHistorySection() {
    if(!searchHistorySection.classList.contains('hidden')){
        searchHistorySection.classList.add('hidden');
    };
};


//Shazam api key example
// const url = 'https://shazam.p.rapidapi.com/search?term=kiss%20the%20rain&locale=en-US&offset=0&limit=5';
// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '2d00cc5e8cmshc63eab584c107a7p16171bjsneedccf2d8b11',
//         'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
//     }
// };

// fetch(url, options)
//     .then(function(response){
//         console.log(response)
//         response.json()
//         .then(function(data){
//             console.log(data);
//         })
//     });
