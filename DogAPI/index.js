/* global $ */
'use strict';

const store = {
  dogs: [],
};

function addDogsToStore(dogs) {
  store.dogs = dogs;
}

function getRandomDogs(num) {
  num = num || 3;

  return fetch(`https://dog.ceo/api/breeds/image/random/${num}`)
    .then(res => res.json());
}

function getBreedChoice(breed) {

  return fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(res => res.json());
}

function handleSubmitDogCount() {
  $('#number-choice').on('submit', e => {
    e.preventDefault();
    const dogNo = e.target.number.value;
  
    getRandomDogs(dogNo)
      .then(res => {
        addDogsToStore(res.message);
        render();
      })
      .catch(err => console.log(err));
  });
}

function handleSubmitBreedChoice() {
  $('#breed-choice').on('submit', e => {
    e.preventDefault();e;
    const breed = e.target.breed.value;

    getBreedChoice(breed)
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

/* function getDogImage() {
  fetch('https://dog.ceo/api/breeds/image/random/3')
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
  console.log(responseJson.message);
  //replace the existing image with the new one
  $('.results-img').replaceWith(
    `<img src="${responseJson.message}" class="results-img">`
  )
  //display the results section
  $('.results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getDogImage();
  });
}
*/

function main(){
  handleSubmitDogCount();
  handleSubmitBreedChoice();
}

$(main);
 