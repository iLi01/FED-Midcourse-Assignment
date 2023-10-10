const rightArrow = document.querySelector(".right");

const leftArrow = document.querySelector(".left");

const topPickContainer = document.querySelector(".picks-inner");

const allCards = document.querySelectorAll(".card");

const changeBtn = document.querySelector(".change");

const allDrinks = document.querySelectorAll(".drink-card");

let cardPlace = 0;
let cardNumber = 1;
leftArrow.style.display = "none";

rightArrow.addEventListener("click", function (e) {
  e.preventDefault();
  leftArrow.style.display = "block";

  cardPlace += 93.5;
  cardNumber += 1;
  console.log(allCards.length, cardNumber);
  topPickContainer.style.transform = `translateX(-${cardPlace}vw)`;
  if (cardNumber >= allCards.length) {
    rightArrow.style.display = "none";
  }
});

leftArrow.addEventListener("click", function (e) {
  e.preventDefault();
  rightArrow.style.display = "block";
  cardPlace -= 93.5;
  cardNumber -= 1;
  console.log(allCards.length, cardNumber);
  topPickContainer.style.transform = `translateX(-${cardPlace}vw)`;
  if (cardNumber <= 1) {
    leftArrow.style.display = "none";
  }
});

function randonNumber(number) {
  return Math.floor(Math.random() * number);
}

async function getAPI() {
  //   const url = "https://the-cocktail-db.p.rapidapi.com/randomselection.php";
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "4ef4ff2aa1mshc058d32cee8d29dp1a5b52jsnfd5943f08fc1",
  //       "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
  //     },
  //   };

  try {
    const response = await fetch("./APIcall.json");
    const result = await response.json();
    return result.drinks[randonNumber(10)];
  } catch (error) {
    console.error(error);
  }
}

changeBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  let checkName;

  for (let n = 0; n < 4; n++) {
    const obj = await getAPI();
    const card = document.querySelector(`[data-number="${n + 1}"]`);
    const drinkTitle = card.querySelector(".drink-title");

    const drinkImg = card.querySelector(".drink-img");

    drinkTitle.textContent = obj.strDrink;
    drinkImg.setAttribute("src", obj.strDrinkThumb);
  }
});

async function getIngrediants() {
  const obj = await getAPI();
  let count = 1;
  let number = 1;
  const ingrediants = [];
  for (const key in obj) {
    // if (obj.hasOwnProperty(key)) {
    //   console.log(`${key}: ${obj[key]}`);
    // }
    if (obj[key] === null) {
      continue;
    } else if (key === `strIngredient${count}`) {
      ingrediants.push({ main: obj[key] });
      count++;
    } else if (key === `strMeasure${number}`) {
      ingrediants[number - 1].measure = obj[key];
      number++;
    }
  }
  console.log(ingrediants);
}

getIngrediants();
