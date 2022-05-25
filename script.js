import { pokemonArray } from "./data/pokemon.js";

const cardContainer = document.querySelector(".card-container");
const searchByName = document.querySelector(".search-by-name");
const filterByType = document.querySelector("#filter-by-type");
const limitText = document.querySelector("#limit-results");
const limiter = document.querySelector(".limit-results");

const typesString = (typesArr) => {
  return typesArr.join(" & ");
};

const setCard = (pokemon) => {
  const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);

  return `
    <div class="card">
        <div class="card__content">
            <img class="card__image" src="${pokemon.sprite}" alt="${
    pokemon.name
  } image">
            <div class="card__heading">${pokeName}</div>
            <div class="card__text">${pokeName} (#${
    pokemon.id
  }) is a ${typesString(pokemon.types)} pokemon.) </div>
        </div>
    </div>`;
};

const display = (pokeArr) => {
  cardContainer.innerHTML = "";
  pokeArr.forEach((pokemon) => {
    cardContainer.innerHTML += setCard(pokemon);
  });
};

const searchByPokemonName = (event) => {
  event.preventDefault();

  const search = event.target[0].value.toLowerCase();
  const results = pokemonArray.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(search);
  });
  cardContainer.innerHTML = "";
  display(results);
  event.target[0].value = "";
};

const filterByPokemonType = (event) => {
  event.preventDefault();

  const filter = event.target.value;
  if (filter === "type") {
    display(pokemonArray);
  } else {
    const results = pokemonArray.filter((pokemon) => {
      return pokemon.types.includes(filter);
    });

    display(results);
  }
};

const displayLimited = (event) => {
  event.preventDefault();

  const target = limitText.value;
  if (target >= 0 && target < 152) {
    cardContainer.innerHTML = "";
    for (let index = 0; index < target; index++) {
      cardContainer.innerHTML += setCard(pokemonArray[index]);
    }
  } else if (target === "") {
    display(pokemonArray);
  } else {
    alert("Please select a number between 0 and 151");
    limitText.value = "";
  }
};

document.body.addEventListener("load", display(pokemonArray));
searchByName.addEventListener("submit", searchByPokemonName);
filterByType.addEventListener("change", filterByPokemonType);
limiter.addEventListener("submit", displayLimited);
