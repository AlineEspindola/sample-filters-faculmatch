const namesCollegesDatalist = document.getElementsByClassName("name-college-datalist");
const organizationsDatalist = document.getElementsByClassName("organization-datalist");
const namesCollegesCards = document.getElementsByTagName("h2");
const subtextCollegesCards = document.getElementsByTagName("h3");
const buttonSearch = document.getElementById("button-search");

function getColleges() {
  const url = `http://localhost:3000/colleges`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      displayDatalist(result, namesCollegesDatalist, "name");
      displayDatalist(result, organizationsDatalist, "organization");
      displayNamesColleges(result, namesCollegesCards);
      displaySubtexto(result, subtextCollegesCards);
    })
    .catch((error) => {
      console.log('Erro:', error); //Remover na produção
    })
}

function displayDatalist(result, datalists, type) {
  const resultArray = [];

  for(i = 0; i < 10; i++) { //Ver forma de pegar o tamanho do json
    resultArray[i] = result[i][type];
  }

  const resultArrayFiltered = resultArray.filter((item, index) => resultArray.indexOf(item) === index);

  for(i = 0; i < datalists.length; i++) {
    datalists[i].value = resultArrayFiltered[i];
  }
}

function displayNamesColleges(result, namesCollegesCards) {
  for(i = 0; i < namesCollegesCards.length; i++) {
    namesCollegesCards[i].innerHTML = result[i].name;
  }
}

function displaySubtexto(result, subtextCollegesCards) {
  for(i = 0; i < subtextCollegesCards.length; i++) {
    subtextCollegesCards[i].innerHTML = result[i].organization;
  }
}

buttonSearch.addEventListener("click", function() {
  const inputNameCollege = document.getElementById("input-name-college");
  const inputOrganization = document.getElementById("input-organization");
  const cardsCollege = document.getElementsByClassName("card");
  const collegesTitle = document.getElementById("colleges-title");
  const withoutResults = document.getElementById("without-results");
  var haveColleges = false;

  if (inputNameCollege.value && inputOrganization.value) {
    for(i = 0; i < cardsCollege.length; i++) {
      if (namesCollegesCards[i].innerText.toLowerCase().includes(inputNameCollege.value.toLowerCase())) {
        if (subtextCollegesCards[i].innerText.toLowerCase().includes(inputOrganization.value.toLowerCase())) {
          cardsCollege[i].classList.remove("hidden");
          cardsCollege[i].classList.add("visible");

          haveColleges = true;
        } else {
          cardsCollege[i].classList.add("hidden");
          cardsCollege[i].classList.remove("visible");
        }
      }
      else{
        cardsCollege[i].classList.add("hidden");
        cardsCollege[i].classList.remove("visible");
      }
    }
  } else if (inputNameCollege.value) {
    for(i = 0; i < cardsCollege.length; i++) {
      if (namesCollegesCards[i].innerText.toLowerCase().includes(inputNameCollege.value.toLowerCase())) {
        cardsCollege[i].classList.remove("hidden");
        cardsCollege[i].classList.add("visible");

        haveColleges = true;
      } else {
        cardsCollege[i].classList.add("hidden");
        cardsCollege[i].classList.remove("visible");
      }
    }
  } else if (inputOrganization.value) {
    for(i = 0; i < cardsCollege.length; i++) {
      if (subtextCollegesCards[i].innerText.toLowerCase().includes(inputOrganization.value.toLowerCase())) {
        cardsCollege[i].classList.remove("hidden");
        cardsCollege[i].classList.add("visible");

        haveColleges = true;
      } else {
        cardsCollege[i].classList.add("hidden");
        cardsCollege[i].classList.remove("visible");
      }
    }
  } else {
    for(i = 0; i < cardsCollege.length; i++) {
      cardsCollege[i].classList.remove("hidden");
      cardsCollege[i].classList.add("visible");

      haveColleges = true;
    }
  };

  if (haveColleges) {
    collegesTitle.classList.remove("hidden");
    collegesTitle.classList.add("visible");
    withoutResults.classList.add("hidden");
    withoutResults.classList.remove("visible");
  } else {
    collegesTitle.classList.add("hidden");
    collegesTitle.classList.remove("visible");
    withoutResults.classList.remove("hidden");
    withoutResults.classList.add("visible");
  };

});

document.addEventListener("DOMContentLoaded", function () {
  getColleges();
});

