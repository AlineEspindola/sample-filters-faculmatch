const namesCollegesSelect = document.getElementsByClassName("name-college-select");
const namesCollegesCards = document.getElementsByTagName("h2");
const subtextCollegesCards = document.getElementsByTagName("h3");
const buttonSearch = document.getElementById("button-search");

function getColleges() {
  const url = `http://localhost:3000/colleges`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      displaySelect(result, namesCollegesSelect);
      displayNamesColleges(result, namesCollegesCards);
      displaySubtexto(result, subtextCollegesCards);
    })
    .catch((error) => {
      console.log('Erro:', error); //Remover na produção
    })
}

function displaySelect(result, namesCollegesSelect) {
  for(i = 0; i < namesCollegesSelect.length; i++) {
    namesCollegesSelect[i].value = result[i].name;
  }
}

function displayNamesColleges(result, namesCollegesCards) {
  for(i = 0; i < namesCollegesCards.length; i++) {
    namesCollegesCards[i].innerHTML = result[i].name;
  }
}

function displaySubtexto(result, subtextCollegesCards) {
  for(i = 0; i < subtextCollegesCards.length; i++) {
    subtextCollegesCards[i].innerHTML = result[i].city + " | " + result[i].state;
  }
}

buttonSearch.addEventListener("click", function() {
  const inputNameCollege = document.getElementById("input-name-college");
  const cardsCollege = document.getElementsByClassName("card");
  const collegesTitle = document.getElementById("colleges-title");

  for(i = 0; i < cardsCollege.length; i++) {
    if (namesCollegesCards[i].innerText.toLowerCase().includes(inputNameCollege.value.toLowerCase())) {
      cardsCollege[i].classList.remove("hidden");
      cardsCollege[i].classList.add("visible");
      collegesTitle.classList.add("visible");
    } else {
      cardsCollege[i].classList.add("hidden");
      cardsCollege[i].classList.remove("visible");
    }
  };
});

window.onload = getColleges();