const PROXY = ''; // http://localhost:3000, https://suspensa.serveo.net/
const API = `${PROXY}/api-colleges/colleges.json`;


const getColleges = () => {
  try {
    fetch(API)
      .then((response) => response.json())
      .then((result) => displayResult(result));
  } catch (error) {
    console.error('Error:', error); // Remover na prod
  }
}


const displayResult = (arrayColleges) => {
  const datalistColleges = document.getElementById("colleges");
  const collegesList = arrayColleges?.colleges;

  
  if (collegesList) {
    collegesList.forEach(item => {
      const itemCollege = document.createElement('option');
      itemCollege.value = item?.name;
      datalistColleges.appendChild(itemCollege);
    });
  } else {
    console.error('collegesList is null');
  }
}


window.onload = getColleges();
