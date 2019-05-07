'use strict';
// API Key - 3YSXsi21xtIA39YGNOR2Oha3R82mQ0Th7LYa0Wzc

// search for parks in multiple states
// set max number with default of 10
// trigger a call to NPS API
// display Full Name, Description, URL
// multiple searches and clear results
const API = [
    '3YSXsi21xtIA39YGNOR2Oha3R82mQ0Th7LYa0Wzc'
]

const store = {
    states: [],
};

function addStatesToStore(states) {
    store.states = states;
}

function getListParks(num, selectedStates) {
    num = num || 10;

    return fetch(`https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=3YSXsi21xtIA39YGNOR2Oha3R82mQ0Th7LYa0Wzc`)
        .then(res => res.json());
}

function handleSubmitDogCount() {
    $('#number-choice').on('submit', e => {
        e.preventDefault();
        const dogNo = e.target.number.value;
        const breed = e.target.breed.value;

        getRandomDogs(dogNo, breed)
            .then(res => {
                addDogsToStore(res.message);
                render();
            })
            .catch(err => console.log(err));
    });
}

function render() {
    const html = store.dogs.map(dogImg => {
        return `
    <li>
      <img src='${dogImg}' />
    </li>
    `;
    });

    if (store.error) {
        $('.error-message').html(`<p>${store.error}</p>`);
    } else {
        $('.error-message').empty();
    }

    $('.results').html(html);
}
