function getColleges() {
  const url = `http://localhost:3000/colleges`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => displayResult(result));
}

function displayResult(result) {
  const namesColleges = document.getElementsByClassName("name-college");

  for(i = 0; i < namesColleges.length; i++) {
     namesColleges[i].value = result[i].name;
  }
}

window.onload = getColleges();