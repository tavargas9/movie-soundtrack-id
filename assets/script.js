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
            })
    });
};

function showSoundtracks(tracks) {
    //write function for displaying soundtrack info on website.
};

function handleSearch (event) {
    event.preventDefault();
    let userInputValue = userInput.value
    let replacedInput = userInputValue.replace(/ /g, '%20');
    getMovieId(replacedInput);
};

searchBar.addEventListener('submit', handleSearch);







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
