'use strict';

// API Key - 3YSXsi21xtIA39YGNOR2Oha3R82mQ0Th7LYa0Wzc

// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=3YSXsi21xtIA39YGNOR2Oha3R82mQ0Th7LYa0Wzc

// search for parks in multiple states
// set max number with default of 10
// trigger a call to NPS API
// display Full Name, Description, URL
// multiple searches and clear results

const apiKey = '3YSXsi21xtIA39YGNOR2Oha3R82mQ0Th7LYa0Wzc';

const searchURL = `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}`;

const store = {
    parks: [],
    errorMessage: null,
    formReady: false,
};

function displayResults(responseJson) {
    console.log(responseJson);
    $('.results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('.results-list').append(
            `<li>
                <h3><a href= "${responseJson.data[i].url}">${responseJson.data[i].name}</a></h3>
                <p>${responseJson.data[i].description}</p>
            </li>`
        );
    }
}
$('.results').removeClass('hidden');


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function requestPark(query, maxNumber) {
    console.log('Request park with query and limit it to maxNum');
    const params = {
        stateCode: query, 
        limit: maxNumber, 
        api_key: apiKey,
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + '&' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson, maxNumber))
        .catch(e => {
            $('.error-message').text(`Something went wrong: ${e.message}`);
        });
}

function watchForm() {
    $('#park-search').on('submit', event => {
        event.preventDefault();
        const searchTerm = event.target.querySearch.value;
        const maxResults = event.target.maxNum.value;
        requestPark(searchTerm, maxResults);
        console.log(`${searchTerm} ${maxResults}`);
    });
}

$(function () {
    watchForm();
});