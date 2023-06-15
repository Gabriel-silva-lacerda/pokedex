const pokemonImage = document.querySelector(".pokemon-image");
const pokemonName = document.querySelector(".name");
const pokemonNumber = document.querySelector("#pokemon-number");
const imgContainer = document.querySelector(".img-container");

const input = document.querySelector("input");
const notFound = document.querySelector(".not-found");
const loading = document.querySelector(".loading");

const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");

const statusNumber = document.querySelectorAll(".status-number");
const statusDesc = document.querySelectorAll(".status");

let number = 1;

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (apiResponse.status === 200) {
    const data = await apiResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  statusNumber.forEach((e) => {
    e.innerHTML = "Loading...";
  });
  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonName.innerHTML = "";

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = "#" + data.id.toString().padStart(3, "0");
    pokemonImage.src = data["sprites"]["other"]["home"]["front_default"];
    number = data.id;
    imgContainer.style.background =
      "url(img/florest.png) no-repeat center center";
    imgContainer.style.backgroundSize = "cover";

    input.value = "";
    notFound.src = "";

    data.stats.forEach((attributes, span) => {
      statusNumber[span].innerHTML = attributes.base_stat
        .toString()
        .padStart(3, "0");
    });
  } else {
    imgContainer.style.background =
      "url(img/notfoud.webp) no-repeat center center";
    imgContainer.style.backgroundSize = "cover";

    pokemonImage.src = "";
    pokemonName.innerHTML = "Not found";
    pokemonNumber.innerHTML = "#000";
    statusNumber.forEach((e) => {
      e.innerHTML = "0";
    });
  }
};

btnPrev.addEventListener("click", () => {
  if (number > 1) {
    number -= 1;
    renderPokemon(number);
  }
});

btnNext.addEventListener("click", () => {
  number += 1;
  renderPokemon(number);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    renderPokemon(input.value.toLowerCase());
  }

  if (e.key === "ArrowLeft" && number > 1) {
    number -= 1;
    renderPokemon(number);
  }

  if (e.key === "ArrowRight") {
    number += 1;
    renderPokemon(number);
  }
});
renderPokemon("1");
