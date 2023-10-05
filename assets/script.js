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

};

function getSoundtrack(info) {
    let urlIMDB = 'https://imdb8.p.rapidapi.com/title/get-sound-tracks?tconst=' + info.d[0].id

    fetch(urlIMDB, optionsIMDB)
        .then(function (response) {
            response.json()
            .then(function(data){
                console.log(data);
                showSoundtracks(data);
            })
    });
};

var movieTitleEl = document.getElementById('movie-title');
var movieDescEl = document.getElementById('movie-description');

function showMovieInfo(movie) {
    //function for displaying movie information on website.
    movieTitleEl.textContent = movie.d[0].l
    movieDescEl.innerHTML = '<img src="' + movie.d[0].i.imageUrl + '" alt=""></>'
}

var soundtracksListEl = document.getElementById('soundtracks-list');

function showSoundtracks(tracks) {
    //function for displaying soundtrack info on website.
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
};

function handleSearch (event) {
    event.preventDefault();
    let userInputValue = userInput.value
    let replacedInput = userInputValue.replace(/ /g, '%20');
    getMovieId(replacedInput);
    hideHeroSection();
    showSearchResults();
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
