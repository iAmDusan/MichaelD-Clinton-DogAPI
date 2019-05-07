'use strict';
// API Key - 3YSXsi21xtIA39YGNOR2Oha3R82mQ0Th7LYa0Wzc

// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=3YSXsi21xtIA39YGNOR2Oha3R82mQ0Th7LYa0Wzc

// search for parks in multiple states
// set max number with default of 10
// trigger a call to NPS API
// display Full Name, Description, URL
// multiple searches and clear results
const apiKey = '3YSXsi21xtIA39YGNOR2Oha3R82mQ0Th7LYa0Wzc';

const searchUrl = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    // iterate through the items array
    for (let i = 0; i < responseJson.items.length; i++) {
        // for each video object in the items 
        //array, add a list item to the results 
        //list with the video title, description,
        //and thumbnail
        $('#results-list').append(
            `<li>
                <h3>${responseJson.items[i].fullName}</h3>
                <p>${responseJson.items[i].description}</p>
                <p>${responseJson.items[i].url}</p>
            </li>`
        )
    };
    //display the results section  
    $('#results').removeClass('hidden');
};

function getParks(query, maxResults = 10) {
    const params = {
        key: apiKey,
        q: query,
        fullName: fullName,
        url: URL,
        maxResults,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getYouTubeVideos(searchTerm, maxResults);
    });
}

$(watchForm);


// const options = {
//     headers: new Headers({

//         "x-Api-Key": apiKey
//     })
// };
    
// const store = {
//     states: [],
// };

// function addStatesToStore(states) {
//     store.states = states;
// }

// function getListParks(num, selectedStates) {
//     num = num || 10;

//     return fetch(`https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=3YSXsi21xtIA39YGNOR2Oha3R82mQ0Th7LYa0Wzc`)
//         .then(res => res.json());
// }

// function handleSubmitDogCount() {
//     $('#number-choice').on('submit', e => {
//         e.preventDefault();
//         const dogNo = e.target.number.value;
//         const breed = e.target.breed.value;

//         getRandomDogs(dogNo, breed)
//             .then(res => {
//                 addDogsToStore(res.message);
//                 render();
//             })
//             .catch(err => console.log(err));
//     });
// }

// function handleSubmitBreedChoice() {
//     $('#breed-choice').on('submit', e => {
//         e.preventDefault(); e;
//         const breed = e.target.breed.value;

//         getBreedChoice(breed)
//             .then(res => {
//                 addDogsToStore([res.message]);
//                 render();
//             })
//             .catch(err => console.log(err));
//     });
// }

// function render() {
//     const html = store.dogs.map(dogImg => {
//         return `
//     <li>
//       <img src='${dogImg}' />
//     </li>
//     `;
//     });

//     if (store.error) {
//         $('.error-message').html(`<p>${store.error}</p>`);
//     } else {
//         $('.error-message').empty();
//     }

//     $('.results').html(html);
// }

// function main() {
//     handleSubmitDogCount();
//     handleSubmitBreedChoice();
// }

// $(main);
